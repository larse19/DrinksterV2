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
import WideButton from "../../common/components/wideButton";
import { colors, common } from "../../common/styles/styles";
import NearbyParties from "./nearbyParties";

const FindParty = (props: any) => {
  const [partyID, setPartyID] = useState("");
  const [inputValue, setInputValue] = useState("");

  const joinParty = () => {
    console.log(partyID);
  };

  const selectParty = (partyID: string) => {
    setInputValue(partyID);
  };

  useEffect(() => {
    setPartyID(inputValue);
  }, [inputValue]);

  return (
    <SafeAreaView style={[common.background]}>
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
            style={styles.textInput}
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
        onPress={joinParty}
      />
    </SafeAreaView>
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
  textInput: {
    height: 50,
    backgroundColor: colors.light_grey,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    width: 350,
    color: "white",
  },
  text: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: "900",
  },
});

export default FindParty;
