import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import { Button } from "react-native-paper";
import CustomSafeAreaView from "../../common/components/customSafeAreaView";
import { colors, common } from "../../common/styles/styles";
import firebase from "firebase";

function DrinksTimeline(props: any) {
  interface Drink {
    timeStamp: string;
    name: string;
    vol: string;
  }
  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    const onChange = firebase
      .database()
      .ref(
        "parties/" + props.partyID + "/participants/" + props.userID + "/drinks"
      )
      .on("value", (snapshot) => {
        let temp: Drink[] = [];
        const obj = snapshot.val();
        for (let key in obj) {
          temp.push({ timeStamp: key, name: obj[key].name, vol: obj[key].vol });
        }
        setDrinks(temp.reverse());
      });

    return () => {
      firebase
        .database()
        .ref(
          "parties/" +
            props.partyID +
            "/participants/" +
            props.userID +
            "/drinks"
        )
        .off("value", onChange);
    };
  }, [props.userID]);

  const item: ListRenderItem<Drink> = ({ item }) => {
    const date = new Date(parseInt(item.timeStamp));
    const now = new Date();
    let time = "";
    // If more than a year has passed
    if (now.getTime() - date.getTime() >= 31556952000) {
      time =
        date.getDay() +
        "/" +
        date.getMonth() +
        "-" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes();
    }
    // if more than a day has passed
    else if (now.getTime() - date.getTime() >= 86400000) {
      time =
        date.getDay() +
        "/" +
        date.getMonth() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes();
    } else {
      time = date.getHours() + ":" + date.getMinutes();
    }
    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <Text style={[styles.listText, { color: colors.light_grey }]}>
            {time}
          </Text>
          <Text style={styles.listText} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.listText}> {item.vol}cl</Text>
        </View>
      </View>
    );
  };

  const seperatorItem = () => {
    return <View style={styles.seperator}></View>;
  };

  return (
    <Modal visible={props.visible} animationType={"slide"} transparent={true}>
      <TouchableWithoutFeedback onPress={props.toggleHandler}>
        <CustomSafeAreaView style={styles.modalBackground}>
          <View style={styles.container}>
            <Text style={[common.text, styles.timelineText]}>Timeline</Text>
            <Button onPress={props.toggleHandler} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Button>
            <FlatList
              style={styles.list}
              data={drinks}
              renderItem={item}
              keyExtractor={(item) => item.timeStamp}
              ItemSeparatorComponent={seperatorItem}
            />
          </View>
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
  },
  closeButtonText: {
    color: "white",
    fontSize: 25,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  list: {
    width: "80%",
    flex: 1,
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    height: "100%",
  },
  left: { flex: 3 },
  listText: {
    color: "white",
    fontSize: 20,
    overflow: "hidden",
  },
  seperator: {
    backgroundColor: "white",
    width: "100%",
    height: 1,
    marginVertical: 2,
  },
  timelineText: { marginTop: 20 },
});

export default DrinksTimeline;
