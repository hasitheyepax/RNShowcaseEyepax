import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { localTask } from "../../config/types/localTask";
import ModalButton from "./ModalButton";
import { useAppDispatch } from "../../redux/hooks";
import QRCode from "react-native-qrcode-svg";

import Modal from "react-native-modal";

interface Props {
  visible: boolean;
  onCancel: Function;
  item?: localTask | null;
}

const QrViewModal: React.FC<Props> = (props) => {
  let { visible, onCancel, item } = props;
  const dispatch = useAppDispatch();

  return (
    <Modal isVisible={visible} onDismiss={() => onCancel()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.backdrop}
      >
        <View style={styles.contentContainer}>
          <View style={styles.interactionContainer}>
            <Text style={styles.titleText}>{`Note QR`}</Text>
          </View>
          <View style={styles.qrContainer}>
            <QRCode size={150} value={JSON.stringify(item)} />
          </View>
          <ModalButton
            onPress={() => onCancel()}
            label={"Cancel"}
            buttonType={"cancel"}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default QrViewModal;

const styles = StyleSheet.create({
  backdrop: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#F2F4F6",
    width: "100%",
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
  qrContainer: {
    alignItems: "center",
    paddingVertical: 20,
    height: 200,
  },
});
