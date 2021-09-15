import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors } from "../../common/styles/styles";

function Leaderboard(props: any) {
  const participants = [
    {
      userID: "1",
      username: "Anders",
      numOfDrinks: "5",
    },
    {
      userID: "2",
      username: "Peter",
      numOfDrinks: "3",
    },
    {
      userID: "3",
      username: "Simon",
      numOfDrinks: "15",
    },
    {
      userID: "4",
      username: "Niels",
      numOfDrinks: "6",
    },
    {
      userID: "5",
      username: "Andreas",
      numOfDrinks: "6",
    },
    {
      userID: "6",
      username: "Emil",
      numOfDrinks: "13",
    },
    {
      userID: "7",
      username: "Lind",
      numOfDrinks: "0",
    },
  ];

  const item = ({ item }: any) => (
    <View style={styles.item}>
      <Text numberOfLines={1} style={styles.itemText}>
        {item.username}
      </Text>
      <Text style={styles.itemID}>{item.numOfDrinks}</Text>
    </View>
  );

  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        data={props.participants}
        renderItem={item}
        keyExtractor={(item) => item.userID}
      />
    </View>
  );
}

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light_grey,
    justifyContent: "space-around",
    borderRadius: 10,
    minWidth: 350,
  },
  item: {
    backgroundColor: colors.grey,
    margin: 5,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    color: "white",
    fontSize: 20,
    flex: 1,
  },
  itemID: {
    color: colors.light_grey,
    marginLeft: 5,
  },
});
