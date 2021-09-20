import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import DrinksterTitle from "../../common/components/drinksterTitle";
import { colors, common } from "../../common/styles/styles";
import Leaderboard from "./leaderboard";
import { addDrink, leaveParty } from "../../utils/database";
import firebase from "firebase";
import WideButton from "../../common/components/wideButton";
import HalfButton from "../../common/components/halfButton";
import AddDrinkModal from "./addDrinkModal";

function PartyPage(props: any) {
  const [partyName, setPartyName] = useState<string>("");
  interface Participant {
    id: string;
    numOfDrinks: number;
  }
  const [particpants, setParticipants] = useState<Participant[]>([]);
  const [partyID, setPartyID] = useState<string>("");
  const [userID, setuserID] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hasLeft, setHasLeft] = useState(false);

  const leavePartyAlert = () => {
    // Prompt the user before leaving the screen
    Alert.alert(
      "Leave Party?",
      "You are about the leave the party, but you can always join again later, and continue drinking",
      [
        { text: "Don't leave", style: "cancel", onPress: () => {} },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => leave(),
        },
      ]
    );
  };

  // Prevents the user from leaving the page without leaving the party
  /*
  useEffect(
    () =>
      props.navigation.addListener("beforeRemove", (e: any) => {
        // Prevent default behavior of leaving the screen
        console.log(hasLeft);
        if (hasLeft) {
          return;
        }
        e.preventDefault();
        leavePartyAlert();
      }),
    [props.navigation, hasLeft]
  );
  */

  props.navigation.dispatch((state: any) => {
    const routes = state.routes.filter((r: any) => r.name == "Party Page");
    CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });

  const numOfDrinks = (drinksObj: any) => {
    return Object.keys(drinksObj).length;
  };

  const participantSort = (p1: Participant, p2: Participant) => {
    return p2.numOfDrinks - p1.numOfDrinks;
  };

  useEffect(() => {
    const { partyID } = props.route.params;
    setPartyID(partyID);
    setuserID(firebase.auth().currentUser?.uid || "");
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
          obj["id"] = key;
          obj["numOfDrinks"] = numOfDrinks(participantsObj[key].drinks);
          arr.push(obj);
        }
        //console.log(arr);
        arr.sort(participantSort);
        setParticipants(arr);
      });
    // stop listening for updates on the party
    return () =>
      firebase
        .database()
        .ref("parties/" + partyID)
        .off("value", onValueChange);
  }, []);

  const leave = async () => {
    setHasLeft(true);
    leaveParty(userID, partyID).then(() => {});
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={[common.background, { alignItems: "center" }]}>
      <DrinksterTitle />
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={[common.text, styles.partyName]} numberOfLines={1}>
            {partyName}
          </Text>
          <Text style={styles.partyID}>#{partyID}</Text>
        </View>
        <Leaderboard participants={particpants} />
      </View>
      <WideButton
        title={"add drink"}
        color={colors.secondary}
        onPress={() => setModalVisible(true)}
      />
      <AddDrinkModal
        visible={modalVisible}
        toggleHandler={toggleModal}
        partyID={partyID}
        userID={userID}
      />
      <View style={styles.hbContainer}>
        <HalfButton title={"invite"} color={colors.primary} />
        <HalfButton
          title={"leave"}
          color={colors.tertiary}
          onPress={leavePartyAlert}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  hbContainer: {
    flexDirection: "row",
  },
  partyName: {
    flexGrow: 0,
    flexShrink: 1,
  },
  partyID: {
    color: colors.light_grey,
    fontSize: 18,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: Dimensions.get("window").width * 0.95,
  },
});

export default PartyPage;
