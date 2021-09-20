import React from "react";
import {
  View,
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import WideButton from "../../common/components/wideButton";
import { addDrink } from "../../utils/database";
import { colors } from "../../common/styles/styles";

function AddDrinkModal(props: any) {
  const addDrinkTest = () => {
    addDrink(props.partyID, props.userID, "shots");
    props.toggleHandler();
  };

  return (
    <Modal visible={props.visible} animationType={"slide"} transparent={true}>
      <TouchableWithoutFeedback>
        <View style={styles.modalBackground}>
          <View style={styles.container}>
            <WideButton
              title={"add"}
              onPress={addDrinkTest}
              color={colors.primary}
            ></WideButton>
            <WideButton
              title={"close"}
              onPress={props.toggleHandler}
              color={colors.tertiary}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginVertical: 80,
    marginHorizontal: 25,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

export default AddDrinkModal;
