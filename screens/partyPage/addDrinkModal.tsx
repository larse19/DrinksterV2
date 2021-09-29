import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import WideButton from "../../common/components/wideButton";
import { addDrink } from "../../utils/database";
import { colors, inputStyles, common } from "../../common/styles/styles";
import DrinksList from "./drinksList";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

function AddDrinkModal(props: any) {
  interface Drink {
    id: string | number[];
    name: string;
    vol: string;
  }
  const [drinks, setDrinks] = useState([
    { id: uuid.v4(), name: "Beer", vol: "33" },
    { id: uuid.v4(), name: "Beer", vol: "50" },
    { id: uuid.v4(), name: "Vodka shot", vol: "2" },
    { id: uuid.v4(), name: "Cider", vol: "33" },
    { id: uuid.v4(), name: "Jägerbomb", vol: "10" },
    { id: uuid.v4(), name: "Sourz shot", vol: "4" },
  ]);
  const [drinkName, setDrinkName] = useState("");
  const [drinkVol, setDrinkVol] = useState("");
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);

  const closeModal = () => {
    setDrinkName("");
    setDrinkVol("");
    props.toggleHandler();
  };

  // Add new drink by entering name and volume
  const addNewDrink = () => {
    if (drinkName == "" || drinkVol == "") {
      return;
    }

    // Dont add if it already exists in the list
    let exists = false;
    drinks.forEach((drink) => {
      if (
        drink.name.toLocaleLowerCase() == drinkName.toLocaleLowerCase() &&
        drink.vol == drinkVol
      ) {
        exists = true;
        addDrinkFromList(drink);
      }
    });

    if (!exists) {
      // Add drink to list
      const newDrinkObj: Drink = {
        id: uuid.v4(),
        name: drinkName,
        vol: drinkVol,
      };
      let temp = [...drinks, newDrinkObj];
      let first = newDrinkObj;
      temp.sort(function (x, y) {
        return x == first ? -1 : y == first ? 1 : 0;
      });
      setDrinks(temp);
      // Add drink to database
      addDrink(props.partyID, props.userID, drinkName, drinkVol);
      closeModal();
    }
  };

  const choseFromList = (drink: Drink) => {
    setDrinkName(drink.name);
    setDrinkVol(drink.vol);
  };

  // Add existing frink from the list
  const addDrinkFromList = (drink: Drink) => {
    let temp = drinks;
    const first = drink;
    temp.sort(function (x, y) {
      return x == first ? -1 : y == first ? 1 : 0;
    });
    setDrinks(temp);
    addDrink(props.partyID, props.userID, drink.name, drink.vol);
    closeModal();
  };

  // Store the drinks to local async storage
  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("drinks", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // Load list from local storage the first time the modal is loaded
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("drinks");
        if (jsonValue != null) {
          setDrinks(JSON.parse(jsonValue));
        }
        //return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        storeData(drinks);
      }
    };
    getData();
  }, []);

  // Store the drinks list to local storage every time its updated
  useEffect(() => {
    let temp = drinks;
    if (temp.length > 10) {
      temp.pop();
    }
    storeData(temp);
  }, [drinks]);

  useEffect(() => {
    const onShow = () => {
      setKeyboardIsShowing(true);
    };
    const onHide = () => {
      setKeyboardIsShowing(false);
    };

    Keyboard.addListener("keyboardDidShow", onShow);
    Keyboard.addListener("keyboardDidHide", onHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", onShow);
      Keyboard.removeListener("keyboardDidHide", onHide);
    };
  });

  return (
    <Modal visible={props.visible} animationType={"slide"} transparent={true}>
      <TouchableWithoutFeedback onPress={props.toggleHandler}>
        <CustomSafeAreaView style={styles.modalBackground}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <Text style={[common.text, styles.text]}>Choose a Drink</Text>
            <DrinksList
              style={{ paddingBottom: 5 }}
              drinks={drinks}
              addNewDrinkFunction={choseFromList}
            />
            <Text style={[common.text, styles.text]}>Add New Drink</Text>
            <View style={styles.customDrinkContainer}>
              <TextInput
                style={[
                  inputStyles.textInput,
                  { width: 0, flex: 3, marginHorizontal: 10 },
                ]}
                placeholder={"Drink name"}
                value={drinkName}
                onChangeText={setDrinkName}
              />
              <TextInput
                style={[
                  inputStyles.textInput,
                  { width: 0, flex: 1, marginRight: 5 },
                ]}
                placeholder={"Vol."}
                value={drinkVol}
                onChangeText={setDrinkVol}
                keyboardType={"numeric"}
              />
              <Text style={styles.unitText}>cl</Text>
            </View>

            <WideButton
              title={"add"}
              color={colors.primary}
              style={styles.button}
              onPress={addNewDrink}
            ></WideButton>

            <WideButton
              title={"close"}
              onPress={closeModal}
              color={colors.tertiary}
              style={styles.button}
            />
          </KeyboardAvoidingView>
        </CustomSafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark_grey,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 15,
    overflow: "hidden",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  button: {
    width: "100%",
  },
  customDrinkContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  unitText: {
    fontSize: 35,
    color: "white",
    marginRight: 10,
  },
  text: {
    textAlign: "left",
  },
});

export default AddDrinkModal;
