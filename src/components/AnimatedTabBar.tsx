import { useContext, useReducer } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabBarComponent from "./TabBarComponent";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import Background from "./assets/Background";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function AnimatedTabBar({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();

  const { theme } = useContext(ThemeContext);

  const reducer = (state: any, action: { x: number; index: number }) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  // console.log(layout);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;

    const xOffsetInner =
      [...layout].find(({ index }) => index === activeIndex)!.x - 25;

    // console.log(xOffsetInner);

    return xOffsetInner;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  const styles = themeStyles(theme);

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Background color={theme.colors.mainBackground} />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
}

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
    },
    activeBackground: {
      position: "absolute",
    },
    tabBarContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });
