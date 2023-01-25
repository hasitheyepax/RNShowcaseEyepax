import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
const { height, width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import { localTask } from "../config/types/localTask";
import { useAppDispatch } from "../redux/hooks";
import { addTask } from "../redux/slices/taskSlice";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const QrScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);
  const dispatch = useAppDispatch();

  const Header: React.FC = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{`QR Scanner`}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      //@ts-ignore
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    try {
      const task: localTask = JSON.parse(data);
      const temp: localTask = {
        ...task,
        id: uuidv4(),
        createdTimestamp: moment.now(),
      };
      dispatch(addTask(temp));
    } catch (error) {
      console.log("scan failed");
    }
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bottom} />
      <LinearGradient
        style={styles.gradientContainer}
        colors={[
          "#002B5C",
          "rgba(123, 143, 250, 0.85)",
          "rgba(250, 137, 137, 0)",
        ]}
        locations={[0, 0.3385, 1]}
      >
        <Header />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.qrScanner}
            // barCodeTypes={}
          />
        </View>
        {true && (
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Pressable onPress={() => setScanned(false)}>
                <Text style={{ color: "#FFFFFF" }}>{"Tap to Scan Again"}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};
export default QrScannerScreen;

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: "center",
      // justifyContent: "center",
      // backgroundColor: theme.colors.background,
    },
    qrScanner: {
      height: height * 0.5,
      width: "80%",
      borderRadius: 10,
      overflow: "hidden",
    },
    bottom: {
      height: height,
      width: width,
      backgroundColor: "#FA8989",
      position: "absolute",
    },
    gradientContainer: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 60 : 38,
    },
    button: {
      height: 60,
      width: 150,
      bottom: -100,
      backgroundColor: "#002B5C",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      width: "100%",
      alignItems: "center",
    },
    headerContainer: {
      // marginTop: 20,
      // justifyContent: "center",
      // height: 70,
      // zIndex: 10,
    },
    headerTextContainer: {
      left: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.colors.rawText,
    },
  });
