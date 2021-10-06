import React from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import { listStyles } from "../../common/styles/styles";

function Leaderboard(props: any) {
  const item = ({ item }: any) => (
    <TouchableHighlight
      onPress={() => {
        props.setTimeLineUserID(item.id);
        props.onPress();
      }}
    >
      <View style={listStyles.item}>
        <Text numberOfLines={1} style={listStyles.itemText}>
          {item[item.id].displayName}
        </Text>
        <Text style={listStyles.secondaryItemText}>{item.numOfDrinks}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={[listStyles.container, props.style]}>
      <FlatList
        data={props.participants}
        renderItem={item}
        keyExtractor={(item) => item.id}
        style={listStyles.list}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

export default Leaderboard;
