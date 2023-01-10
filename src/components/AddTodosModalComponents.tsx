import {
  Modal,
  View,
  Image,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import { theme } from "../config/colors";
import { useContext, useState } from "react";
import ThemeContext from "../contexts/themeContext";
import { AddTodoModalInterface } from "./interfaces/AddTodoModalInterface";
import { todos } from "../config/types/todos";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const AddTodosModalComponent: React.FC<AddTodoModalInterface> = (props) => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);
  const [pickerMode, setPickerMode] = useState<string | undefined | null>(null);
  const [inline, setInline] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState({
    high: false,
    medium: true,
    low: false,
  });
  const [inputs, setInputs] = useState({
    item: {
      id: "",
      title: "",
      description: "",
      date: "",
      time: "",
      dueDate: "",
      dueTime: "",
      priority: "medium",
    },
    itemType: "todo",
  });

  const showDatePicker = () => {
    setPickerMode("date");
  };

  const showTimePicker = () => {
    setPickerMode("time");
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handlePrioritySet = (priority: string) => {
    if (priority === "high") {
      setSelectedPriority({ high: true, medium: false, low: false });
    } else if (priority === "medium") {
      setSelectedPriority({ high: false, medium: true, low: false });
    } else {
      setSelectedPriority({ high: false, medium: false, low: true });
    }
    setInputs({
      itemType: "todo",
      item: { ...inputs.item, priority: priority },
    });
  };
  const handleConfirm = (date: any) => {
    hidePicker();
    if (pickerMode === "date") {
      var newdate = moment(date).format("Do MMM YYYY");
      setInputs({
        itemType: "todo",
        item: { ...inputs.item, dueDate: newdate },
      });
    } else {
      var time = moment(date).format("LT");
      setInputs({
        itemType: "todo",
        item: { ...inputs.item, dueTime: time },
      });
    }
  };

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
            <DateTimePickerModal
              isVisible={pickerMode !== null}
              mode={pickerMode}
              onConfirm={handleConfirm}
              onCancel={hidePicker}
              display={inline ? "inline" : undefined}
            />
            <Text style={styles.text}>{"Priority"}</Text>
            <View style={styles.priorityContainer}>
              <Pressable
                style={
                  selectedPriority.high
                    ? styles.prioritySelected
                    : styles.priorityUnselected
                }
                onPress={() => {
                  handlePrioritySet("high");
                }}
              >
                <Image
                  source={require("../../assets/high-risk.png")}
                  style={styles.priorityImage}
                />
              </Pressable>
              <Pressable
                style={
                  selectedPriority.medium
                    ? styles.prioritySelected
                    : styles.priorityUnselected
                }
                onPress={() => {
                  handlePrioritySet("medium");
                }}
              >
                <Image
                  source={require("../../assets/medium-risk.png")}
                  style={styles.priorityImage}
                />
              </Pressable>
              <Pressable
                style={
                  selectedPriority.low
                    ? styles.prioritySelected
                    : styles.priorityUnselected
                }
                onPress={() => {
                  handlePrioritySet("low");
                }}
              >
                <Image
                  source={require("../../assets/low-risk.png")}
                  style={styles.priorityImage}
                />
              </Pressable>
            </View>
            <TextInput
              placeholder="Title"
              placeholderTextColor="black"
              style={styles.textInput}
              value={inputs.item.title}
              onChangeText={(text) => {
                setInputs({
                  itemType: "todo",
                  item: { ...inputs.item, title: text },
                });
              }}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="black"
              style={styles.textInput}
              value={inputs.item.description}
              onChangeText={(text) => {
                setInputs({
                  itemType: "todo",
                  item: { ...inputs.item, description: text },
                });
              }}
            />

            <TouchableWithoutFeedback onPress={showDatePicker}>
              <TextInput
                placeholder="Due Date"
                placeholderTextColor="black"
                editable={false}
                style={styles.textInput}
                value={inputs.item.dueDate}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={showTimePicker}>
              <TextInput
                placeholder="Due Time"
                placeholderTextColor="black"
                style={styles.textInput}
                editable={false}
                value={inputs.item.dueTime}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.buttonModal, styles.buttonClose]}
              onPress={() => props.setAddData(inputs)}
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
    text: {
      height: 20,
      marginHorizontal: 5,
      marginVertical: 10,
      paddingLeft: 10,
      width: 240,
    },
    priorityContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    priorityImage: {
      width: 60,
      height: 60,
      borderRadius: 25,
    },
    prioritySelected: {
      width: 65,
      height: 65,
      borderRadius: 35,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    priorityUnselected: {
      width: 65,
      height: 65,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
    },
  });
