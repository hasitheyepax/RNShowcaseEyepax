import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "../config";
import Screens from "../screens";

const Stack = createNativeStackNavigator();

const User = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Navigation.home}
        component={Screens.Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default User;
