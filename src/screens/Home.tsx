import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
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

export const Home = () => {
  const [addNoteVisible, setAddNoteVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<localTask | null>(null);

  useEffect(() => {
    setAddNoteVisible(!!activeItem);
  }, [activeItem]);

  const tasks = useAppSelector(selectTasks);

  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);
  const animationRef = useRef(null);
  const isFocused = useIsFocused();
  const buttonPosition = useSharedValue(0);

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
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{`Home`}</Text>
        </View>
      </View>
    );
  }, []);

  const handleAddNote = () => {
    buttonPosition.value = 0;
    setAddNoteVisible(true);
    //@ts-ignore
    animationRef.current.play();
  };

  const handleAddTodo = () => {
    buttonPosition.value = 0;
    console.log("add todo");
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
            <Pressable onPress={handleAddNote}>
              <Image
                source={require("../../assets/note.png")}
                style={styles.noteImage}
              />
            </Pressable>
          </Animated.View>
        </Animated.View>
        <Animated.View style={styles.addNoteButtonContainer}>
          <Animated.View style={todoButtonAnimatedStyle}>
            <Pressable onPress={handleAddTodo}>
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
        />
      </View>
    );
  }, [tasks]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddNote
        visible={addNoteVisible}
        onCancel={() => {
          setAddNoteVisible(false);
          if (activeItem) setActiveItem(null);
        }}
        onSubmit={handleSubmitNote}
        item={activeItem}
      />
      {header}
      {homeContent}
    </SafeAreaView>
  );
};

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    wrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      // flex: 1,
      // height: 70,
    },
    headerTextContainer: {
      // flex: 1,
      // backgroundColor: "blue",
    },
    headerText: {
      fontSize: 20,
      fontWeight: "300",
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
      height: 50,
      width: 50,
      zIndex: 20,
      right: 30,
      bottom: 30,
    },
    addNoteButtonContainer: {
      position: "absolute",
      height: 50,
      width: 50,
      zIndex: 16,
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
  });
