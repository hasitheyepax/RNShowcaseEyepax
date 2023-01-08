import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { theme } from "../config/colors";
import ThemeContext from "../contexts/themeContext";

type Props = {};

const Search = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const Header: React.FC = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{`Search`}</Text>
        </View>
      </View>
    );
  };

  const styles = themeStyles(theme);

  const SearchContent = () => {
    return (
      <View style={styles.container}>
        <Text>Search</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header />
      <SearchContent />
    </SafeAreaView>
  );
};

export default Search;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
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
  });
