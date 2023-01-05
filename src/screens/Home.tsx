import ListTile from "../components/ListTile";
import noteMock from "../mocks/notesMock";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Alert,
  TextInput,
  Image,
} from "react-native";

//@ts-ignore
import SwipeableFlatList from "react-native-swipeable-list";
import { note } from "../config/types/note";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";

type Props = {};

const extractItemKey = (item: note) => {
  return item.id?.toString();
};

const Home = (props: Props) => {
  const [data, setData] = useState<note[]>(noteMock);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<note>();
  const [editMode, setEditMode] = useState(false);

  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  const deleteItem = (itemId: any) => {
    const newState = [...data];
    const filteredState = newState.filter((item) => item.id !== itemId);
    return setData(filteredState);
  };

  const QuickActions = (index: any, qaItem: note) => {
    return (
      <View style={styles.qaContainer}>
        <View style={[styles.button]}>
          <Pressable onPress={() => deleteItem(qaItem.id)}>
            <Text style={[styles.buttonText, styles.button3Text]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
                  placeholder="Title"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  value={selectedData?.title}
                  onChangeText={(text) => {
                    const tempData: note = {
                      id: selectedData?.id,
                      title: text,
                      date: selectedData?.date,
                      description: selectedData?.description,
                      time: selectedData?.time,
                    };
                    setSelectedData(tempData);
                  }}
                />
              </View>
            ) : (
              <View style={styles.modalDetailContent}>
                <Text style={styles.modalTitleText}>{selectedData?.title}</Text>
                <Text style={styles.modalDescriptionText}>
                  {selectedData?.description}
                </Text>
                <View style={styles.modalDateTimeContainer}>
                  <Text
                    style={styles.modalDateTimeText}
                  >{`${selectedData?.time}  ,  ${selectedData?.date}`}</Text>
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
      <SwipeableFlatList
        keyExtractor={extractItemKey}
        data={data}
        renderItem={({ item }: { item: note }) => (
          <Pressable
            onPress={() => {
              setSelectedData(item);
              setModalVisible(!modalVisible);
            }}
          >
            <ListTile item={item} />
          </Pressable>
        )}
        maxSwipeDistance={80}
        renderQuickActions={({ index, item }: { index: any; item: note }) =>
          QuickActions(index, item)
        }
        contentContainerStyle={styles.contentContainerStyle}
        shouldBounceOnMount={true}
      />
    </View>
  );
};

export default Home;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
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
      backgroundColor: theme.colors.primary,
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
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
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
      width: 200,
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
  });
