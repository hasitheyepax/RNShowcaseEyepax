import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";

type Props = {};

const Home = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const themeStyles = (theme: theme) => StyleSheet.create({});
