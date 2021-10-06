import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import SignOutButton from "../../common/components/signOutButton";
import WideButton from "../../common/components/wideButton";
import { colors, common } from "../../common/styles/styles";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";
import firebase from "firebase";

export default function HomePage(props: any) {
  const [joinedParty, setJoinedParty] = useState("None");
  const [joinButtonText, setJoinButtonText] = useState("find party");

  useEffect(() => {
    const onValueChange = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser?.uid)
      .on("value", (snapshot) => {
        const party = snapshot.val().party;
        setJoinedParty(party);
        if (party != "None") {
          setJoinButtonText("go to party");
        } else {
          setJoinButtonText("find party");
        }
      });
    return () =>
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser?.uid)
        .off("value", onValueChange);
  }, []);

  const partyNavigator = () => {
    if (joinedParty != "None") {
      props.navigation.navigate("Party Page", { partyID: joinedParty });
    } else {
      props.navigation.navigate("Find Party");
    }
  };

  return (
    <CustomSafeAreaView style={common.background}>
      <SignOutButton />
      <View style={styles.container}>
        <DrinksterTitle />
        <View>
          <WideButton
            title={joinButtonText}
            color={colors.secondary}
            onPress={partyNavigator}
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
  },
});
