import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { colors } from "../styles/styles";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

const DrinksterTitle = (props: any) => {
  const [currentFont, setCurrentFont] = useState(80);
  const [currentColor, setCurrentColor] = useState("rgba(0,0,0,0)");
  const [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  return (
    <View style={[styles.container, props.style]}>
      {fontsLoaded && (
        <Text
          style={[
            styles.text,
            {
              fontSize: currentFont,
              color: currentColor,
              fontFamily: "Inter_900Black",
            },
          ]}
          onTextLayout={(e) => {
            const { lines } = e.nativeEvent;
            if (lines.length > 1) {
              setCurrentFont(currentFont - 0.1);
            } else {
              setCurrentColor(colors.primary);
            }
          }}
        >
          DRINKSTER
        </Text>
      )}
    </View>
  );
};

export default DrinksterTitle;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "2%",
  },
  text: {
    fontWeight: "900",
    color: colors.primary,
  },
});
