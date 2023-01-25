import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";
import * as Yup from "yup";
import { Formik } from "formik";
import AppAuthTextInput from "../components/textInput/AppAuthTextInputs";

type Props = {};

type screenProp = StackNavigationProp<
  RootStackParamList,
  Navigation.loginScreen
>;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Invalid password!")
    .required("Password is required!"),
});

const LoginScreen = (props: Props) => {
  const navigation = useNavigation<screenProp>();

  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const formButtonScale = useSharedValue(1);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const styles = themeStyles(theme);

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const handleGotoRegister = () => {
    navigation.navigate(Navigation.registerScreen);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.backgroundContainer}
    >
      {/* <View style={styles.backgroundContainer} /> */}
      <LinearGradient
        style={styles.gradientContainer}
        colors={["#FA8989", "rgba(123, 143, 250, 0.51)", "rgba(0, 43, 92, 0)"]}
        locations={[0.0087, 0.4479, 0.75]}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{"Optimiser"}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/login.png")}
              style={styles.image}
            />
          </View>
        </View>
        <Formik
          initialValues={{ email: inputs.email, password: inputs.password }}
          validationSchema={validationSchema}
          onSubmit={async (values, formikActions) => {
            const { email, password } = values;
            const users = await getUsers();
            if (!email || !password) {
              if (!users) {
                Toast.show({
                  type: "error",
                  text1: "Please fill both fields",
                  text2: "Email and Password are required!",
                });
              }
            } else {
              if (!users) {
                Toast.show({
                  type: "error",
                  text1: "No users found",
                  text2: "Please register a user first!",
                });
              } else {
                const user = users.find((e) => {
                  return e.email === email;
                });
                if (user?.password === password) {
                  dispatch(login());
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Invalid credentials",
                    text2: "Please check your email and password",
                  });
                }
              }
            }
            formikActions.resetForm();
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
            return (
              <View style={styles.inputs}>
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
                <Pressable
                  accessible={true}
                  accessibilityLabel={
                    stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_LABLE
                  }
                  accessibilityHint={stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_HINT}
                  onPress={() => {
                    formButtonScale.value = withSequence(
                      withSpring(1.05, {
                        damping: 1,
                        overshootClamping: true,
                      }),
                      withSpring(1, { damping: 1, overshootClamping: true })
                    );

                    handleSubmit();
                  }}
                >
                  <Animated.View
                    style={[styles.formButton, formButtonAnimatedStyle]}
                  >
                    <Text style={styles.buttonText}>{"Login"}</Text>
                  </Animated.View>
                </Pressable>
                <View style={styles.textWrapper}>
                  <Text style={styles.textStyle}>
                    {"Do not have an account?"}
                  </Text>
                  <Pressable onPress={handleGotoRegister}>
                    <Text style={styles.registerText}>{"Register"}</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        </Formik>
        {/* </View> */}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const { width, height } = Dimensions.get("window");

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      // justifyContent: "flex-end",
    },
    gradientContainer: {
      // position: "absolute",
      // left: 0,
      // right: 0,
      // top: 0,
      flex: 1,
      //   height: 500,
      // zIndex: 2,
    },
    backgroundContainer: {
      backgroundColor: "#002B5C",
      flex: 1,
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
      top: 0.16 * height,
      marginBottom: 0.15 * height,
    },
    image: {
      width: 0.5 * width,
      height: 0.4 * height,
    },
    textInputContainer: {
      width: 0.9 * width,
      height: 0.06 * height,
      justifyContent: "center",
      padding: 0.03 * width,
      borderRadius: 6,
      //   backgroundColor: "#FFFFFF",
      //   opacity: 0.1,
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
      // marginTop: 0.02 * height,
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
      marginTop: 0.04 * height,
      marginBottom: 0.02 * height,
    },
    inputs: {
      flex: 1,
      marginBottom: 40,
      justifyContent: "flex-end",
    },
  });
