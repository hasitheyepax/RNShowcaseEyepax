import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "../config/colors";
import ThemeContext from "../contexts/themeContext";
import { useContext } from "react";
import { todos } from "../config/types/todos";

export default function TodoTile({ item }: { item: todos }) {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <View style={styles.tile}>
      <View style={styles.container}></View>
      <View style={styles.innerContainer}></View>
      <View style={styles.iconContainer}>
        {item.risk === "high" ? (
          <Image
            source={require("../../assets/high-risk.png")}
            style={styles.image}
          />
        ) : item.risk === "medium" ? (
          <Image
            source={require("../../assets/medium-risk.png")}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../../assets/low-risk.png")}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeText}>{item.date}</Text>
          <Text style={styles.dateTimeText}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.checkContainer}></View>
    </View>
  );
}

const themeStyles = (theme: theme) =>
  StyleSheet.create({
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
      backgroundColor: theme.colors.primary,

      borderRadius: 10,

      zIndex: 1,
    },
    titleText: {
      color: theme.colors.rawText,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    descriptionText: {
      fontSize: 16,
      color: theme.colors.rawText,
    },
    innerContainer: {
      width: "80%",
      height: 150,
      backgroundColor: theme.colors.secondary,
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
      width: "70%",
      padding: 10,
      right: "15%",
    },
    dateTimeContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flex: 1,
    },
    dateTimeText: {
      color: theme.colors.rawText,
      fontSize: 14,
    },
    iconContainer: {
      position: "absolute",
      zIndex: 10,
      height: 150,
      width: "15%",
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    checkContainer: {
      position: "absolute",
      zIndex: 10,
      height: 150,
      width: "15%",
      padding: 10,
      right: 0,
    },
    image: {
      height: 45,
      width: 45,
    },
  });
