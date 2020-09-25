import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";
import { Context as AuthContext } from "../context/AuthContext";

const OTPScreen = ({ navigation }) => {
  const { signUserWithPhoneAuth } = useContext(AuthContext);

  const [OTP1, setOTP1] = useState("");
  const [OTP2, setOTP2] = useState("");
  const [OTP3, setOTP3] = useState("");
  const [OTP4, setOTP4] = useState("");
  const [OTP5, setOTP5] = useState("");
  const [OTP6, setOTP6] = useState("");

  const [activityIndicator, setActivityIndicator] = useState(false);

  const OTP1ref = useRef(null);
  const OTP2ref = useRef(null);
  const OTP3ref = useRef(null);
  const OTP4ref = useRef(null);
  const OTP5ref = useRef(null);
  const OTP6ref = useRef(null);

  const verificationId = navigation.getParam("verificationId");
  const phone = navigation.getParam("phone");

  const verifyOTP = async () => {
    try {
      setActivityIndicator(true);
      // console.log("verificationId: " + verificationId);
      const credentials = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        OTP1 + OTP2 + OTP3 + OTP4 + OTP5 + OTP6
      );
      await firebase.auth().signInWithCredential(credentials);
      // console.log("Verified");
      setActivityIndicator(false);
      signUserWithPhoneAuth(phone);
      //Succesfully store the user phone no or token to async storage and navigate user to main flow
    } catch (error) {
      console.log(error);
      setActivityIndicator(false);
      alert("Please check OTP and Try again!");
    }
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Text style={styles.OTPtextStyle}>
          Enter Verification code sent to your number{" "}
          {
            <Text style={[styles.OTPtextStyle, { color: "#ADD8E6" }]}>
              {phone}
            </Text>
          }
        </Text>
        <View style={styles.OTPConstainerStyle}>
          <Input
            ref={OTP1ref}
            keyboardType="numeric"
            containerStyle={styles.OTPBlockStyle}
            inputContainerStyle={styles.OTPInputContainerStyle}
            inputStyle={styles.OTPInputStyle}
            maxLength={1}
            value={OTP1}
            onChangeText={(otp) => {
              setOTP1(otp);
              if (otp.length > 0) {
                OTP2ref.current.focus();
              }
            }}
          />
          <Input
            ref={OTP2ref}
            keyboardType="numeric"
            containerStyle={styles.OTPBlockStyle}
            inputContainerStyle={styles.OTPInputContainerStyle}
            inputStyle={styles.OTPInputStyle}
            maxLength={1}
            value={OTP2}
            onChangeText={(otp) => {
              setOTP2(otp);
              if (otp.length > 0) {
                OTP3ref.current.focus();
              }
              if (otp.length == 0) {
                OTP1ref.current.focus();
              }
            }}
          />
          <Input
            ref={OTP3ref}
            keyboardType="numeric"
            containerStyle={styles.OTPBlockStyle}
            inputContainerStyle={styles.OTPInputContainerStyle}
            inputStyle={styles.OTPInputStyle}
            maxLength={1}
            value={OTP3}
            onChangeText={(otp) => {
              setOTP3(otp);
              if (otp.length > 0) {
                OTP4ref.current.focus();
              }
              if (otp.length == 0) {
                OTP2ref.current.focus();
              }
            }}
          />
          <Input
            ref={OTP4ref}
            keyboardType="numeric"
            containerStyle={styles.OTPBlockStyle}
            inputContainerStyle={styles.OTPInputContainerStyle}
            inputStyle={styles.OTPInputStyle}
            maxLength={1}
            value={OTP4}
            onChangeText={(otp) => {
              setOTP4(otp);
              if (otp.length > 0) {
                OTP5ref.current.focus();
              }
              if (otp.length == 0) {
                OTP3ref.current.focus();
              }
            }}
          />
          <Input
            ref={OTP5ref}
            keyboardType="numeric"
            containerStyle={styles.OTPBlockStyle}
            inputContainerStyle={styles.OTPInputContainerStyle}
            inputStyle={styles.OTPInputStyle}
            maxLength={1}
            value={OTP5}
            onChangeText={(otp) => {
              setOTP5(otp);
              if (otp.length > 0) {
                OTP6ref.current.focus();
              }
              if (otp.length == 0) {
                OTP4ref.current.focus();
              }
            }}
          />
          <Input
            ref={OTP6ref}
            keyboardType="numeric"
            containerStyle={styles.OTPBlockStyle}
            inputContainerStyle={styles.OTPInputContainerStyle}
            inputStyle={styles.OTPInputStyle}
            maxLength={1}
            value={OTP6}
            onChangeText={(otp) => {
              setOTP6(otp);
              if (otp.length == 0) {
                OTP5ref.current.focus();
              }
            }}
          />
        </View>

        {activityIndicator ? <ActivityIndicator size="large" /> : null}

        <Button
          title="Submit"
          onPress={verifyOTP}
          buttonStyle={styles.buttonStyle}
          containerStyle={{
            width: Dimensions.get("screen").width / 2,
            alignSelf: "center",
            marginTop: 40,
          }}
        />
      </View>
    </View>
  );
};

OTPScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#1C2226",
    justifyContent: "center",
    alignItems: "center",
    paddingStart: 5,
    paddingEnd: 5,
  },
  container: {
    // borderWidth: 2,
    // borderColor: "red",
    padding: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  OTPConstainerStyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  OTPBlockStyle: {
    width: "18%",
  },
  OTPInputStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 22,
  },
  OTPInputContainerStyle: {
    backgroundColor: "#323A42",
    borderBottomColor: "#1C2226",
    height: 50,
    borderRadius: 10,
  },
  OTPtextStyle: {
    fontSize: 16,
    marginBottom: 25,
    fontWeight: "bold",
    color: "#F8F8F8",
    textAlign: "center",
  },
  buttonStyle: {
    height: 45,
    borderRadius: 22,
  },
  iconStyle: {
    paddingEnd: 7,
    marginEnd: 3,
    borderRightWidth: 0.5,
    borderRightColor: "gray",
  },
});

export default OTPScreen;
