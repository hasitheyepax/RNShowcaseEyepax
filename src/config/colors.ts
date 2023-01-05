export type colorsType = {
  primary: string;
  secondary: string;
  card: string;
  text: string;
  rawText: string;
  background: string;
};

export type theme = {
  colors: colorsType;
};

export const darkTheme: theme = {
  colors: {
    primary: "#2C033C",
    secondary: "#810CAA",
    card: "#C148E8",
    text: "#E5B7F5",
    rawText: "#FFF",
    background: "#82AAE3",
  },
};
export const lightTheme: theme = {
  colors: {
    primary: "#2C033C",
    secondary: "#810CAA",
    card: "#C148E8",
    text: "#E5B7F5",
    rawText: "#FFF",
    background: "#82AAE3",
  },
};

// export const lightTheme: theme = {
//   colors: {
//     primary: "#D6FFC7",
//     secondary: "#7DFA55",
//     card: "#3DBA15",
//     text: "#19460B",
//     rawText: "#000",
//     background: "#82AAE3",
//   },
// };
