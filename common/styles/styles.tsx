import { StyleSheet, Dimensions } from "react-native";

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
    backgroundColor: "#383535",
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
    width: "90%",
    color: "white",
  },
});

export const listStyles = StyleSheet.create({
  item: {
    backgroundColor: colors.grey,
    marginVertical: 5,
    borderRadius: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.dark_grey,
    borderRadius: 0,
    width: "100%",
    flexShrink: 1,
    flexBasis: Dimensions.get("window").height * 0.5,
    paddingHorizontal: "2%",
  },
  list: {
    //flexGrow: 1
  },
  itemText: {
    color: "white",
    fontSize: 20,
  },
  secondaryItemText: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
  },
});
