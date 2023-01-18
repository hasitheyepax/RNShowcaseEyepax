import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ThemeContext from "../contexts/themeContext";
import { theme } from "../config/colors";
const { height, width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

const QrScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
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
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.qrScanner}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
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
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: theme.colors.background,
    },
    qrScanner: {
      height: 350,
      width: width,
      top: 0.2 * height,
    },
    bottom: {
      height: height,
      width: width,
      backgroundColor: "#FA8989",
      position: "absolute",
    },
    gradientContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      flex: 1,
      height: 500,
    },
  });
