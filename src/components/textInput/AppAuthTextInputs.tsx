import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

interface AppAuthTextInputProps extends TextInputProps {
  error?: string | boolean | undefined;
}

const AppAuthTextInput: React.FC<AppAuthTextInputProps> = (props) => {
  const { error } = props;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <View style={styles.blurViewContainer}>
        <BlurView intensity={2} style={styles.textInputContainer}>
          <TextInput style={styles.textInput} {...props} />
        </BlurView>
      </View>
    </View>
  );
};

export default AppAuthTextInput;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#2C033C",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 0.025 * width,
    top: 0.006 * height,
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
  textInputContainer: {
    width: 0.9 * width,
    height: 0.06 * height,
    justifyContent: "center",
    padding: 0.03 * width,
    borderRadius: 6,
  },
  blurViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0.008 * height,
  },
  textInput: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
