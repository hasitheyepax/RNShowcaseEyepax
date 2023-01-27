import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useContext, useEffect, useRef } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../config/colors";
import ThemeContext from "../contexts/themeContext";

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

export default function TabBarComponent({
  active,
  options,
  onLayout,
  onPress,
}: TabBarComponentProps) {
  const ref = useRef(null);

  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  useEffect(() => {
    if (active && ref?.current) {
      //@ts-ignore
      ref.current.play();
    }
  }, [active]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.container}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {options.tabBarIcon ? (
          /* @ts-ignore */
          options.tabBarIcon({ ref })
        ) : (
          <Text style={styles.text}>?</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      height: 60,
      width: 60,
      marginTop: -5,
    },
    text: {
      color: "#000",
      fontSize: 18,
      textAlign: "center",
    },
    componentCircle: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: theme.colors.bottomTabsBackground,
    },
    iconContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });
