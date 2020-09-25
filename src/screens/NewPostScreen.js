import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  ActivityIndicator,
  Modal,
  Dimensions,
  BackHandler,
} from "react-native";
import { CustomHeader } from "../components";
import { Avatar, Button } from "react-native-elements";
import { Context as UserContext } from "../context/UserContext";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Context as PostContext } from "../context/PostContext";

const NewPostScreen = ({ navigation }) => {
  const {
    state: { username, profilePictureURL, user_token },
  } = useContext(UserContext);

  const {
    uploadPost,
    state: { activityIndicator },
  } = useContext(PostContext);

  const headingRef = useRef(null);
  const [imageUri, setImageURI] = useState(navigation.getParam("imageURI"));
  const [heading, setHeading] = useState("");
  const [hashTag, setHashTag] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    headingRef.current.focus();
    const backAction = () => {
      setModalVisible(!modalVisible);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Function to check CameraRoll Permission
  const checkPermission = async () => {
    try {
      const { status } = await ImagePicker.getCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to pick image from phone gallary
  const pickGallaryImage = async () => {
    checkPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

  // Function to share the post
  const sharePost = async () => {
    if (heading !== "") {
      if (content == "" && imageUri == null) {
        alert("Post should contain either some content or a photo.");
      } else {
        let blob = null;
        if (imageUri !== null) {
          const response = await fetch(imageUri);
          blob = await response.blob();
        }
        uploadPost(user_token, heading, hashTag, content, blob);
      }
    } else {
      alert("Heading for a post is important.");
    }
  };

  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#20262B" /> // dark_theme */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <CustomHeader
        headerTitle="Create Post"
        navigationRoute="Home"
        iconRightType="ionicon"
        iconRightName="md-checkmark"
        buttonRightCallback={() => {
          sharePost();
        }}
      />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
        }}
        removeClippedSubviews={false}
      >
        <View style={styles.parentContainer}>
          {/* {activityIndicator ? (
            <ActivityIndicator size="large" style={{ padding: 10 }} />
          ) : null} */}
          {/* post uploading Modal */}
          <Modal
            presentationStyle="overFullScreen"
            animationType="none"
            visible={activityIndicator}
            transparent={true}
          >
            <View
              style={{
                height: Dimensions.get("screen").height,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <View style={styles.modalStyle}>
              <ActivityIndicator size="large" />
            </View>
          </Modal>

          {/* back press dialog modal */}

          <Modal
            presentationStyle="overFullScreen"
            animationType="none"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              onTouchStart={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                height: Dimensions.get("screen").height,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />

            <View style={styles.modalStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  alignSelf: "center",
                  margin: 15,
                }}
              >
                Discard Post ?
              </Text>
              <Text style={{ alignSelf: "center", marginBottom: 5 }}>
                If you go back now you will lose your post.
              </Text>
              <View
                style={{
                  width: "100%",
                  borderWidth: 0.5,
                  borderColor: "gray",
                }}
              />
              <Text
                style={[
                  styles.modalTextStyle,
                  { color: "#FF6347", fontWeight: "700" },
                ]}
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                Discard
              </Text>
              <View
                style={{
                  width: "100%",
                  borderWidth: 0.5,
                  borderColor: "gray",
                }}
              />
              <Text
                style={styles.modalTextStyle}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                Keep
              </Text>
            </View>
          </Modal>
          <View style={styles.userContentContainer}>
            <Avatar
              rounded
              source={{
                uri: profilePictureURL === "" ? null : profilePictureURL,
              }}
              size="small"
              containerStyle={styles.avatar_style}
            />
            <Text style={styles.usernameStyle}>{username}</Text>
          </View>
          <View style={{ height: 3, backgroundColor: "#FFFFFF" }} />
          <TextInput
            ref={headingRef}
            placeholder="Heading"
            placeholderTextColor="gray"
            value={heading}
            onChangeText={(text) => {
              setHeading(text);
            }}
            style={styles.headingStyle}
            selectTextOnFocus={true}
            clearButtonMode="always"
            multiline
          />
          <View style={styles.divider} />
          <TextInput
            placeholder="HashTags"
            value={hashTag}
            onChangeText={(text) => {
              setHashTag(text);
            }}
            placeholderTextColor="#3b87e0"
            style={styles.hashTagStyle}
            selectTextOnFocus={true}
          />
          <View style={styles.divider} />
          <TextInput
            placeholder="Express Yourself . . ."
            placeholderTextColor="gray"
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            style={styles.contentStyle}
            multiline
            selectTextOnFocus={true}
          />
          <View style={styles.divider} />
          {imageUri !== null ? (
            <Avatar
              style={styles.attachImageStyle}
              avatarStyle={{
                borderRadius: 10,
              }}
              source={{ uri: imageUri }}
              accessory={{
                size: 30,
                name: "cross",
                type: "entypo",
                color: "#fff",
                underlayColor: "#000000",
              }}
              showAccessory
              onAccessoryPress={() => {
                setImageURI(null);
              }}
            />
          ) : (
            <Button
              type="outline"
              icon={
                <MaterialIcons name="add-a-photo" size={30} color="#3b87e0" />
              }
              buttonStyle={styles.attachButtonStyle}
              containerStyle={styles.attachButtonContainerStyle}
              onPress={() => {
                pickGallaryImage();
              }}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  modalStyle: {
    top: Dimensions.get("screen").height / 3,
    position: "absolute",
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  modalTextStyle: {
    fontSize: 16,
    margin: 10,
    alignSelf: "center",
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "#D6D6D6",
    marginTop: 5,
    marginBottom: 5,
  },
  avatar_style: {
    borderWidth: 0.5,
    borderColor: "#D6D6D6",
  },

  userContentContainer: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 15,
  },
  usernameStyle: {
    textAlignVertical: "center",
    fontSize: 22,
    marginStart: 15,
    color: "#5E6367",
  },
  headingStyle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "#000000",
    letterSpacing: 0.3,
    lineHeight: 27,
    textDecorationLine: "underline",
  },
  hashTagStyle: {
    // height: 20,
    fontSize: 16,
    padding: 10,
    color: "#24a0ed",
  },
  contentStyle: {
    fontSize: 18,
    padding: 10,
    color: "#000000",
    letterSpacing: 0.3,
    lineHeight: 25,
  },
  attachImageStyle: {
    height: 100,
    width: 100,
    marginTop: 75,
    marginBottom: 25,
    marginStart: 10,
  },
  attachButtonStyle: {
    height: 50,
    width: 50,
  },
  attachButtonContainerStyle: {
    margin: 25,
    height: 55,
    width: 55,
  },
});

export default NewPostScreen;
