import { createContext } from "react";
import { lightTheme, theme } from "../config/colors";

export type ThemeContext = {
  theme: theme;
  setTheme: Function;
};

const ThemeContext = createContext<ThemeContext>({
  theme: lightTheme,
  setTheme: () => {},
});

export default ThemeContext;
