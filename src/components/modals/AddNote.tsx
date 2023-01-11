import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { localTask } from "../../config/types/localTask";
import AppTextInput from "../textInput/AppTextInput";
import ModalButton from "./ModalButton";

interface Props {
  visible: boolean;
  onCancel: Function;
  onSubmit: Function;
  item?: localTask;
}

const AddNote: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit, item } = props;

  return (
    <Modal
      animationType={"fade"}
      visible={visible}
      transparent
      onRequestClose={() => onCancel()}
    >
      <TouchableWithoutFeedback onPress={() => onCancel()}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.contentContainer}>
              <View style={styles.interactionContainer}>
                <Text style={styles.titleText}>{`Add Note`}</Text>
                <AppTextInput label={`Title`} />
                <AppTextInput
                  label={`Description`}
                  multiline
                  style={styles.descriptionInput}
                />
              </View>
              <ModalButton
                onPress={() => onCancel()}
                label={"Submit"}
                buttonType={"ok"}
              />
              <ModalButton
                onPress={() => onCancel()}
                label={"Cancel"}
                buttonType={"cancel"}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#F2F4F6",
    width: "80%",
    borderRadius: 25,
    padding: 10,
  },
  interactionContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 20,
  },
  descriptionInput: {
    minHeight: 60,
    maxHeight: 120,
  },
});
