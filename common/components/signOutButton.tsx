import React from "react";
import {
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { signOutUser } from "../../utils/auth";

function SignOutButton(props: any) {
  return (
    <TouchableWithoutFeedback onPress={() => signOutUser(props.navigation)}>
      <SafeAreaView style={[styles.button, props.style]}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
          Sign Out
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "flex-end",
    marginRight: 15,
  },
});

export default SignOutButton;
