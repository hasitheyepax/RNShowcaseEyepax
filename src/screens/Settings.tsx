import { StyleSheet, Text, View } from "react-native";
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

type Props = {};

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
      <Header />
      <SettingsContent />
    </SafeAreaView>
  );
};

export default Settings;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
      flex: 1,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "300",
      color: theme.colors.rawText,
    },
    settingsContainer: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: "center",
    },
  });
