import ListTile from "../components/ListTile";
import noteMock from "../mocks/notesMock";
import React, { useState, useContext, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Alert,
  TextInput,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";

//@ts-ignore
import SwipeableFlatList from "react-native-swipeable-list";
import { note } from "../config/types/note";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
import { todos } from "../config/types/todos";
import todoMock from "../mocks/todosMock";
import TodoTile from "../components/TodoTile";
import { commonListTodo } from "../config/types/commonListTodo";
import Lottie from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";
import addIcon from "../components/assets/icons/add.icon.json";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
  add,
  FadeIn,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import AddNotesModalComponent from "../components/AddNotesModalComponent";
import AddTodosModalComponent from "../components/AddTodosModalComponents";
import ViewAndEditNoteModalComponent from "../components/ViewAndEditNoteModalComponent";
import ViewAndEditTodoModalComponent from "../components/ViewAndEditTodoModalComponent";
import AnimatedList, {
  renderItemProps,
} from "../components/animatedList/AnimatedList";

type Props = {};

const extractItemKey = (item: commonListTodo) => {
  return item.item.id?.toString();
};

const Home = (props: Props) => {
  const [data, setData] = useState<commonListTodo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<commonListTodo>();
  const [addData, setAddData] = useState<commonListTodo>();

  const [editMode, setEditMode] = useState(false);

  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);
  const animationRef = useRef(null);
  const isFocused = useIsFocused();
  const buttonPosition = useSharedValue(0);
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    let notes: commonListTodo[] = [];
    let todos: commonListTodo[] = [];
    for (let i = 0; i < noteMock.length; i++) {
      let tempNote: commonListTodo = { itemType: "note", item: noteMock[i] };
      notes.push(tempNote);
    }
    for (let i = 0; i < todoMock.length; i++) {
      let tempTodo: commonListTodo = { itemType: "todo", item: todoMock[i] };
      todos.push(tempTodo);
    }
    setData([...notes, ...todos]);
  }, []);

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
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{`Home`}</Text>
        </View>
      </View>
    );
  };

  const deleteItem = (itemId: any) => {
    const filteredState = data.filter((item) => item.item.id !== itemId);
    return setData(filteredState);
  };

  const QuickActions = (index: any, qaItem: commonListTodo) => {
    return (
      <Animated.View
        style={styles.qaContainer}
        entering={FadeIn.delay(110 * index)}
      >
        <View style={[styles.button]}>
          <Pressable onPress={() => deleteItem(qaItem.item.id)}>
            <Text style={[styles.buttonText, styles.button3Text]}>Delete</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: commonListTodo;
    index: number;
  }) => {
    return (
      <Animated.View
        entering={FadeIn.delay(100 * index)}
        exiting={FadeOut}
        layout={Layout.delay(100)}
      >
        <Pressable
          onPress={() => {
            setSelectedData(item);
            setModalVisible(!modalVisible);
          }}
        >
          {item.itemType === "note" ? (
            <ListTile item={item.item} />
          ) : (
            //@ts-ignore
            <TodoTile item={item.item} />
          )}
        </Pressable>
      </Animated.View>
    );
  };

  const HomeContent = () => {
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
            <Pressable
              onPress={() => {
                setAddData({
                  itemType: "note",
                  item: {
                    id: "",
                    title: "",
                    description: "",
                    date: "",
                    time: "",
                  },
                });
                setAddNoteModalVisible(!addNoteModalVisible);
              }}
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
              onPress={() => {
                setAddData({
                  item: {
                    id: "",
                    title: "",
                    description: "",
                    date: "",
                    time: "",
                    dueDate: "",
                    dueTime: "",
                    priority: "",
                  },
                  itemType: "todo",
                });
                setAddTodoModalVisible(!addTodoModalVisible);
              }}
            >
              <Image
                source={require("../../assets/todo.png")}
                style={styles.noteImage}
              />
            </Pressable>
          </Animated.View>
        </Animated.View>
        <AddNotesModalComponent
          addNoteModalVisible={addNoteModalVisible}
          setAddNoteModalVisible={setAddNoteModalVisible}
          addData={addData}
          setAddData={setAddData}
        />
        <AddTodosModalComponent
          addTodoModalVisible={addTodoModalVisible}
          setAddTodoModalVisible={setAddTodoModalVisible}
          addData={addData}
          setAddData={setAddData}
        />
        {selectedData?.itemType === "note" ? (
          <ViewAndEditNoteModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            editMode={editMode}
            setEditMode={setEditMode}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        ) : (
          <ViewAndEditTodoModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            editMode={editMode}
            setEditMode={setEditMode}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        )}
        <View style={{ marginTop: 20 }}>
          {/* <SwipeableFlatList
            keyExtractor={extractItemKey}
            data={data}
            renderItem={renderItem}
            maxSwipeDistance={80}
            renderQuickActions={({
              index,
              item,
            }: {
              index: any;
              item: commonListTodo;
            }) => QuickActions(index, item)}
            contentContainerStyle={styles.contentContainerStyle}
            shouldBounceOnMount={true}
          /> */}
        </View>
        <AnimatedList data={data} deleteFunction={deleteItem} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
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
