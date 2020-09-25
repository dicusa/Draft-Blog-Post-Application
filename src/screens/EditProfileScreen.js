import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomHeader } from "../components";
import { Context as UserContext } from "../context/UserContext";
import { Avatar, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = () => {
  const {
    updateUserData,
    state: {
      user_token,
      username,
      profilePictureURL,
      user_bio,
      user_website,
      activityIndicator,
    },
  } = useContext(UserContext);

  const [imageUri, setImageURI] = useState("");
  const [userProfilePictureURL, setUserProfilePictureURL] = useState(
    profilePictureURL
  );
  const [usernameState, setUsernameState] = useState(username);
  const [bioState, setBioState] = useState(user_bio);
  const [websiteState, setWebsiteState] = useState(user_website);
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(!modalVisible);
  };

  const saveUserData = async () => {
    let blob = null;
    if (imageUri !== "") {
      const response = await fetch(imageUri);
      blob = await response.blob();
      updateUserData(
        user_token,
        usernameState,
        imageUri,
        bioState,
        websiteState
      );
    } else {
      updateUserData(
        user_token,
        usernameState,
        profilePictureURL,
        bioState,
        websiteState
      );
    }
  };

  return (
    <>
      <CustomHeader
        headerTitle="Edit Profile"
        navigationRoute="Account"
        iconRightType="ionicon"
        iconRightName="md-checkmark"
        buttonRightCallback={() => {
          saveUserData();
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.container}>
          {/* TODO: Test the update info option */}
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
                Change Profile Picture
              </Text>
              <View
                style={{
                  width: "100%",
                  borderWidth: 0.5,
                  borderColor: "#505357", 
                }}
              />
              <Text
                style={styles.modalTextStyle}
                onPress={() => {
                  pickGallaryImage();
                }}
              >
                New Profile Picture
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
                  setUserProfilePictureURL(
                    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                  ),
                    setModalVisible(!modalVisible);
                }}
              >
                Remove Profile Picture
              </Text>
            </View>
          </Modal>
          <Avatar
            activeOpacity={0.8}
            rounded
            size="xlarge"
            source={{ uri: imageUri !== "" ? imageUri : userProfilePictureURL }}
            containerStyle={styles.avatarStyle}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          <Text
            style={styles.changePP_text}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            Change Profile Picture
          </Text>
          <Input
            label="Username"
            placeholder="Username"
            value={usernameState}
            onChangeText={(text) => {
              setUsernameState(text);
            }}
          />
          <Input
            label="Bio"
            placeholder="Bio"
            value={bioState}
            onChangeText={(text) => {
              setBioState(text);
            }}
          />
          <Input
            label="Website"
            placeholder="Website"
            value={websiteState}
            onChangeText={(text) => {
              setWebsiteState(text);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
  },
  avatarStyle: {
    borderWidth: 2,
    borderColor: "#FAFAFA",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 3,
  },
  changePP_text: {
    fontSize: 18,
    color: "blue",
    marginTop: 5,
    marginBottom: 20,
  },
});

export default EditProfileScreen;
