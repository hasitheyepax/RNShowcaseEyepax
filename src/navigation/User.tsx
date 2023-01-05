import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lottie from "lottie-react-native";
import { StyleSheet } from "react-native";
import AnimatedTabBar from "../components/AnimatedTabBar";
import homeIcon from "../components/assets/icons/home.icon.json";
import profileIcon from "../components/assets/icons/profile.icon.json";
import searchIcon from "../components/assets/icons/search.icon.json";
import settingsIcon from "../components/assets/icons/settings.icon.json";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Settings from "../screens/Settings";

const BottomTabs = createBottomTabNavigator();

const User = () => {
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
        }}
        name="Settings"
        component={Settings}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 32,
    width: 32,
  },
});

export default User;
