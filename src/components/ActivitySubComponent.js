import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements";

const ActivitySubContainer = ({ icon_url, title, sub_text }) => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={{ uri: icon_url }}
        containerStyle={{
          borderColor: "#000000",
          borderWidth: 0.5,
          height: 45,
          width: 45,
        }}
      />
      <View style={styles.sub_container}>
        <Text style={styles.title_style}>{title}</Text>
        <Text style={styles.sub_text_style}>{sub_text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 15,
  },
  sub_container: {
    marginStart: 25,
  },
  title_style: {
    fontSize: 18,
    textAlignVertical: "center",
  },
  sub_text_style: {
    fontSize: 12,
    textAlignVertical: "center",
    color: "gray",
  },
});

export { ActivitySubContainer };
