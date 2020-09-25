import React, { useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  Image,
} from "react-native";
import { navigate } from "../navigationRef";
import applogo100 from "../assets/applogo100.png";

import { Context as UserContext } from "../context/UserContext";

const SplashScreen = () => {
  const { fetchActiveUserData } = useContext(UserContext);
 
  useEffect(() => {
    setTimeout(() => {
      checkUserStatus();
      // navigate("loginFlow");
    }, 2000);
  });

  const checkUserStatus = async () => {
    let user_token = await AsyncStorage.getItem("user_token");
    console.log("user_token:", user_token);
    if (user_token == false || user_token === null) {
      navigate("loginFlow");
    } else {
      fetchActiveUserData(user_token);
      navigate("mainFlow");
    }
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground source={splashScreen_bg} style={styles.image_bg} /> */}

      <Image source={applogo100} style={styles.image_bg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#000'
    justifyContent: "center",
    alignItems: "center",
  },
  image_bg: {
    // flex: 1,
    resizeMode: "stretch",
    height: 200,
    width: 200,
    // justifyContent: "center",
    // alignContent: "center",
  },
});

export default SplashScreen;
