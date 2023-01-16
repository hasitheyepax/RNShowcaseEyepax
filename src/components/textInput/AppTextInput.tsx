import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";

interface AppTextInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  const { label, error } = props;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B6C9ED",
    width: "95%",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "300",
    color: "red",
  },
  input: {
    height: 50,
    maxHeight: 120,
  },
});
