import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./tab.routes";
import { CreateAccount } from "../screens/CreateAccount";
import { LoginAccount } from "../screens/LoginAccount";
import { CreateProfile } from "../screens/CreateProfile";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="LoginAccount" component={LoginAccount} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Home" component={TabRoutes} />
    </Stack.Navigator>
  );
}
