import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "../config";
import Screens from "../screens";

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Navigation.login}
        component={Screens.LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
