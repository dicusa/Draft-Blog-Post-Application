import React, { useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Input, Button, SocialIcon } from "react-native-elements";
import firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import applogo100 from "../assets/applogo100.png";
import { Entypo } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const {
    signUserWithFacebookAuth,
    state: { activityIndicator },
  } = useContext(AuthContext);

  const recaptchaVerifier = useRef(null);
  const [localActivityIndicator, setLocalActivityIndicator] = useState(false);
  const [phone, setPhone] = useState("");

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  // Function to validate phone number
  const validatePhoneNumber = () => {
    const argPhone = String(phone).replace(/[^\d]/g, "");
    if (argPhone.length > 10) {
      return String("+" + argPhone);
    } else if (argPhone.length == 10) {
      return String("+91" + argPhone);
    }
  };

  const removeToken = async () => {
    await AsyncStorage.removeItem("user_token");
    console.log("successRemove");
  };

  const signInUser = async () => {
    // console.log("Inside signinuser");
    // console.log(firebaseConfig);
    // console.log(recaptchaVerifier);

    try {
      setLocalActivityIndicator(true);
      const argPhone = validatePhoneNumber();
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const localVerificationId = await phoneProvider.verifyPhoneNumber(
        argPhone,
        recaptchaVerifier.current
      );
      setLocalActivityIndicator(false);
      navigation.navigate("OTP", {
        verificationId: localVerificationId,
        phone: argPhone,
      });
    } catch (error) {
      console.log(error);
      setLocalActivityIndicator(false);
      alert("Please enter a valid number and Try again!");
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1C2226" />
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Image source={applogo100} style={styles.appLogo} />
        <Input
          label="Phone number"
          leftIcon={
            <Entypo
              name="phone"
              size={22}
              color="#F8F8F8"
              style={styles.iconStyle}
            />
          }
          keyboardType="numeric"
          placeholder="+91xxxxxxxxxx"
          value={phone}
          onChangeText={(number) => {
            setPhone(number);
          }}
          inputStyle={{ color: "#F8F8F8" }}
          inputContainerStyle={styles.phoneInputStyle}
        />

        {localActivityIndicator ? <ActivityIndicator size="large" /> : null}
        {activityIndicator ? <ActivityIndicator size="large" /> : null}

        <Button
          title="Signin"
          onPress={() => signInUser()}
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            width: "70%",
            marginTop: 20,
          }}
        />

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text style={{ color: "gray" }}>______________</Text>
          <Text
            style={{
              fontSize: 22,
              letterSpacing: 0.5,
              color: "gray",
              marginStart: 10,
              marginEnd: 10,
            }}
          >
            OR
          </Text>
          <Text style={{ color: "gray" }}>______________</Text>
        </View>

        <View
          style={{
            width: "60%",
            flexDirection: "row",
            marginTop: 25,
            justifyContent: "space-evenly",
          }}
        >
          <SocialIcon
            type="google"
            onPress={() => {
              removeToken();
            }}
          />
          <SocialIcon
            type="facebook"
            onPress={() => {
              signUserWithFacebookAuth();
            }}
          />
        </View>
      </View>
    </>
  );
};

SigninScreen.navigationOptions = {
  headerShown: false,
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
    // backgroundColor: "#36b1b6",
  },
  iconStyle: {
    paddingEnd: 7,
    marginEnd: 3,
    borderRightWidth: 0.5,
    borderRightColor: "gray",
  },
  appLogo: {
    height: 150,
    width: 150,
    resizeMode: "stretch",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 25,
    marginBottom: 40,
  },
  phoneInputStyle: {
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

export default SigninScreen;
