import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import WideButton from "../../common/components/wideButton";
import { colors, common, inputStyles } from "../../common/styles/styles";
import { signInWithEmail } from "../../utils/auth";
import { NavigationContainer } from "@react-navigation/native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import firebase from "firebase";
import BackButton from "../../common/components/backButton";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";

function LoginPage(props: any) {
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [user, setUser] = useState({});

  const signIn = async (email: string, password: string) => {
    signInWithEmail(email, password);
  };

  return (
    <CustomSafeAreaView style={common.background}>
      <BackButton navigation={props.navigation} />
      <DrinksterTitle style={common.title} />
      <View style={styles.container}>
        <Text style={common.text}>Login with Email</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={inputStyles.textInput}
            placeholder={"Username (email)"}
            placeholderTextColor={"#fff"}
            value={usernameField}
            onChangeText={setUsernameField}
          ></TextInput>
          <TextInput
            style={inputStyles.textInput}
            placeholder={"Password"}
            placeholderTextColor={"#fff"}
            value={passwordField}
            onChangeText={setPasswordField}
            secureTextEntry={true}
          ></TextInput>
        </KeyboardAvoidingView>
        <WideButton
          title="login"
          color={colors.secondary}
          onPress={() => signIn(usernameField, passwordField)}
        ></WideButton>
      </View>
    </CustomSafeAreaView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
