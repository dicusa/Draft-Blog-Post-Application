import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements";

const FavouritePostSubContainer = ({ post_image_URL, post_heading }) => {
  return (
    <>
      <View style={styles.container}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri:
              post_image_URL !== false
                ? post_image_URL
                : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          }}
          containerStyle={{ borderColor: "#000000", borderWidth: 0.5 }}
        />
        <Text style={styles.post_heading_style}>{post_heading}</Text>
      </View>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 0.5,
          marginStart: 70,
          marginEnd:10,
          marginTop:2
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    padding:10
  },
  post_heading_style: {
    fontSize: 20,
    textAlignVertical: "center",
    marginStart: 20,
  },
});

export { FavouritePostSubContainer };
