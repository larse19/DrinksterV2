import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { colors, common } from "../../common/styles/styles";

function NearbyParties(props: any) {
  const [selectedParty, setSelectedParty] = useState("");

  useEffect(() => {
    props.onSelect(selectedParty);
  }, [selectedParty]);

  const parties = [
    {
      id: "1234",
      name: "Old Irish Halloween party",
    },
    {
      id: "2345",
      name: "Semesterstartsfest SDU",
    },
    {
      id: "6534",
      name: "Anders' vilde fest",
    },
    {
      id: "6452",
      name: "Sausage party",
    },
    {
      id: "6742",
      name: "This is a test to see what happens when a name is very long",
    },
    {
      id: "1232",
      name: "SDU Årsfest",
    },
  ];

  const partyItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => setSelectedParty(item.id)}
    >
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
        <Text style={styles.itemID}>#{item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        data={parties}
        renderItem={partyItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light_grey,
    justifyContent: "space-around",
    borderRadius: 10,
    height: 260,
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

export default NearbyParties;
