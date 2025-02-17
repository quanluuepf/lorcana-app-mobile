import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Connexion" }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Accueil" }} />
    </Stack.Navigator>

  );
}