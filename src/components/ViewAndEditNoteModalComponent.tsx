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
import { ViewAndEditNoteAndTodoModalInterface } from "./interfaces/ViewAndEditNoteAndTodoModalInterface";

const ViewAndEditNoteModalComponent: React.FC<
  ViewAndEditNoteAndTodoModalInterface
> = (props) => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
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
          {props.editMode ? (
            <View style={styles.modalDetailContent}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="black"
                style={styles.textInput}
                value={props.selectedData?.item.title}
                onChangeText={(text) => {
                  const tempData: note = {
                    id: props.selectedData?.item.id,
                    title: text,
                    date: props.selectedData?.item.date,
                    description: props.selectedData?.item.description,
                    time: props.selectedData?.item?.time,
                  };
                  props.setSelectedData({ item: tempData, itemType: "note" });
                }}
              />
              <TextInput
                placeholder="Description"
                placeholderTextColor="black"
                style={styles.textInput}
                value={props.selectedData?.item?.description}
                onChangeText={(text) => {
                  const tempData: note = {
                    id: props.selectedData?.item.id,
                    title: props.selectedData?.item.title,
                    date: props.selectedData?.item.date,
                    description: text,
                    time: props.selectedData?.item.time,
                  };
                  props.setSelectedData({ item: tempData, itemType: "note" });
                }}
              />
            </View>
          ) : (
            <View style={styles.modalDetailContent}>
              <Text style={styles.modalTitleText}>
                {props.selectedData?.item.title}
              </Text>
              <Text style={styles.modalDescriptionText}>
                {props.selectedData?.item.description}
              </Text>
              <View style={styles.modalDateTimeContainer}>
                <Text
                  style={styles.modalDateTimeText}
                >{`${props.selectedData?.item.time}  ,  ${props.selectedData?.item.date}`}</Text>
              </View>
            </View>
          )}
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.buttonModal, styles.buttonClose]}
              onPress={() => props.setEditMode(!props.editMode)}
            >
              <Text style={styles.textStyle}>
                {!props.editMode ? "Edit" : "Save"}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.buttonModal, styles.buttonClose]}
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
                props.setEditMode(false);
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

export default ViewAndEditNoteModalComponent;

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
  });
