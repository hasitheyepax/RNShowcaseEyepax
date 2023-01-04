import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { theme } from "../config/colors";
import ThemeContext from "../contexts/themeContext";

type Props = {};

const Profile = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
