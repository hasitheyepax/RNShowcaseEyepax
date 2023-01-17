import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "../config";
import Screens from "../screens";
import { RootStackParamList } from "./RootStackParams";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Navigation.login}
        component={Screens.Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Navigation.loginScreen}
        component={Screens.LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Navigation.registerScreen}
        component={Screens.RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
