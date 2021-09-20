import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import SignOutButton from "../../common/components/signOutButton";
import WideButton from "../../common/components/wideButton";
import { colors, common } from "../../common/styles/styles";
import firebase from "firebase";

export default function HomePage(props: any) {
  return (
    <View style={common.background}>
      <SignOutButton />
      <DrinksterTitle style={common.title} />
      <View style={styles.container}>
        <WideButton
          title="find party"
          color={colors.secondary}
          onPress={() => props.navigation.navigate("Find Party")}
        />
        <WideButton
          title="create party"
          color={colors.primary}
          onPress={() => props.navigation.navigate("Create Party")}
        />
        <WideButton title="previous parties" color={colors.tertiary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 470,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
