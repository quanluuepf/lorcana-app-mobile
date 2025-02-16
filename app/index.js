import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Connexion" }} />
    </NavigationContainer>

  );
}