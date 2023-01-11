import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface IModalButton {
  label: string;
  onPress: Function;
  buttonType?: "ok" | "cancel";
}

const OK_COLORS = ["#29e43d", "rgba(97,121,9,0.6)", "rgba(0,0,0,0.5)"];
const CANCEL_COLORS = [
  "rgba(249,91,91,1)",
  "rgba(226,19,19,1)",
  "rgba(51,35,35,1)",
];

const ModalButton: React.FC<IModalButton> = (props) => {
  const { label, onPress, buttonType = "ok" } = props;

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <LinearGradient
        colors={buttonType === "ok" ? OK_COLORS : CANCEL_COLORS}
        style={buttonType === "ok" ? styles.okButton : styles.cancelButton}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  okButton: {
    backgroundColor: "#68B984",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 5,
  },
  cancelButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
