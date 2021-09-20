import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import SignOutButton from "../../common/components/signOutButton";
import WideButton from "../../common/components/wideButton";
import { colors, common } from "../../common/styles/styles";
import firebase from "firebase";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";

export default function HomePage(props: any) {
  return (
    <CustomSafeAreaView style={common.background}>
      <SignOutButton />
      <View style={styles.container}>
        <DrinksterTitle />
        <View>
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
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
