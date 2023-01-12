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
  const { label } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
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
  labelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  input: {
    height: 50,
    maxHeight: 120,
  },
});
