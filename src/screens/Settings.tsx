import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Lottie from "lottie-react-native";
import settingsIcon from "../components/assets/icons/settings.icon.json";
import { useIsFocused } from "@react-navigation/native";
import SettingsItem from "../components/settingsItem/SettingsItem";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectShowCompletedTodosEnabled,
  selectSwipeToDeleteEnabled,
  toggleShowTodos,
  toggleSwipeToDeleteEnable,
} from "../redux/slices/settingsSlice";
import { LinearGradient } from "expo-linear-gradient";

type Props = {};
const { height, width } = Dimensions.get("window");

const Settings = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const animationRef = useRef(null);
  const isFocused = useIsFocused();
  const styles = themeStyles(theme);
  const dispatch = useAppDispatch();

  const swipeToDeleteEnabled = useAppSelector(selectSwipeToDeleteEnabled);
  const showCompletedTodosEnabled = useAppSelector(
    selectShowCompletedTodosEnabled
  );

  useEffect(() => {
    if (animationRef?.current && isFocused) {
      //@ts-ignore
      animationRef.current.play();
    }
  }, [isFocused]);

  const Header: React.FC = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{`Settings`}</Text>
        </View>
        <View>
          <Lottie
            ref={animationRef}
            loop={false}
            style={styles.animatedIcon}
            source={settingsIcon}
          />
        </View>
      </View>
    );
  };

  const SettingsContent = () => {
    return (
      <View style={styles.settingsContainer}>
        <SettingsItem
          label={"Enable swipe to delete"}
          enabled={swipeToDeleteEnabled}
          onValueChange={() => {
            dispatch(toggleSwipeToDeleteEnable());
          }}
        />
        <SettingsItem
          label={"Show completed to-do's"}
          enabled={showCompletedTodosEnabled}
          onValueChange={() => {
            dispatch(toggleShowTodos());
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottom} />
      <LinearGradient
        style={styles.gradientContainer}
        colors={[
          "#002B5C",
          "rgba(123, 143, 250, 0.85)",
          "rgba(250, 137, 137, 0)",
        ]}
        locations={[0, 0.3385, 1]}
      >
        <Header />
        <SettingsContent />
      </LinearGradient>
    </View>
  );
};

export default Settings;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {},
    headerTextContainer: {
      left: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.colors.rawText,
    },
    animatedIcon: {
      height: 200,
      width: 200,
      alignSelf: "center",
      marginTop: 20,
    },
    settingsContainer: {
      flex: 1,
      justifyContent: "center",
    },
    gradientContainer: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 60 : 38,
    },
    bottom: {
      height: height,
      width: width,
      backgroundColor: theme.colors.mainBackground,
      position: "absolute",
    },
  });
