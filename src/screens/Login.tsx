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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParams";

type Props = {};

type screenProp = StackNavigationProp<RootStackParamList, Navigation.login>;
const LoginScreen = (props: Props) => {
  const navigation = useNavigation<screenProp>();
  const { theme } = useContext(ThemeContext);
  const formButtonScale = useSharedValue(1);
  const styles = themeStyles(theme);

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const handleGotoRegister = () => {
    navigation.navigate(Navigation.registerScreen);
  };

  const handleGotoLogin = () => {
    navigation.navigate(Navigation.loginScreen);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.backgroundContainer}></View>
        <LinearGradient
          style={styles.gradientContainer}
          colors={[
            "#FA8989",
            "rgba(123, 143, 250, 0.51)",
            "rgba(0, 43, 92, 0)",
          ]}
          locations={[0.0087, 0.4479, 0.75]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/splash-new.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{"Optimiser"}</Text>
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

              handleGotoLogin();
            }}
          >
            <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
              <Text style={styles.buttonText}>{"Login"}</Text>
            </Animated.View>
          </Pressable>
          <Pressable
            accessible={true}
            accessibilityLabel={stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_LABLE}
            accessibilityHint={stringUtils.LOGIN_SCREEN_LOGIN_BUTTON_HINT}
            onPress={() => {
              formButtonScale.value = withSequence(
                withSpring(1.05, { damping: 1, overshootClamping: true }),
                withSpring(1, { damping: 1, overshootClamping: true })
              );

              handleGotoRegister();
            }}
          >
            <Animated.View
              style={[styles.formButtonRegister, formButtonAnimatedStyle]}
            >
              <Text style={styles.buttonText}>{"Register"}</Text>
            </Animated.View>
          </Pressable>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
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
      top: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 100,
    },
    headerText: {
      fontSize: 30,
      color: "#FA8989",
      fontWeight: "600",
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
      top: 50,
      // marginBottom: 100,
    },
    image: {
      width: 297,
      height: 297,
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
    formButtonRegister: {
      backgroundColor: "#7B8FFA",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
      width: 0.9 * width,
      marginHorizontal: 0.05 * width,
      marginTop: 20,
    },
  });
