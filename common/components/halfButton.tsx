import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const HalfButton = (props: any) => {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  return (
    <View
      style={[styles.button, props.style, { backgroundColor: props.color }]}
    >
      <Button onPress={props.onPress}>
        {fontsLoaded && (
          <Text style={[styles.text, { fontFamily: "Inter_900Black" }]}>
            {props.title}
          </Text>
        )}
      </Button>
    </View>
  );
};

export default HalfButton;

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("window").width * 0.5,
    height: 70,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    position: "absolute",
    height: 70,
    left: 0,
    top: 0,
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: 40,
    lineHeight: 47,
    alignItems: "center",
    textAlign: "center",
    textTransform: "capitalize",

    color: "#000000",
  },
});
