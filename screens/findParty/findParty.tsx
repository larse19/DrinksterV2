import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BackButton from "../../common/components/backButton";
import WideButton from "../../common/components/wideButton";
import { colors, common, inputStyles } from "../../common/styles/styles";
import NearbyParties from "./nearbyParties";
import { joinParty } from "../../utils/database";
import firebase from "firebase";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";

const FindParty = (props: any) => {
  const [partyID, setPartyID] = useState("");
  const [inputValue, setInputValue] = useState("");

  const join = async () => {
    joinParty(partyID).then(() => {
      props.navigation.navigate("Party Page", { partyID: partyID });
    });
  };

  const selectParty = (partyID: string) => {
    setInputValue(partyID);
  };

  useEffect(() => {
    setPartyID(inputValue);
  }, [inputValue]);

  return (
    <CustomSafeAreaView style={[common.background]}>
      <BackButton navigation={props.navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.nearbyParties}>
          <Text style={styles.text}>Nearby Puplic Parties</Text>
          <NearbyParties style={styles.partyList} onSelect={selectParty} />
        </View>
        <View style={styles.partyID}>
          <Text style={styles.text}>Join with #PartyID</Text>
          <TextInput
            style={inputStyles.textInput}
            placeholder={"#ParyID"}
            placeholderTextColor={"#fff"}
            value={inputValue}
            onChangeText={setInputValue}
          ></TextInput>
        </View>
      </KeyboardAvoidingView>
      <WideButton
        title={"join party"}
        color={colors.secondary}
        onPress={join}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  nearbyParties: {
    justifyContent: "center",
    alignItems: "center",
  },
  partyList: {
    marginTop: 10,
    width: 350,
  },
  partyID: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: "900",
  },
});

export default FindParty;
