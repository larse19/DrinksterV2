import React, { useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import { common } from "../../common/styles/styles";
import Leaderboard from "./leaderboard";
import { getPartyName } from "../../utils/database";
import firebase from "firebase";

function PartyPage(props: any) {
  const [partyName, setPartyName] = useState("");
  const [particpants, setParticipants] = useState([]);

  useEffect(() => {
    const { partyID } = props.route.params;
    const onValueChange = firebase
      .database()
      .ref("parties/" + partyID)
      .on("value", (snapshot) => {
        setPartyName(snapshot.val().name);
        const participantsObj = snapshot.val().participants;
        let arr: any = [];
        for (let key in participantsObj) {
          let obj: any = {};
          obj[key] = participantsObj[key];
          arr.push(obj);
        }
        setParticipants(arr);
      });
    return () =>
      firebase
        .database()
        .ref("parties/" + partyID)
        .off("value", onValueChange);
  }, []);

  return (
    <SafeAreaView style={[common.background, { alignItems: "center" }]}>
      <DrinksterTitle />
      <View style={styles.container}>
        <Text style={[common.text, styles.partyName]}>{partyName}</Text>
        <Leaderboard participants={particpants} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  partyName: {
    alignSelf: "flex-start",
  },
});

export default PartyPage;
