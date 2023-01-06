import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lottie from "lottie-react-native";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import AnimatedTabBar from "../components/AnimatedTabBar";
import homeIcon from "../components/assets/icons/home.icon.json";
import profileIcon from "../components/assets/icons/profile.icon.json";
import searchIcon from "../components/assets/icons/search.icon.json";
import settingsIcon from "../components/assets/icons/settings.icon.json";
import { theme } from "../config/colors";
import ThemeContext from "../contexts/themeContext";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Settings from "../screens/Settings";

const BottomTabs = createBottomTabNavigator();

const User = () => {
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  return (
    <BottomTabs.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
      <BottomTabs.Screen
        options={{
          //@ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              style={styles.icon}
              source={homeIcon}
            />
          ),
          headerStyle: styles.header,
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <BottomTabs.Screen
        options={{
          //@ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              style={styles.icon}
              source={searchIcon}
            />
          ),
          headerStyle: styles.header,
          headerShown: false,
        }}
        name="Search"
        component={Search}
      />
      <BottomTabs.Screen
        options={{
          //@ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              style={styles.icon}
              source={profileIcon}
            />
          ),
          headerStyle: styles.header,
          headerShown: false,
        }}
        name="Profile"
        component={Profile}
      />
      <BottomTabs.Screen
        options={{
          //@ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              style={styles.icon}
              source={settingsIcon}
            />
          ),
          headerStyle: styles.header,
          headerShown: false,
        }}
        name="Settings"
        component={Settings}
      />
    </BottomTabs.Navigator>
  );
};

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    icon: {
      height: 32,
      width: 32,
    },
    header: {
      backgroundColor: theme.colors.background,
    },
  });

export default User;
