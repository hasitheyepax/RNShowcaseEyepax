import { StyleSheet, Switch, Text, View } from "react-native";
import React, { FC, useContext } from "react";
import { theme } from "../../config/colors";
import ThemeContext from "../../contexts/themeContext";

interface settingItemProps {
  label: string;
  enabled: boolean;
  onValueChange: Function;
}

const SettingsItem: FC<settingItemProps> = (props): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  const { label, enabled, onValueChange } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <Switch
        value={enabled}
        onValueChange={() => onValueChange()}
        trackColor={{ false: "#767577", true: theme.colors.secondary }}
        thumbColor={enabled ? theme.colors.background : theme.colors.card}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
};

export default SettingsItem;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 35,
      marginVertical: 5,
    },
    labelText: {
      color: theme.colors.rawText,
      fontSize: 18,
    },
  });
