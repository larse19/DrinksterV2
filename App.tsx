import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FindParty from "./screens/findParty/findParty";
import "./screens/homePage/homePage";
import HomePage from "./screens/homePage/homePage";
import LoginPage from "./screens/userAuthPages/loginPage";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PartyPage from "./screens/partyPage/partyPage";
import StartPage from "./screens/startPage/startPage";
import CreateUserPage from "./screens/userAuthPages/createUserPage";
import CreatePartyPage from "./screens/createPartyPage/createPartyPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={StartPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Sign Up" component={CreateUserPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Create Party" component={CreatePartyPage} />
        <Stack.Screen name="Find Party" component={FindParty} />
        <Stack.Screen name="Party Page" component={PartyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
