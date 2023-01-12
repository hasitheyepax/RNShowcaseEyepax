import React, { useState, useContext, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
import { commonListTodo } from "../config/types/commonListTodo";
import Lottie from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";
import addIcon from "../components/assets/icons/add.icon.json";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import AddNotesModalComponent from "../components/AddNotesModalComponent";
import AddTodosModalComponent from "../components/AddTodosModalComponents";
import ViewAndEditNoteModalComponent from "../components/ViewAndEditNoteModalComponent";
import ViewAndEditTodoModalComponent from "../components/ViewAndEditTodoModalComponent";
import { getNotes, getTodos } from "../helpers/asyncStorage";
import AnimatedList from "../components/animatedList/AnimatedList";
import AddNote from "../components/modals/AddNote";
import { useAppSelector } from "../redux/hooks";
import { selectTasks } from "../redux/slices/taskSlice";
import stringUtils from "../utils/stringUtils";

type Props = {};

const Home = (props: Props) => {
  const [data, setData] = useState<commonListTodo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<commonListTodo>();
  const [addData, setAddData] = useState<commonListTodo>();
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [addNoteVisible, setAddNoteVisible] = useState(false);

  const tasks = useAppSelector(selectTasks);

  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);
  const animationRef = useRef(null);
  const isFocused = useIsFocused();
  const buttonPosition = useSharedValue(0);
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    getDataFromStorage();
  }, [isFocused, refreshScreen]);

  const getDataFromStorage = async () => {
    let todosFromStorage = await getTodos();
    let notesFromStorage = await getNotes();
    let notes: commonListTodo[] = [];
    let todos: commonListTodo[] = [];
    if (todosFromStorage) {
      for (let i = 0; i < todosFromStorage.length; i++) {
        let tempTodo: commonListTodo = {
          itemType: "todo",
          item: todosFromStorage[i],
        };
        todos.push(tempTodo);
      }
    }
    if (notesFromStorage) {
      for (let i = 0; i < notesFromStorage.length; i++) {
        let tempNote: commonListTodo = {
          itemType: "note",
          item: notesFromStorage[i],
        };
        notes.push(tempNote);
      }
    }
    setData([...notes, ...todos]);
  };

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

  const Header: React.FC = () => {
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
  };

  const handleAddNote = () => {
    buttonPosition.value = 0;
    setAddNoteVisible(true);
    //@ts-ignore
    animationRef.current.play();
  };

  const handleAddTodo = () => {
    buttonPosition.value = 0;
    //@ts-ignore
    animationRef.current.play();
  };

  const handleSubmitNote = () => {
    setAddNoteVisible(false);
  };

  const HomeContent = () => {
    return (
      <>
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
        <AnimatedList data={tasks} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <AddNote
        visible={addNoteVisible}
        onCancel={() => {
          setAddNoteVisible(false);
        }}
        onSubmit={handleSubmitNote}
      />
      <Header />
      <HomeContent />
    </SafeAreaView>
  );
};

export default Home;

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
      zIndex: 25,
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
