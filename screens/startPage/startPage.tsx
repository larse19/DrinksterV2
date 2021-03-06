import React, { useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import WideButton from "../../common/components/wideButton";
import { common, colors } from "../../common/styles/styles";
import firebase from "firebase";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";

function StartPage(props: any) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate("Home");
      } else {
        props.navigation.navigate("Start");
      }
    });
  }, []);

  return (
    <CustomSafeAreaView style={common.background}>
      <DrinksterTitle />
      <View style={styles.container}>
        <WideButton
          title="Sign up"
          color={colors.secondary}
          onPress={() => props.navigation.navigate("Sign Up")}
        />
        <WideButton
          title="login"
          color={colors.primary}
          onPress={() => props.navigation.navigate("Login")}
        />
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
  },
});

export default StartPage;
