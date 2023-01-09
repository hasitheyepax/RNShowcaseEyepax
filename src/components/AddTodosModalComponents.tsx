// @ts-nocheck
import {
  Modal,
  View,
  Image,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { theme } from "../config/colors";
import { useContext } from "react";
import ThemeContext from "../contexts/themeContext";
import { AddTodoModalInterface } from "./interfaces/AddTodoModalInterface";
import { todos } from "../config/types/todos";

const AddTodosModalComponent: React.FC<AddTodoModalInterface> = (props) => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.addTodoModalVisible}
      onRequestClose={() => {
        props.setAddTodoModalVisible(!props.addTodoModalVisible);
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
              value={props.addData?.item.priority}
              onChangeText={(text) => {
                const tempData: todos = {
                  id: "225588",
                  title: props.addData?.item.title,
                  date: props.addData?.item.date,
                  description: props.addData?.item.description,
                  time: props.addData?.item?.time,
                  dueDate: props.addData?.item.dueDate,
                  dueTime: props.addData?.item.dueTime,
                  priority: text,
                };
                props.setAddData({ item: tempData, itemType: "todo" });
              }}
            />
            <TextInput
              placeholder="Title"
              placeholderTextColor="black"
              style={styles.textInput}
              value={props.addData?.item.title}
              onChangeText={(text) => {
                const tempData: todos = {
                  id: "225588",
                  title: text,
                  date: props.addData?.item.date,
                  description: props.addData?.item.description,
                  time: props.addData?.item?.time,
                  dueDate: props.addData?.item.dueDate,
                  dueTime: props.addData?.item.dueTime,
                  priority: props.addData?.item.priority,
                };
                props.setAddData({ item: tempData, itemType: "todo" });
              }}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="black"
              style={styles.textInput}
              value={props.addData?.item.description}
              onChangeText={(text) => {
                const tempData: todos = {
                  id: "225588",
                  title: props.addData?.item.title,
                  date: props.addData?.item.date,
                  description: text,
                  time: props.addData?.item?.time,
                  dueDate: props.addData?.item.dueDate,
                  dueTime: props.addData?.item.dueTime,
                  priority: props.addData?.item.priority,
                };
                props.setAddData({ item: tempData, itemType: "todo" });
              }}
            />
            <TextInput
              placeholder="Due Date"
              placeholderTextColor="black"
              style={styles.textInput}
              value={props.addData?.item.dueDate}
              onChangeText={(text) => {
                const tempData: todos = {
                  id: props.addData?.item.id,
                  title: props.addData?.item.title,
                  date: props.addData?.item.date,
                  description: props.addData?.item.description,
                  time: props.addData?.item?.time,
                  dueDate: text,
                  dueTime: props.addData?.item.dueTime,
                  priority: props.addData?.item.priority,
                };
                props.setAddData({ item: tempData, itemType: "todo" });
              }}
            />
            <TextInput
              placeholder="Due Time"
              placeholderTextColor="black"
              style={styles.textInput}
              value={props.addData?.item.dueTime}
              onChangeText={(text) => {
                const tempData: todos = {
                  id: props.addData?.item.id,
                  title: props.addData?.item.title,
                  date: props.addData?.item.date,
                  description: props.addData?.item.description,
                  time: props.addData?.item?.time,
                  dueDate: props.addData?.item.dueDate,
                  dueTime: text,
                  priority: props.addData?.item.priority,
                };
                props.setAddData({ item: tempData, itemType: "todo" });
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
                props.setAddTodoModalVisible(!props.addTodoModalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTodosModalComponent;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.3)",
      zIndex: 2,
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
    modalButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "100%",
      marginHorizontal: -10,
    },
    modalDetailContent: {
      marginVertical: 10,
      width: 250,
      justifyContent: "center",
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
    buttonClose: {
      backgroundColor: theme.colors.secondary,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
