import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { navigate } from "../navigationRef";
import * as ImagePicker from "expo-image-picker";

const NewPostComponent = () => {
  const [imageBlob, setImageBlob] = useState("");

  const checkPermission = async (type) => {
    try {
      if (type == "camera_roll") {
        const { status } = await ImagePicker.getCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      } else {
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to capture image from phone camera
  const captureCameraImage = async () => {
    checkPermission("camera");
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      navigate("NewPost", { imageURI: result.uri });
    }
  };

  // Function to pick image from phone gallary
  const pickGallaryImage = async () => {
    checkPermission("camera_roll");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      navigate("NewPost", { imageURI: result.uri });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.textContainerStyles}
        onPress={() => {
          navigate("NewPost", { imageURI: null });
        }}
      >
        <Text style={styles.textStyle}>Write your story</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Feather
          name="camera"
          size={24}
          color="#000000"
          onPress={() => {
            captureCameraImage();
          }}
        />
        <FontAwesome
          name="file-photo-o"
          size={24}
          color="#000000"
          style={{
            left: Dimensions.get("screen").width - 110,
          }}
          onPress={() => {
            pickGallaryImage();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: "#282B30",
    borderColor: "#D8D8D8",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
    // backgroundColor: "#282B30",
    backgroundColor: "#FFFFFE",
  },
  textContainerStyles: {
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  textStyle: {
    color: "gray",
    fontSize: 14,
    paddingBottom: 10,
  },
  subContainer: {
    // justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 10,
    marginStart: 5,
  },
});

export { NewPostComponent };
