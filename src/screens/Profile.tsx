import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectAuthEmail } from "../redux/slices/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import EditProfile from "../components/modals/EditProfile";
import { editUser, getUsers } from "../helpers/asyncStorage";
import { user } from "../config/types/user";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

const { height, width } = Dimensions.get("window");

const Profile = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const [userDetails, setUserDetails] = useState<user>();
  const [userDetailsEdited, setUserDetailsEdited] = useState<user>();
  const [image, setImage] = useState("");
  const [editVisible, setEditVisible] = useState(false);

  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(selectAuthEmail);
  const isFocused = useIsFocused();

  useEffect(() => {
    getProfileDetails();
  }, [isFocused]);

  const getProfileDetails = async () => {
    const users = await getUsers();
    if (users) {
      const user = users.find((e) => {
        return e.email === userEmail.payload;
      });
      if (user) {
        setUserDetails(user);
      }
    }
  };

  const Header: React.FC = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{`Profile`}</Text>
        </View>
      </View>
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };
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

  const handleGotoSettings = () => {
    setEditVisible(true);
  };
  const handleEditOnSubmit = async () => {
    // console.log(userDetailsEdited);
    // await editUser(userDetailsEdited);
    setEditVisible(false);
  };
  const handleEditOnCancel = () => {
    setEditVisible(false);
  };

  const styles = themeStyles(theme);

  const ProfileContent = () => {
    return (
      <>
        {/* <View style={styles.leftCurtain}></View>
        <View style={styles.rightCurtain}></View> */}
        <View style={styles.container}>
          <View style={styles.profilePicContainer}>
            {!image ? (
              <Image
                source={require("../../assets/profile-pic.png")}
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
            <Text style={styles.nameText}>{userDetails?.fullName}</Text>
            <Text style={styles.emailText}>{userDetails?.email}</Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <BlurView style={styles.blurView}>
              <View>
                <Pressable
                  onPress={handleGotoSettings}
                  style={styles.profileSettingsButton}
                >
                  <Image
                    source={require("../../assets/settings-icon.png")}
                    style={[styles.icon, { left: 10 }]}
                  />
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.logoutText}>{"Profile settings"}</Text>
                  </View>
                  <Image
                    source={require("../../assets/right-arrow-icon.png")}
                    style={styles.icon}
                  />
                </Pressable>
              </View>
            </BlurView>
            <BlurView style={styles.blurView2}>
              <View>
                <Pressable
                  onPress={handleLogout}
                  style={styles.profileSettingsButton}
                >
                  <Image
                    source={require("../../assets/logout.png")}
                    style={[styles.icon, { left: 10 }]}
                  />
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.logoutText}>{"Logout"}</Text>
                  </View>
                  <View style={styles.icon}></View>
                </Pressable>
              </View>
            </BlurView>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.bottom}></View>
      <LinearGradient
        style={styles.gradientContainer}
        colors={[
          "#002B5C",
          "rgba(123, 143, 250, 0.85)",
          "rgba(250, 137, 137, 0)",
        ]}
        locations={[0, 0.3385, 1]}
      >
        <EditProfile
          visible={editVisible}
          onSubmit={handleEditOnSubmit}
          onCancel={handleEditOnCancel}
          item={userDetails}
          setUserDetailsEdited={setUserDetailsEdited}
        />
        <Header />
        <ProfileContent />
      </LinearGradient>
    </View>
  );
};

export default Profile;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    wrapper: {
      flex: 1,
    },
    headerContainer: {
      marginTop: 20,
      justifyContent: "center",
      height: 70,
      zIndex: 10,
    },
    headerTextContainer: {
      left: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.colors.rawText,
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
    icon: {
      width: 24,
      height: 24,
    },
    detailsContainer: {
      marginTop: 25,
      alignItems: "center",
      justifyContent: "center",
    },
    nameText: {
      fontSize: 26,
      color: "#FFFFFF",
    },
    emailText: {
      fontSize: 16,
      color: "#FFFFFF",
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
    logoutText: {
      color: theme.colors.rawText,
    },
    gradientContainer: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 20 : undefined,
    },
    bottom: {
      height: height,
      width: width,
      backgroundColor: theme.colors.mainBackground,
      position: "absolute",
    },
    blurView: {
      height: 45,
      width: 0.9 * width,
      justifyContent: "center",
      alignItems: "flex-start",
      borderBottomWidth: 1,
      borderColor: "#FFFFFF",
    },
    blurView2: {
      height: 45,
      width: 0.9 * width,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    profileSettingsButton: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    buttonTextContainer: {
      width: 0.75 * width,
      left: 10,
    },
  });
