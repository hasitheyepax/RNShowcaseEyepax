import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { localTask } from "../../config/types/localTask";
import AppTextInput from "../textInput/AppTextInput";
import ModalButton from "./ModalButton";
import * as yup from "yup";
import { Formik } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import { addTask } from "../../redux/slices/taskSlice";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Modal from "react-native-modal";

interface Props {
  visible: boolean;
  onCancel: Function;
  onSubmit: Function;
  item?: localTask;
}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
});

const initialFormValues = {
  title: "",
  description: "",
};

const AddNote: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit, item } = props;
  const dispatch = useAppDispatch();

  return (
    <Modal isVisible={visible} onDismiss={() => onCancel()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.backdrop}
      >
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const task: localTask = {
              id: uuidv4(),
              title: values.title,
              description: values.description,
              type: "note",
              createdTimestamp: moment.now(),
            };
            dispatch(addTask(task));
            onSubmit();
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
            return (
              <View style={styles.contentContainer}>
                <View style={styles.interactionContainer}>
                  <Text style={styles.titleText}>{`Add Note`}</Text>
                  <AppTextInput
                    label={`Title`}
                    value={values.title}
                    maxLength={50}
                    error={errors.title}
                    onBlur={handleBlur("title")}
                    onChangeText={handleChange("title")}
                  />
                  <AppTextInput
                    label={`Description`}
                    multiline
                    style={styles.descriptionInput}
                    value={values.description}
                    error={errors.description}
                    onBlur={handleBlur("description")}
                    onChangeText={handleChange("description")}
                  />
                </View>
                <ModalButton
                  onPress={() => handleSubmit()}
                  label={"Submit"}
                  buttonType={"ok"}
                />
                <ModalButton
                  onPress={() => onCancel()}
                  label={"Cancel"}
                  buttonType={"cancel"}
                />
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddNote;

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
});
