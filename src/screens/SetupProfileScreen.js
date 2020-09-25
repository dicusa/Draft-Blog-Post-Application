import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Context as UserContext } from "../context/UserContext";

const SetupProfileScreen = () => {
  const {
    saveUserData,
    state: { activityIndicator },
  } = useContext(UserContext);

  const [source, setSource] = useState(
    "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
  );
  const [imageBase64, setImageBase64] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    (async () => {
      if (Platform.OS === "ios") {
        const { status } = await ImagePicker.getCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImageFromStorage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });
    console.log(result);
    if (!result.cancelled) {
      setSource(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      console.log("blob" + blob);
      setImageBase64(blob);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1C2226" />
      <View style={styles.container}>
        <Avatar
          size={150}
          rounded
          source={{ uri: source }}
          showAccessory
          onPress={() => {
            pickImageFromStorage();
          }}
          containerStyle={styles.avatarContainerStyle}
        />

        <Input
          label="Username"
          inputStyle={{ color: "#F8F8F8", paddingStart: 10 }}
          inputContainerStyle={styles.usernameInputStyle}
          value={username}
          onChangeText={setUsername}
        />

        {activityIndicator ? <ActivityIndicator size="large" /> : null}

        <Button
          title="Save Profile"
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            width: "70%",
            marginTop: 50,
          }}
          onPress={() => {
            saveUserData(username, imageBase64);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C2226",
    alignItems: "center",
    padding: 10,
  },
  buttonStyle: {
    height: 45,
    borderRadius: 22,
  },
  avatarContainerStyle: {
    top: 30,
    marginBottom: 60,
    borderWidth: 0.5,
    borderColor: "#F8F8F8",
  },
  usernameInputStyle: {
    backgroundColor: "#323A42",
    borderRadius: 10,
    padding: 5,
    borderBottomColor: "#1C2226",
    marginTop: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 2,
  },
});

export default SetupProfileScreen;
