import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import Primary from "./src/navigation/Primary";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme, theme } from "./src/config/colors";
import ThemeContext from "./src/contexts/themeContext";

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<theme>(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const themeValue = {
    theme,
    setTheme,
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={themeValue}>
        <NavigationContainer>
          <Primary />
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}
