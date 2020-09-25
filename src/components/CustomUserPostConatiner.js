import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";

const CustomUserPostConatiner = ({ post_image, post_heading }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            post_image !== false
              ? post_image
              : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        }}
        style={styles.image_bg}
        imageStyle={{
          borderRadius: 10,
        }}
        blurRadius={2}
      />
      <Text style={styles.headingStyle}>{post_heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: Dimensions.get("screen").width / 2 - 25,
    margin: 7.5,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderRadius: 10,
  },
  image_bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignContent: "center",
    overlayColor: "#000",
  },
  headingStyle: {
    position: "absolute",
    bottom: 10,
    start: 10,
    maxWidth: "90%",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
    textShadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 5,
    padding: 3,
    backgroundColor: "rgba(0,0,0,0.3)", // For vignette effect
    borderRadius: 10,
    letterSpacing: 0.2,
  },
});

export { CustomUserPostConatiner };
