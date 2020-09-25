import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Image, Avatar } from "react-native-elements";

const SearchSuggestionContainer = ({
  postImageURL,
  post_header,
  container_height = 200,
  container_width = Dimensions.get("screen").width / 1.5,
}) => {
  return (
    <View
      style={[
        styles.container,
        { height: container_height, width: container_width },
      ]}
    >
      <ImageBackground
        source={{
          uri:
            postImageURL !== false
              ? postImageURL
              : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        }}
        style={[
          styles.backgroundImage,
          { height: container_height, width: container_width },
        ]}
        blurRadius={1}
        borderRadius={5}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.01)", // For vignette effect
          }}
        >
          <Text
            style={[styles.headerStyle, { maxHeight: container_height - 10 }]}
            numberOfLines={5}
          >
            {post_header}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderRadius: 5,

    // padding: 2,
    margin: 7.5,
  },
  backgroundImage: {
    borderRadius: 5,
  },
  headerStyle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    left: 10,
    right: 10,
    bottom: 10,
    position: "absolute",
    textShadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 5,
    padding: 3,
    // backgroundColor: "rgba(0,0,0,0.3)", // For vignette effect
    borderRadius: 10,
  },
});

export { SearchSuggestionContainer };
