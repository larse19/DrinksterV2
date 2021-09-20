import React from "react";
import { useState } from "react";
import { View, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import DrinksterTitle from "../../common/components/drinksterTitle";
import WideButton from "../../common/components/wideButton";
import { colors, common, inputStyles } from "../../common/styles/styles";
import { createParty, joinParty } from "../../utils/database";
import BackButton from "../../common/components/backButton";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";

function CreatePartyPage(props: any) {
  const [partyNameField, setPartyNameField] = useState("");
  const [checked, setChecked] = useState("");

  const create = async () => {
    if (partyNameField != "" && checked != "") {
      createParty(partyNameField, checked == "public" ? true : false).then(
        (id) => {
          joinParty(id).then(() => {
            props.navigation.navigate("Party Page", { partyID: id });
          });
        }
      );
    }
  };

  return (
    <CustomSafeAreaView style={common.background}>
      <BackButton navigation={props.navigation} />
      <DrinksterTitle style={common.title} />
      <View style={styles.container}>
        <TextInput
          style={inputStyles.textInput}
          placeholder={"Party Name"}
          placeholderTextColor={"#fff"}
          value={partyNameField}
          onChangeText={setPartyNameField}
        />
        <View style={styles.rbContainer}>
          <View style={styles.rbView}>
            <View style={styles.radioButton}>
              <RadioButton
                value="Public"
                status={checked === "public" ? "checked" : "unchecked"}
                onPress={() => setChecked("public")}
                color={colors.primary}
              />
            </View>
            <Text style={common.text}>Public</Text>
          </View>
          <View style={styles.rbView}>
            <View style={styles.radioButton}>
              <RadioButton
                value="Private"
                status={checked === "private" ? "checked" : "unchecked"}
                onPress={() => setChecked("private")}
                color={colors.primary}
              />
            </View>
            <Text style={common.text}>Private</Text>
          </View>
        </View>
      </View>
      <WideButton
        title={"create party"}
        color={colors.primary}
        onPress={create}
      />
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  rbView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  rbContainer: {
    alignItems: "flex-start",
  },
  radioButton: {
    backgroundColor: colors.light_grey,
    borderRadius: 10000,
    marginRight: 5,
  },
});

export default CreatePartyPage;
