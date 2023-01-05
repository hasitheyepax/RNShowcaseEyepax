import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
import * as ImagePicker from "expo-image-picker";

type Props = {};

const Profile = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const [userDetails, setUserDetails] = useState({});
  const [image, setImage] = useState("");

  const getProfileDetails = async () => {};

  const handleLogout = async () => {};
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const styles = themeStyles(theme);

  return (
    <>
      <View style={styles.leftCurtain}></View>
      <View style={styles.rightCurtain}></View>
      <View style={styles.container}>
        <View style={styles.profilePicContainer}>
          {!image ? (
            <Image
              source={require("../../assets/app-icon.png")}
              style={styles.image}
            />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          <View style={styles.cameraButton}>
            <Pressable onPress={pickImage}>
              <Image
                source={require("../../assets/camera.png")}
                style={styles.imageCamera}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>Isuru Ranapana</Text>
          <Text style={styles.emailText}>isuru.r@eyepax.com</Text>
        </View>

        <View style={styles.btnContainer}>
          <Pressable
            onPress={handleLogout}
            style={{ width: 150, alignItems: "center" }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Profile;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    header: {
      height: "50%",
      width: "100%",
      top: 0,
      alignItems: "center",
      justifyContent: "center",
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    profilePicContainer: {
      padding: 5,
      backgroundColor: theme.colors.primary,
      borderRadius: 75,
      margin: 5,
      height: 150,
      width: 150,
    },
    image: {
      width: 140,
      height: 140,
      borderRadius: 75,
    },
    imageCamera: {
      width: 46,
      height: 46,
      borderRadius: 25,
    },
    detailsContainer: {
      marginTop: 25,
      alignItems: "center",
      justifyContent: "center",
    },
    nameText: {
      fontSize: 26,
    },
    emailText: {
      fontSize: 16,
    },
    btnContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 80,
      backgroundColor: theme.colors.secondary,
      height: 35,
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
    cameraButton: {
      height: 46,
      width: 46,
      backgroundColor: theme.colors.secondary,
      position: "absolute",
      bottom: 0,
      right: 0,
      borderRadius: 25,
    },
    leftCurtain: {
      height: 400,
      width: 300,
      position: "absolute",
      backgroundColor: theme.colors.secondary,
      opacity: 0.4,
      borderBottomRightRadius: 1200,
      overflow: "hidden",
      borderTopRightRadius: 200,
    },
    rightCurtain: {
      height: 400,
      width: 300,
      position: "absolute",
      backgroundColor: theme.colors.card,
      opacity: 0.4,
      borderBottomLeftRadius: 1200,
      overflow: "hidden",
      borderTopLeftRadius: 200,
      right: 0,
    },
    logoutText: {
      color: theme.colors.rawText,
    },
  });
