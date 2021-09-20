import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import WideButton from "../../common/components/wideButton";
import { colors, common, inputStyles } from "../../common/styles/styles";
import { createUser, signInWithEmail } from "../../utils/auth";
import BackButton from "../../common/components/backButton";

const signUp = async (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  if (password1 == password2) {
    createUser(username, email, password1);
  } else {
    Alert.alert("Wrong password", "Passwords don't match", [{ text: "OK" }]);
  }
};

function CreateUserPage(props: any) {
  const [usernameField, setUsernameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [passwordField2, setPasswordField2] = useState("");

  return (
    <SafeAreaView style={common.background}>
      <BackButton navigation={props.navigation} />
      <DrinksterTitle style={common.title} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={common.text}>Create new user</Text>
        <TextInput
          style={inputStyles.textInput}
          placeholder={"Username"}
          placeholderTextColor={"#fff"}
          value={usernameField}
          onChangeText={setUsernameField}
        ></TextInput>
        <TextInput
          style={inputStyles.textInput}
          placeholder={"Email"}
          placeholderTextColor={"#fff"}
          value={emailField}
          onChangeText={setEmailField}
        ></TextInput>
        <TextInput
          style={inputStyles.textInput}
          placeholder={"Password"}
          placeholderTextColor={"#fff"}
          value={passwordField}
          onChangeText={setPasswordField}
          secureTextEntry={true}
        ></TextInput>
        <TextInput
          style={inputStyles.textInput}
          placeholder={"Repeat Password"}
          placeholderTextColor={"#fff"}
          value={passwordField2}
          onChangeText={setPasswordField2}
          secureTextEntry={true}
        ></TextInput>
      </KeyboardAvoidingView>
      <WideButton
        title={"Sign Up"}
        color={colors.primary}
        onPress={() =>
          signUp(usernameField, emailField, passwordField, passwordField2)
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CreateUserPage;
