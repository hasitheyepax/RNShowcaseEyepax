import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import ModalButton from "./ModalButton";
import * as Yup from "yup";
import { Formik } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import Modal from "react-native-modal";
import { user } from "../../config/types/user";
import AppAuthTextInput from "../textInput/AppAuthTextInputs";
import stringUtils from "../../utils/stringUtils";
import AppTextInput from "../textInput/AppTextInput";

interface Props {
  visible: boolean;
  onCancel: Function;
  onSubmit: Function;
  item?: user | null;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  fullName: Yup.string().trim().required("Full Name is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Invalid password!")
    .required("Password is required!"),
});

const EditProfile: React.FC<Props> = (props) => {
  let { visible, onCancel, onSubmit, item } = props;
  const dispatch = useAppDispatch();

  return (
    <Modal isVisible={visible} onDismiss={() => onCancel()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.backdrop}
      >
        <Formik
          initialValues={{
            email: item?.email || "",
            fullName: item?.fullName || "",
            password: item?.password || "",
          }}
          // enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (item) {
            } else {
            }
            onSubmit();
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
            return (
              <View style={styles.contentContainer}>
                <View style={styles.interactionContainer}>
                  <Text style={styles.titleText}>{`Edit Profile`}</Text>

                  <AppTextInput
                    label="Email"
                    error={errors.email}
                    accessible={true}
                    accessibilityLabel={
                      stringUtils.LOGIN_SCREEN_EMAIL_INPUT_LABLE
                    }
                    accessibilityHint={
                      stringUtils.LOGIN_SCREEN_EMAIL_INPUT_HINT
                    }
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    value={values.email}
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                  />
                  <AppTextInput
                    label="Full Name"
                    error={errors.fullName}
                    accessible={true}
                    accessibilityLabel={
                      stringUtils.LOGIN_SCREEN_FULL_NAME_INPUT_LABLE
                    }
                    accessibilityHint={
                      stringUtils.LOGIN_SCREEN_FULL_NAME_INPUT_HINT
                    }
                    placeholder="Full Name"
                    placeholderTextColor="#FFFFFF"
                    value={values.fullName}
                    onBlur={handleBlur("fullName")}
                    onChangeText={handleChange("fullName")}
                  />
                  <AppTextInput
                    label="Password"
                    error={errors.password}
                    accessible={true}
                    accessibilityLabel={
                      stringUtils.LOGIN_SCREEN_PASSWORD_INPUT_LABLE
                    }
                    accessibilityHint={
                      stringUtils.LOGIN_SCREEN_PASSWORD_INPUT_HINT
                    }
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    secureTextEntry
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

export default EditProfile;

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
