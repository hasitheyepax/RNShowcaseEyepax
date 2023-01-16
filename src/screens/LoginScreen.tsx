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

type Props = {};

const LoginScreen = (props: Props) => {
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

  const handleLogin = async () => {
    const { email, password } = inputs;
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
  };

  const handleGotoRegister = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}></View>
      <LinearGradient
        style={styles.gradientContainer}
        colors={["#FA8989", "rgba(123, 143, 250, 0.51)", "rgba(0, 43, 92, 0)"]}
        locations={[0.0087, 0.4479, 0.75]}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{"Optimiser"}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/login.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.blurViewContainer}>
          <BlurView intensity={2} style={styles.textInputContainer}>
            <TextInput
              accessible={true}
              accessibilityLabel={stringUtils.LOGIN_SCREEN_EMAIL_INPUT_LABLE}
              accessibilityHint={stringUtils.LOGIN_SCREEN_EMAIL_INPUT_HINT}
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
        </View>
        <View style={styles.blurViewContainer}>
          <BlurView intensity={2} style={styles.textInputContainer}>
            <TextInput
              accessible={true}
              accessibilityLabel={stringUtils.LOGIN_SCREEN_PASSWORD_INPUT_LABLE}
              accessibilityHint={stringUtils.LOGIN_SCREEN_PASSWORD_INPUT_HINT}
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
        </View>
        <Pressable
          accessible={true}
          accessibilityLabel={stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_LABLE}
          accessibilityHint={stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_HINT}
          onPress={() => {
            formButtonScale.value = withSequence(
              withSpring(1.05, { damping: 1, overshootClamping: true }),
              withSpring(1, { damping: 1, overshootClamping: true })
            );

            handleLogin();
          }}
        >
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Text style={styles.buttonText}>{"Login"}</Text>
          </Animated.View>
        </Pressable>
        <View style={styles.textWrapper}>
          <Text style={styles.textStyle}>{"Do not have an account?"}</Text>
          <TouchableWithoutFeedback onPress={handleGotoRegister}>
            <Text style={styles.registerText}>{"Register"}</Text>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;

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
      //   height: 500,
      zIndex: 2,
    },
    backgroundContainer: {
      height: height,
      width: width,
      backgroundColor: "#002B5C",
      position: "absolute",
    },
    headerContainer: {
      top: 60,
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
      top: 50,
    },
    image: {
      width: 193,
      height: 345,
    },
    textInputContainer: {
      width: 0.9 * width,
      height: 50,
      justifyContent: "center",
      padding: 10,
      borderRadius: 6,
      //   backgroundColor: "#FFFFFF",
      //   opacity: 0.1,
      top: 20,
    },
    blurViewContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },

    textWrapper: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    textStyle: {
      color: "#FFFFFF",
    },
    registerText: {
      color: "#7B8FFA",
      textDecorationLine: "underline",
      fontSize: 16,
    },
    button: {
      backgroundColor: theme.colors.secondary,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 35,
      marginHorizontal: 60,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: theme.colors.rawText,
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
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
      width: 0.9 * width,
      marginHorizontal: 0.05 * width,
      marginTop: 20,
    },
  });