import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { theme } from "../config/colors";
import ThemeContext from "../contexts/themeContext";

type Props = {};

const Search = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
};

export default Search;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  });
