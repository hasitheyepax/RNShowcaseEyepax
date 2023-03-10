import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
import Lottie from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";
import addIcon from "../components/assets/icons/add.icon.json";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import AnimatedList from "../components/animatedList/AnimatedList";
import AddNote from "../components/modals/AddNote";
import { useAppSelector } from "../redux/hooks";
import { selectTasks } from "../redux/slices/taskSlice";
import { localTask } from "../config/types/localTask";
import stringUtils from "../utils/stringUtils";
import QrViewModal from "../components/modals/QrViewModal";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const Home = () => {
  const [addNoteVisible, setAddNoteVisible] = useState(false);
  const [taskType, setTaskType] = useState("note");
  const [qrVisible, setQrVisible] = useState(false);

  const [activeItem, setActiveItem] = useState<localTask | null>(null);
  const [activeShareItem, setActiveShareItem] = useState<localTask | null>(
    null
  );

  useEffect(() => {
    setAddNoteVisible(!!activeItem);
    setQrVisible(!!activeShareItem);
  }, [activeItem, activeShareItem]);

  const tasks = useAppSelector(selectTasks);

  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);
  const animationRef = useRef(null);
  const isFocused = useIsFocused();
  const buttonPosition = useSharedValue(0);
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    if (animationRef?.current && isFocused) {
      //@ts-ignore
      animationRef.current.play();
    }
  }, [isFocused]);

  const todoButtonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(buttonPosition.value, [0, 1], [0, -50]);
    return {
      opacity: withTiming(buttonPosition.value, { duration: 300 }),
      transform: [
        {
          translateY: withTiming(interpolation - 60, { duration: 550 }),
        },
        {
          translateX: withTiming(interpolation + 50, { duration: 500 }),
        },
      ],
      zIndex: 16,
      position: "absolute",
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(buttonPosition.value, [0, 1], [0, -50]);
    return {
      opacity: withTiming(buttonPosition.value, { duration: 150 }),
      transform: [
        {
          translateY: withTiming(interpolation + 10, { duration: 500 }),
        },
        {
          translateX: withTiming(interpolation + 10, { duration: 500 }),
        },
      ],
      zIndex: 16,
      position: "absolute",
    };
  });

  const header = useMemo(() => {
    return (
      <View style={styles.headerContainer}>
        <View
          style={styles.headerTextContainer}
          accessible={true}
          accessibilityLabel={stringUtils.HOME_SCREEN_TITLE_ACCESSIBILITY_LABLE}
          accessibilityHint={stringUtils.HOME_SCREEN_TITLE_ACCESSIBILITY_HINT}
        >
          <Text style={styles.headerText}>{`Home`}</Text>
        </View>
      </View>
    );
  }, []);

  const handleAddNote = () => {
    buttonPosition.value = 0;
    setAddNoteVisible(true);
    setTaskType("note");
    //@ts-ignore
    animationRef.current.play();
  };

  const handleAddTodo = () => {
    buttonPosition.value = 0;
    setAddNoteVisible(true);
    setTaskType("todo");
    //@ts-ignore
    animationRef.current.play();
  };

  const handleSubmitNote = () => {
    setAddNoteVisible(false);
    if (activeItem) setActiveItem(null);
  };

  const homeContent = useMemo(() => {
    return (
      <View style={styles.container}>
        <View style={styles.addButtonContainer}>
          <Pressable
            onPress={() => {
              buttonPosition.value === 1
                ? (buttonPosition.value = 0)
                : (buttonPosition.value = 1);
            }}
            accessible={true}
            focusable={true}
            accessibilityLabel={
              stringUtils.HOME_SCREEN_ADD_NEW_NOTES_OR_TODOS_BUTTON_LABLE
            }
            accessibilityHint={
              stringUtils.HOME_SCREEN_ADD_NEW_NOTES_OR_TODOS_BUTTON_HINT
            }
          >
            <Lottie
              ref={animationRef}
              loop={false}
              style={styles.animatedIcon}
              source={addIcon}
            />
          </Pressable>
        </View>
        <Animated.View style={styles.addNoteButtonContainer}>
          <Animated.View style={buttonsAnimatedStyle}>
            <Pressable
              onPress={handleAddNote}
              accessible={true}
              focusable={true}
              accessibilityLabel={
                stringUtils.HOME_SCREEN_ADD_NEW_NOTES_BUTTON_LABLE
              }
              accessibilityHint={
                stringUtils.HOME_SCREEN_ADD_NEW_NOTES_BUTTON_HINT
              }
            >
              <Image
                source={require("../../assets/note.png")}
                style={styles.noteImage}
              />
            </Pressable>
          </Animated.View>
        </Animated.View>
        <Animated.View style={styles.addNoteButtonContainer}>
          <Animated.View style={todoButtonAnimatedStyle}>
            <Pressable
              onPress={handleAddTodo}
              accessible={true}
              focusable={true}
              accessibilityLabel={
                stringUtils.HOME_SCREEN_ADD_NEW_TODOS_BUTTON_LABLE
              }
              accessibilityHint={
                stringUtils.HOME_SCREEN_ADD_NEW_TODOS_BUTTON_HINT
              }
            >
              <Image
                source={require("../../assets/todo.png")}
                style={styles.noteImage}
              />
            </Pressable>
          </Animated.View>
        </Animated.View>

        <View style={{ marginTop: 20 }}></View>
        <AnimatedList
          data={tasks}
          setActiveItem={setActiveItem}
          contentContainerStyle={{ paddingBottom: 70 }}
          setActiveShareItem={setActiveShareItem}
        />
      </View>
    );
  }, [tasks]);

  return (
    <View style={styles.wrapper}>
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
        <AddNote
          visible={addNoteVisible}
          onCancel={() => {
            setAddNoteVisible(false);
            if (activeItem) setActiveItem(null);
          }}
          onSubmit={handleSubmitNote}
          taskType={taskType === "note" ? "note" : "todo"}
          item={activeItem}
        />
        <QrViewModal
          visible={qrVisible}
          onCancel={() => {
            setQrVisible(false);
            if (activeShareItem) setActiveShareItem(null);
          }}
          item={activeShareItem}
        />
        {header}
        {homeContent}
      </LinearGradient>
    </View>
  );
};

export default Home;
const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      // backgroundColor: theme.colors.background,
      flex: 1,
      // height: height,
    },
    wrapper: {
      flex: 1,
      // height: height,
      // backgroundColor: theme.colors.background,
    },
    headerContainer: {
      marginTop: 20,
      justifyContent: "flex-end",
      // alignItems: "center",
      // flex: 1,
      // backgroundColor: "red",
      height: 50,
      zIndex: 10,
    },
    headerTextContainer: {
      // flex: 1,
      // backgroundColor: "blue",
      left: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.colors.rawText,
    },
    qaContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      backgroundColor: theme.colors.background,
    },
    button: {
      width: "80%",
      alignItems: "flex-end",
      justifyContent: "center",
      backgroundColor: "red",
      height: 150,
      marginVertical: 5,
      marginRight: 10,
      borderRadius: 10,
      opacity: 0.8,
    },
    buttonText: {
      fontWeight: "bold",
      marginRight: 10,
    },
    button3Text: {
      color: theme.colors.rawText,
    },
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 20,
    },
    addButtonContainer: {
      position: "absolute",
      height: 70,
      width: 70,
      zIndex: 25,
      // right: 30,
      bottom: 0,
      right: 0,
      // marginRight: 20,
      // backgroundColor: "red",
    },
    addNoteButtonContainer: {
      position: "absolute",
      height: 50,
      width: 50,
      zIndex: 24,
      right: 30,
      bottom: 30,
    },
    animatedIcon: {
      height: 80,
      width: 80,
    },
    noteImage: {
      height: 60,
      width: 60,
    },
    gradientContainer: {
      // position: "absolute",
      // left: 0,
      // right: 0,
      // top: 0,
      flex: 1,
      // height: height,
      paddingTop: Platform.OS === "ios" ? 20 : undefined,
    },
    bottom: {
      height: height,
      width: width,
      backgroundColor: theme.colors.mainBackground,
      position: "absolute",
    },
  });
