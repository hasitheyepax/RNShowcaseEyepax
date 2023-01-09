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
} from "react-native-reanimated";

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

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(buttonPosition.value, [0, 1], [0, -50]);
    return {
      opacity: withTiming(buttonPosition.value, { duration: 500 }),
      transform: [
        {
          translateY: withTiming(interpolation + 10, { duration: 1000 }),
        },
        {
          translateX: withTiming(interpolation + 10, { duration: 500 }),
        },
      ],
      zIndex: 16,
      position: "absolute",
    };
  });

  const todoButtonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(buttonPosition.value, [0, 1], [0, -50]);
    return {
      opacity: withTiming(buttonPosition.value, { duration: 900 }),
      transform: [
        {
          translateY: withTiming(interpolation - 60, { duration: 1500 }),
        },
        {
          translateX: withTiming(interpolation + 50, { duration: 800 }),
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
    const newState = [...data];
    const filteredState = newState.filter((item) => item.item.id !== itemId);
    return setData(filteredState);
  };

  const QuickActions = (index: any, qaItem: commonListTodo) => {
    return (
      <View style={styles.qaContainer}>
        <View style={[styles.button]}>
          <Pressable onPress={() => deleteItem(qaItem.item.id)}>
            <Text style={[styles.buttonText, styles.button3Text]}>Delete</Text>
          </Pressable>
        </View>
      </View>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={addNoteModalVisible}
          onRequestClose={() => {
            setAddNoteModalVisible(!addNoteModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalImageContainer}>
              <Image
                source={require("../../assets/employee.png")}
                style={styles.imageCamera}
              />
            </View>
            <View style={styles.modalView}>
              <View style={styles.modalDetailContent}>
                <TextInput
                  placeholder="Title"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={addData?.item.title}
                  onChangeText={(text) => {
                    const tempData: note = {
                      id: "1254582",
                      title: text,
                      date: "09-01-2023",
                      description: addData?.item.description,
                      time: "11.38 A.M.",
                    };
                    setAddData({ item: tempData, itemType: "note" });
                  }}
                />
                <TextInput
                  placeholder="Description"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={addData?.item.description}
                  onChangeText={(text) => {
                    const tempData: note = {
                      id: "1254582",
                      title: addData?.item.title,
                      date: "09-01-2023",
                      description: text,
                      time: "11.38 A.M.",
                    };
                    setAddData({ item: tempData, itemType: "note" });
                  }}
                />
              </View>

              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => console.log("Add data")}
                >
                  <Text style={styles.textStyle}>{"Add"}</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => {
                    setAddNoteModalVisible(!addNoteModalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={addTodoModalVisible}
          onRequestClose={() => {
            setAddNoteModalVisible(!addTodoModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalImageContainer}>
              <Image
                source={require("../../assets/employee.png")}
                style={styles.imageCamera}
              />
            </View>
            <View style={styles.modalView}>
              <View style={styles.modalDetailContent}>
                <TextInput
                  placeholder="Priority"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={addData?.item.priority}
                  onChangeText={(text) => {
                    const tempData: todos = {
                      id: "225588",
                      title: addData?.item.title,
                      date: addData?.item.date,
                      description: addData?.item.description,
                      time: addData?.item?.time,
                      dueDate: addData?.item.dueDate,
                      dueTime: addData?.item.dueTime,
                      priority: text,
                    };
                    setSelectedData({ item: tempData, itemType: "todo" });
                  }}
                />
                <TextInput
                  placeholder="Title"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={addData?.item.title}
                  onChangeText={(text) => {
                    const tempData: todos = {
                      id: "225588",
                      title: text,
                      date: addData?.item.date,
                      description: addData?.item.description,
                      time: addData?.item?.time,
                      dueDate: addData?.item.dueDate,
                      dueTime: addData?.item.dueTime,
                      priority: addData?.item.priority,
                    };
                    setAddData({ item: tempData, itemType: "todo" });
                  }}
                />
                <TextInput
                  placeholder="Description"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={addData?.item.description}
                  onChangeText={(text) => {
                    const tempData: todos = {
                      id: "225588",
                      title: addData?.item.title,
                      date: addData?.item.date,
                      description: text,
                      time: addData?.item?.time,
                      dueDate: addData?.item.dueDate,
                      dueTime: addData?.item.dueTime,
                      priority: addData?.item.priority,
                    };
                    setAddData({ item: tempData, itemType: "todo" });
                  }}
                />
                <TextInput
                  placeholder="Due Date"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={addData?.item.dueDate}
                  onChangeText={(text) => {
                    const tempData: todos = {
                      id: addData?.item.id,
                      title: addData?.item.title,
                      date: addData?.item.date,
                      description: addData?.item.description,
                      time: addData?.item?.time,
                      dueDate: text,
                      dueTime: addData?.item.dueTime,
                      priority: addData?.item.priority,
                    };
                    setSelectedData({ item: tempData, itemType: "todo" });
                  }}
                />
                <TextInput
                  placeholder="Due Time"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={addData?.item.dueTime}
                  onChangeText={(text) => {
                    const tempData: todos = {
                      id: addData?.item.id,
                      title: addData?.item.title,
                      date: addData?.item.date,
                      description: addData?.item.description,
                      time: addData?.item?.time,
                      dueDate: addData?.item.dueDate,
                      dueTime: text,
                      priority: addData?.item.priority,
                    };
                    setSelectedData({ item: tempData, itemType: "todo" });
                  }}
                />
              </View>

              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => console.log("Add data")}
                >
                  <Text style={styles.textStyle}>{"Add"}</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => {
                    setAddTodoModalVisible(!addTodoModalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        {selectedData?.itemType === "note" ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalImageContainer}>
                <Image
                  source={require("../../assets/employee.png")}
                  style={styles.imageCamera}
                />
              </View>
              <View style={styles.modalView}>
                {editMode ? (
                  <View style={styles.modalDetailContent}>
                    <TextInput
                      placeholder="Title"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      value={selectedData?.item.title}
                      onChangeText={(text) => {
                        const tempData: note = {
                          id: selectedData?.item.id,
                          title: text,
                          date: selectedData?.item.date,
                          description: selectedData?.item.description,
                          time: selectedData?.item?.time,
                        };
                        setSelectedData({ item: tempData, itemType: "note" });
                      }}
                    />
                    <TextInput
                      placeholder="Description"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      value={selectedData?.item?.description}
                      onChangeText={(text) => {
                        const tempData: note = {
                          id: selectedData?.item.id,
                          title: selectedData?.item.title,
                          date: selectedData?.item.date,
                          description: text,
                          time: selectedData?.item.time,
                        };
                        setSelectedData({ item: tempData, itemType: "note" });
                      }}
                    />
                  </View>
                ) : (
                  <View style={styles.modalDetailContent}>
                    <Text style={styles.modalTitleText}>
                      {selectedData?.item.title}
                    </Text>
                    <Text style={styles.modalDescriptionText}>
                      {selectedData?.item.description}
                    </Text>
                    <View style={styles.modalDateTimeContainer}>
                      <Text
                        style={styles.modalDateTimeText}
                      >{`${selectedData?.item.time}  ,  ${selectedData?.item.date}`}</Text>
                    </View>
                  </View>
                )}
                <View style={styles.modalButtonContainer}>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => setEditMode(!editMode)}
                  >
                    <Text style={styles.textStyle}>
                      {!editMode ? "Edit" : "Save"}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setEditMode(false);
                    }}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalImageContainer}>
                <Image
                  source={require("../../assets/employee.png")}
                  style={styles.imageCamera}
                />
              </View>
              <View style={styles.modalView}>
                {editMode ? (
                  <View style={styles.modalDetailContent}>
                    <TextInput
                      placeholder="Priority"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      value={selectedData?.item.priority}
                      onChangeText={(text) => {
                        const tempData: todos = {
                          id: selectedData?.item.id,
                          title: selectedData?.item.title,
                          date: selectedData?.item.date,
                          description: selectedData?.item.description,
                          time: selectedData?.item?.time,
                          dueDate: selectedData?.item.dueDate,
                          dueTime: selectedData?.item.dueTime,
                          priority: text,
                        };
                        setSelectedData({ item: tempData, itemType: "todo" });
                      }}
                    />
                    <TextInput
                      placeholder="Title"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      value={selectedData?.item.title}
                      onChangeText={(text) => {
                        const tempData: todos = {
                          id: selectedData?.item.id,
                          title: text,
                          date: selectedData?.item.date,
                          description: selectedData?.item.description,
                          time: selectedData?.item?.time,
                          dueDate: selectedData?.item.dueDate,
                          dueTime: selectedData?.item.dueTime,
                          priority: selectedData?.item.priority,
                        };
                        setSelectedData({ item: tempData, itemType: "todo" });
                      }}
                    />
                    <TextInput
                      placeholder="Description"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      value={selectedData?.item?.description}
                      onChangeText={(text) => {
                        const tempData: todos = {
                          id: selectedData?.item.id,
                          title: selectedData?.item.title,
                          date: selectedData?.item.date,
                          description: text,
                          time: selectedData?.item.time,
                          dueDate: selectedData?.item.dueDate,
                          dueTime: selectedData?.item.dueTime,
                          priority: selectedData?.item.priority,
                        };
                        setSelectedData({ item: tempData, itemType: "todo" });
                      }}
                    />
                    <TextInput
                      placeholder="Due Date"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      value={selectedData?.item.dueDate}
                      onChangeText={(text) => {
                        const tempData: todos = {
                          id: selectedData?.item.id,
                          title: selectedData?.item.title,
                          date: selectedData?.item.date,
                          description: selectedData?.item.description,
                          time: selectedData?.item?.time,
                          dueDate: text,
                          dueTime: selectedData?.item.dueTime,
                          priority: selectedData?.item.priority,
                        };
                        setSelectedData({ item: tempData, itemType: "todo" });
                      }}
                    />
                    <TextInput
                      placeholder="Due Time"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      value={selectedData?.item.dueTime}
                      onChangeText={(text) => {
                        const tempData: todos = {
                          id: selectedData?.item.id,
                          title: selectedData?.item.title,
                          date: selectedData?.item.date,
                          description: selectedData?.item.description,
                          time: selectedData?.item?.time,
                          dueDate: selectedData?.item.dueDate,
                          dueTime: text,
                          priority: selectedData?.item.priority,
                        };
                        setSelectedData({ item: tempData, itemType: "todo" });
                      }}
                    />
                  </View>
                ) : (
                  <View style={styles.modalDetailContent}>
                    <Text style={styles.modalTitleText}>
                      {selectedData?.item.title}
                    </Text>
                    <Text style={styles.modalDescriptionText}>
                      {selectedData?.item.description}
                    </Text>
                    <View style={styles.modalDateTimeContainer}>
                      <Text
                        style={styles.modalDateTimeText}
                      >{`${selectedData?.item.time}  ,  ${selectedData?.item.date}`}</Text>
                    </View>
                  </View>
                )}
                <View style={styles.modalButtonContainer}>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => setEditMode(!editMode)}
                  >
                    <Text style={styles.textStyle}>
                      {!editMode ? "Edit" : "Save"}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setEditMode(false);
                    }}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}

        <SwipeableFlatList
          keyExtractor={extractItemKey}
          data={data}
          renderItem={({ item }: { item: commonListTodo }) => (
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
          )}
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
        />
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
      // backgroundColor: "red",
      height: 70,
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
      paddingBottom: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.3)",
      zIndex: 2,
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.colors.card,
      top: -70,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 3,
    },
    buttonModal: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginHorizontal: 25,
      width: 100,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      height: 40,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: theme.colors.rawText,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: theme.colors.secondary,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    textInput: {
      height: 40,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      marginHorizontal: 5,
      marginVertical: 10,
      borderRadius: 25,
      paddingLeft: 10,
      width: 240,
    },
    modalButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "100%",
      marginHorizontal: -10,
    },
    imageCamera: {
      width: 76,
      height: 76,
      borderRadius: 25,
      top: -10,
      left: 50,
    },
    modalImageContainer: {
      width: "100%",
      zIndex: 5,
    },
    modalDetailContent: {
      marginVertical: 10,
      width: 250,
      justifyContent: "center",
    },
    modalTitleText: {
      fontSize: 22,
      color: theme.colors.rawText,
      fontWeight: "bold",
      alignSelf: "center",
    },
    modalDescriptionText: {
      fontSize: 16,
      color: theme.colors.rawText,
      paddingVertical: 10,
      marginBottom: 10,
    },
    modalDateTimeContainer: {
      flexDirection: "row",
      position: "absolute",
      top: -40,
      right: -15,
    },
    modalDateTimeText: {
      fontSize: 12,
      color: theme.colors.rawText,
    },
    addButtonContainer: {
      position: "absolute",
      height: 50,
      width: 50,
      zIndex: 20,
      right: 30,
      bottom: 120,
    },
    addNoteButtonContainer: {
      position: "absolute",
      height: 50,
      width: 50,
      zIndex: 16,
      right: 30,
      bottom: 120,
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
