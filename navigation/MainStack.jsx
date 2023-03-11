import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ContactAgencyScreen,
  LoginScreen,
  MainScreen,
  PropertyScreen,
  Register2Screen,
<<<<<<< HEAD
  RegisterScreen
=======
  RegisterScreen,
>>>>>>> 5efbb278a3cb0d29b8e4d5ebf8e66d268f37edb8
} from "../src/screens";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="MainScreen" screenOptions={{headerShown: false}}>
=======
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{ headerShown: false }}
      >
>>>>>>> 5efbb278a3cb0d29b8e4d5ebf8e66d268f37edb8
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register2Screen"
          component={Register2Screen}
          options={{ headerShown: false }}
        />
<<<<<<< HEAD
        <Stack.Screen
        name="PropertyScreen"
        component={PropertyScreen}
        
      />
        
      <Stack.Screen
      name="ContactAgency"
      component={ContactAgencyScreen}
      options={{ headerShown: false }}
    />
=======
        <Stack.Screen name="PropertyScreen" component={PropertyScreen} />

        <Stack.Screen
          name="ContactAgency"
          component={ContactAgencyScreen}
          options={{ headerShown: false }}
        />
>>>>>>> 5efbb278a3cb0d29b8e4d5ebf8e66d268f37edb8
      </Stack.Navigator>
    </NavigationContainer>
  );
};
