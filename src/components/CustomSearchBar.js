import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../navigationRef";
import { Button } from "react-native-elements";

const CustomSearchBar = ({ searchBarHeight }) => {
  return (
    <View
      style={[
        styles.container,
        // {
        //   height: searchBarHeight,
        //   position: "absolute",
        //   width: "100%",
        // },
      ]}
    >
      <Ionicons
        name="ios-search"
        size={27}
        color="#505357"
        style={styles.iconStyle}
        onPress={() => {
          console.log("Pressed");
        }}
      />
      <Text style={styles.text}>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderColor: "#D8D8D8",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    height: 50,
  },
  iconStyle: {
    left: 7,
    minHeight: 0,
  },
  text: {
    marginStart: 20,
    fontSize: 20,
    color: "#96999B",
  },
});

export { CustomSearchBar };
