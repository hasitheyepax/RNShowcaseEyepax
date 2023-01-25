import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { theme } from "../config/colors";
import ThemeContext from "../contexts/themeContext";
import { user } from "../config/types/user";
import { addUser, clearAsyncStorage, getUsers } from "../helpers/asyncStorage";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/slices/authSlice";
import stringUtils from "../utils/stringUtils";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";
import * as Yup from "yup";
import { Formik } from "formik";
import AppAuthTextInput from "../components/textInput/AppAuthTextInputs";

type Props = {};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  fullName: Yup.string().trim().required("Full Name is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Invalid password!")
    .required("Password is required!"),
});
type screenProp = StackNavigationProp<
  RootStackParamList,
  Navigation.registerScreen
>;
const RegisterScreen = (props: Props) => {
  const navigation = useNavigation<screenProp>();
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const formButtonScale = useSharedValue(1);

  const [inputs, setInputs] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const styles = themeStyles(theme);

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const handleRegister = async () => {
    const { email, fullName, password } = inputs;
    if (!email || !fullName || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields",
        text2: "Email, Full Name and Password are required!",
      });
    } else {
      const user: user = {
        email,
        fullName,
        password,
      };
      await addUser(user);
      Toast.show({
        type: "success",
        text1: "User registration successful",
        text2: "Please login again",
      });
    }
  };

  const handleGotoLogin = () => {
    navigation.navigate(Navigation.loginScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}></View>
      <LinearGradient
        style={styles.gradientContainer}
        colors={["#FA8989", "rgba(123, 143, 250, 0.51)", "rgba(0, 43, 92, 0)"]}
        locations={[0.0087, 0.4479, 0.75]}
      >
        <Formik
          initialValues={{
            email: inputs.email,
            password: inputs.password,
            fullName: inputs.fullName,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, formikActions) => {
            formikActions.resetForm();
            const { email, fullName, password } = values;
            if (!email || !fullName || !password) {
              Toast.show({
                type: "error",
                text1: "Please fill all fields",
                text2: "Email, Full Name and Password are required!",
              });
            } else {
              const user: user = {
                email,
                fullName,
                password,
              };
              await addUser(user);
              Toast.show({
                type: "success",
                text1: "User registration successful",
                text2: "Please login again",
              });
            }
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
            return (
              <>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>{"Optimiser"}</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../assets/login.png")}
                    style={styles.image}
                  />
                </View>
                <AppAuthTextInput
                  error={errors.email}
                  accessible={true}
                  accessibilityLabel={
                    stringUtils.LOGIN_SCREEN_EMAIL_INPUT_LABLE
                  }
                  accessibilityHint={stringUtils.LOGIN_SCREEN_EMAIL_INPUT_HINT}
                  placeholder="Email"
                  placeholderTextColor="#FFFFFF"
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                />
                {/* <View style={styles.blurViewContainer}>
                  <BlurView intensity={2} style={styles.textInputContainer}>
                    <TextInput
                      accessible={true}
                      accessibilityLabel={
                        stringUtils.LOGIN_SCREEN_EMAIL_INPUT_LABLE
                      }
                      accessibilityHint={
                        stringUtils.LOGIN_SCREEN_EMAIL_INPUT_HINT
                      }
                      placeholder="Email"
                      placeholderTextColor="#FFFFFF"
                      style={styles.textInput}
                      value={inputs.email}
                      onChangeText={(text) => {
                        setInputs({
                          ...inputs,
                          email: text,
                        });
                      }}
                    />
                  </BlurView>
                </View> */}

                <AppAuthTextInput
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
                {/* <View style={styles.blurViewContainer}>
                  <BlurView intensity={2} style={styles.textInputContainer}>
                    <TextInput
                      accessible={true}
                      accessibilityLabel={
                        stringUtils.LOGIN_SCREEN_FULL_NAME_INPUT_LABLE
                      }
                      accessibilityHint={
                        stringUtils.LOGIN_SCREEN_FULL_NAME_INPUT_HINT
                      }
                      placeholder="Full Name"
                      placeholderTextColor="#FFFFFF"
                      style={styles.textInput}
                      value={inputs.fullName}
                      onChangeText={(text) => {
                        setInputs({
                          ...inputs,
                          fullName: text,
                        });
                      }}
                    />
                  </BlurView>
                </View> */}

                <AppAuthTextInput
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
                  style={styles.textInput}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  secureTextEntry
                />
                {/* <View style={styles.blurViewContainer}>
                  <BlurView intensity={2} style={styles.textInputContainer}>
                    <TextInput
                      accessible={true}
                      accessibilityLabel={
                        stringUtils.LOGIN_SCREEN_PASSWORD_INPUT_LABLE
                      }
                      accessibilityHint={
                        stringUtils.LOGIN_SCREEN_PASSWORD_INPUT_HINT
                      }
                      placeholder="Password"
                      placeholderTextColor="#FFFFFF"
                      style={styles.textInput}
                      value={inputs.password}
                      onChangeText={(text) => {
                        setInputs({
                          ...inputs,
                          password: text,
                        });
                      }}
                      secureTextEntry
                    />
                  </BlurView>
                </View> */}
                <Pressable
                  accessible={true}
                  accessibilityLabel={
                    stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_LABLE
                  }
                  accessibilityHint={stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_HINT}
                  onPress={() => {
                    formButtonScale.value = withSequence(
                      withSpring(1.05, { damping: 1, overshootClamping: true }),
                      withSpring(1, { damping: 1, overshootClamping: true })
                    );

                    handleRegister();
                  }}
                >
                  <Animated.View
                    style={[styles.formButton, formButtonAnimatedStyle]}
                  >
                    <Text style={styles.buttonText}>{"Register"}</Text>
                  </Animated.View>
                </Pressable>
                <View style={styles.textWrapper}>
                  <Text style={styles.textStyle}>
                    {"Do you have an account?"}
                  </Text>
                  <Pressable onPress={handleGotoLogin}>
                    <Text style={styles.registerText}>{"Login"}</Text>
                  </Pressable>
                </View>
              </>
            );
          }}
        </Formik>
      </LinearGradient>
    </View>
  );
};

export default RegisterScreen;

const { width, height } = Dimensions.get("window");

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
    },
    gradientContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      flex: 1,
      zIndex: 2,
    },
    backgroundContainer: {
      height: height,
      width: width,
      backgroundColor: "#002B5C",
      position: "absolute",
    },
    headerContainer: {
      top: 0.1 * height,
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: {
      fontSize: 30,
      color: "white",
      fontWeight: "600",
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
      top: 0.14 * height,
      marginBottom: 0.13 * height,
    },
    image: {
      width: 0.43 * width,
      height: 0.34 * height,
    },
    textInputContainer: {
      width: 0.9 * width,
      height: 0.06 * height,
      justifyContent: "center",
      padding: 0.03 * width,
      borderRadius: 6,
      top: 0.04 * height,
    },
    blurViewContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 0.02 * height,
    },

    textWrapper: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0.02 * height,
    },
    textStyle: {
      color: "#FFFFFF",
    },
    registerText: {
      color: "#7B8FFA",
      textDecorationLine: "underline",
      fontSize: 16,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.rawText,
      letterSpacing: 0.5,
    },
    bottomContainer: {
      justifyContent: "center",
      height: height / 3,
    },
    textInput: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "400",
    },
    formButton: {
      backgroundColor: "#FA8989",
      height: 0.06 * height,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
      width: 0.9 * width,
      marginHorizontal: 0.05 * width,
      marginTop: 0.03 * height,
    },
  });
