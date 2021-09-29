import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { listStyles } from "../../common/styles/styles";

function DrinksList(props: any) {
  const item = ({ item }: any) => (
    <TouchableOpacity onPress={() => props.addNewDrinkFunction(item)}>
      <View style={listStyles.item}>
        <Text numberOfLines={1} style={listStyles.itemText}>
          {item.name}
        </Text>
        <Text style={listStyles.secondaryItemText}>{item.vol}cl</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[listStyles.container, props.style]}>
      <FlatList
        data={props.drinks}
        renderItem={item}
        keyExtractor={(item) => item.id}
        style={listStyles.list}
      />
    </View>
  );
}

export default DrinksList;
