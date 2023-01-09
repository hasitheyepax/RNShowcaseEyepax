import { AddNotesModalInterface } from "./interfaces/addNotesModalInterface";
import {
  Modal,
  View,
  Image,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { note } from "../config/types/note";
import { theme } from "../config/colors";
import { useContext } from "react";
import ThemeContext from "../contexts/themeContext";

const AddNotesModalComponent: React.FC<AddNotesModalInterface> = (props) => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.addNoteModalVisible}
      onRequestClose={() => {
        props.setAddNoteModalVisible(!props.addNoteModalVisible);
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
              value={props.addData?.item.title}
              onChangeText={(text) => {
                const tempData: note = {
                  id: "1254582",
                  title: text,
                  date: "09-01-2023",
                  description: props.addData?.item.description,
                  time: "11.38 A.M.",
                };
                props.setAddData({ item: tempData, itemType: "note" });
              }}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="black"
              style={styles.textInput}
              value={props.addData?.item.description}
              onChangeText={(text) => {
                const tempData: note = {
                  id: "1254582",
                  title: props.addData?.item.title,
                  date: "09-01-2023",
                  description: text,
                  time: "11.38 A.M.",
                };
                props.setAddData({ item: tempData, itemType: "note" });
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
                props.setAddNoteModalVisible(!props.addNoteModalVisible);
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

export default AddNotesModalComponent;

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
