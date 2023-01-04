import { View, Text, StyleSheet } from "react-native";
import NoteData from "../interfaces/NoteData";

export default function ListTile({ item }: { item: NoteData }) {
  return (
    <View style={styles.tile}>
      <View style={styles.container}></View>
      <View style={styles.innerContainer}></View>
      <View style={styles.content}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeText}>{item.date}</Text>
          <Text style={styles.dateTimeText}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: "95%",
    height: 150,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    height: 150,
    backgroundColor: "#C147E9",

    borderRadius: 10,

    zIndex: 1,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: "white",
  },
  innerContainer: {
    width: "80%",
    height: 150,
    backgroundColor: "#810CA8",

    position: "absolute",
    zIndex: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 500,
    overflow: "hidden",
    borderTopRightRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    position: "absolute",
    zIndex: 10,
    height: 150,
    width: "100%",
    padding: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flex: 1,
  },
  dateTimeText: {
    color: "white",
    fontSize: 14,
  },
});
