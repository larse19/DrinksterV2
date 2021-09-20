import { StyleSheet } from "react-native";

export const colors = {
  primary: "#FF8100",
  secondary: "#FFAD00",
  tertiary: "#FF3900",
  light_grey: "#847E7E",
  grey: "#524B4B",
  dark_grey: "#383535",
};

export const common = StyleSheet.create({
  background: {
    flex: 1,
    padding: "2%",
    backgroundColor: "#383535",
  },
  title: {
    position: "absolute",
    top: "10%",
    alignSelf: "center",
  },
  text: {
    fontSize: 30,
    color: colors.secondary,
    fontWeight: "900",
  },
});

export const buttons = StyleSheet.create({
  backButton: {
    marginLeft: 15,
  },
});

export const inputStyles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: colors.light_grey,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    width: 350,
    color: "white",
  },
});
