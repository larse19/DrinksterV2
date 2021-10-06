import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

function HomeButton(props: any) {
  return (
    <Icon
      name="home"
      color="white"
      size={30}
      onPress={() => props.navigation.navigate("Home")}
      containerStyle={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default HomeButton;
