import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
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

type Props = {};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const styles = themeStyles(theme);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2 - 50, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const logoAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [-width, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Animated.View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg height={height + 100} width={width}>
            <ClipPath id="clipPathId">
              <Ellipse cx={width / 2} rx={height} ry={height + 100} />
            </ClipPath>
            <Image
              href={require("../../assets/login-background.jpg")}
              width={width + 100}
              height={height + 100}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipPathId)"
            />
          </Svg>
        </Animated.View>
        <Pressable
          style={{ zIndex: 100 }}
          onPress={() => {
            imagePosition.value = 1;
            Keyboard.dismiss();
            setInputs({
              email: "",
              fullName: "",
              password: "",
            });
          }}
        >
          <Animated.View
            style={[styles.closeButtonContainer, closeButtonContainerStyle]}
          >
            <Text>X</Text>
          </Animated.View>
        </Pressable>
        <View style={styles.logoContainer}>
          <Animated.View style={logoAnimatedStyle}>
            <Svg height={150} width={150}>
              <ClipPath id="clipPathId">
                <Ellipse cx={width / 2} rx={height} ry={height + 100} />
              </ClipPath>
              <Image
                href={require("../../assets/app-icon.png")}
                width={130}
                height={130}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clipPathId)"
              />
            </Svg>
          </Animated.View>
        </View>

        <View style={styles.bottomContainer}>
          <Animated.View style={buttonsAnimatedStyle}>
            <Pressable style={styles.button} onPress={loginHandler}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={buttonsAnimatedStyle}>
            <Pressable style={styles.button} onPress={registerHandler}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              style={styles.textInput}
              value={inputs.email}
              onChangeText={(text) => {
                setInputs({
                  ...inputs,
                  email: text,
                });
              }}
            />
            {isRegistering && (
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="black"
                style={styles.textInput}
                value={inputs.fullName}
                onChangeText={(text) => {
                  setInputs({
                    ...inputs,
                    fullName: text,
                  });
                }}
              />
            )}
            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
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
            <Pressable
              onPress={() => {
                formButtonScale.value = withSequence(
                  withSpring(1.05, { damping: 1, overshootClamping: true }),
                  withSpring(1, { damping: 1, overshootClamping: true })
                );
                if (isRegistering) {
                  handleRegister();
                } else {
                  handleLogin();
                }
              }}
            >
              <Animated.View
                style={[styles.formButton, formButtonAnimatedStyle]}
              >
                <Text style={styles.buttonText}>
                  {isRegistering ? "REGISTER" : "LOG IN"}
                </Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const { width, height } = Dimensions.get("window");

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
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
      height: 40,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 25,
      paddingLeft: 10,
    },
    formButton: {
      backgroundColor: theme.colors.secondary,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 35,
      marginHorizontal: 60,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: theme.colors.rawText,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    formInputContainer: {
      marginBottom: 20,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: -1,
      justifyContent: "center",
    },
    closeButtonContainer: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 1,
      backgroundColor: theme.colors.rawText,
      alignItems: "center",
      borderRadius: 20,
      top: -20,
    },
    logoContainer: {
      height: 180,
      width: width,
      position: "absolute",
      top: 140,
      justifyContent: "center",
      alignItems: "center",
    },
  });
