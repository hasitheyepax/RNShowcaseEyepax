import { StyleSheet, Text, View, Dimensions } from "react-native";
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
        <Lottie
          ref={animationRef}
          loop={false}
          style={styles.animatedIcon}
          source={settingsIcon}
        />
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
    <SafeAreaView style={styles.container}>
      <View style={styles.bottom}></View>
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
    </SafeAreaView>
  );
};

export default Settings;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: theme.colors.background,
    },
    headerContainer: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    animatedIcon: {
      height: 200,
      width: 200,
    },
    headerTextContainer: {
      left: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.colors.rawText,
    },
    settingsContainer: {
      flex: 1,
      justifyContent: "center",
    },
    gradientContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      flex: 1,
      height: 500,
    },
    bottom: {
      height: height,
      width: width,
      backgroundColor: "#FA8989",
      position: "absolute",
    },
  });
