import React from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";

function CustomSafeAreaView(props: any) {
  return (
    <SafeAreaView style={[styles.AndroidSafeArea, props.style]}>
      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default CustomSafeAreaView;
