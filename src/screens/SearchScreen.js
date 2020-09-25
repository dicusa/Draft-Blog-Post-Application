import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { Button, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = ({ navigation }) => {
  const searchRef = useRef(null);
  useEffect(() => {
    searchRef.current.focus();
    const backAction = () => {
      navigation.navigate("GlobalSearch");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Button
          containerStyle={{
            flex: 0.1,
            justifyContent: "center",
            height: 50,
            // backgroundColor: "#20262B",
            backgroundColor: "#FFFFFF",
          }}
          type="clear"
          icon={<Ionicons name="md-arrow-back" size={26} color="#20262B" />}
          onPress={() => {
            navigation.navigate("GlobalSearch");
          }}
        />
        <Input
          ref={searchRef}
          placeholder="Search"
          containerStyle={{
            flex: 0.9,
            // backgroundColor: "#20262B", //dark_theme
            backgroundColor: "#FFFFFF",
            alignItems: "center",

            height: 50,
          }}
          inputContainerStyle={{
            // borderBottomColor: "#20262B",
            borderBottomColor: "#EBEEF0",
            height: 50,
          }}
        />
      </View>
    </View>
  );
};

SearchScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: "#00BFFF",
  },
  headerTitleStyle: {
    color: "#FFFFFF",
  },
  headerTitleAlign: "center",
  headerTintColor: "#FFFFFF",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEEF0",
  },
  headerContainer: {
    flexDirection: "row",
    // backgroundColor: "#20262B",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
});

export default SearchScreen;
