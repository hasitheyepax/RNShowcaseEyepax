import ListTile from "../components/ListTile";
import noteMock from "../mocks/notesMock";
import Swipeable from "react-native-gesture-handler/Swipeable";
import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

//@ts-ignore
import SwipeableFlatList from "react-native-swipeable-list";
import NoteData from "../interfaces/NoteData";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";

type Props = {};

const extractItemKey = (item: NoteData) => {
  return item.id.toString();
};

const Home = (props: Props) => {
  const [data, setData] = useState<NoteData[]>(noteMock);

  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  const deleteItem = (itemId: any) => {
    const newState = [...data];
    const filteredState = newState.filter((item) => item.id !== itemId);
    return setData(filteredState);
  };

  const QuickActions = (index: any, qaItem: NoteData) => {
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
      <SwipeableFlatList
        keyExtractor={extractItemKey}
        data={data}
        renderItem={({ item }: { item: NoteData }) => <ListTile item={item} />}
        maxSwipeDistance={80}
        renderQuickActions={({ index, item }: { index: any; item: NoteData }) =>
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
      backgroundColor: "#E5B8F4",
      height: 150,
      marginVertical: 5,
      marginRight: 10,
      borderRadius: 10,
      opacity: 0.7,
    },
    buttonText: {
      fontWeight: "bold",
      opacity: 1,
      marginRight: 10,
    },
    button3Text: {
      color: "red",
    },
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 10,
    },
  });
