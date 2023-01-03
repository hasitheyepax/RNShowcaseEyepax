import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import Primary from "./src/navigation/Primary";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Primary />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
