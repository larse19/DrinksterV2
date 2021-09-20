import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { colors } from "../../common/styles/styles";

function Leaderboard(props: any) {
  const item = ({ item }: any) => (
    <TouchableHighlight>
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item[item.id].displayName}
        </Text>
        <Text style={styles.itemID}>{item.numOfDrinks}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        data={props.participants}
        renderItem={item}
        keyExtractor={(item) => item.id}
        style={styles.list}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark_grey,
    borderRadius: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
  list: { flexGrow: 1 },
  item: {
    backgroundColor: colors.grey,
    marginVertical: 5,
    borderRadius: 0,
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
    color: "white",
    fontSize: 20,
    marginLeft: 5,
  },
});
