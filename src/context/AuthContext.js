import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import * as Facebook from "expo-facebook";
import firebase from "firebase";
import axios from "axios";

const authReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return { ...state, user_token: action.payload, activityIndicator: false };
    case "loadActivityIndicator":
      return { ...state, activityIndicator: !state.activityIndicator };
    case "AUTH_FAILED":
      return {
        ...state,
        errorMessage: action.payload,
        activityIndicator: false,
      };
    case "SIGN_OUT_USER":
      return { ...state, user_token: "", activityIndicator: false };
    default:
      return state;
  }
};

//optional function to check active user
const checkActiveUser = (dispatch) => async () => {
  try {
    const Localtoken = await AsyncStorage.getItem("user_token");

    if (Localtoken != null && Localtoken != "false") {
      dispatch({ type: "UPDATE_TOKEN", payload: Localtoken });
      navigate("mainFlow");
    } else {
      navigate("loginFlow");
    }
  } catch (error) {
    console.log(error);
  }
};

// Helper Function
const updateUserDataToFirebase = async (arg_token) => {
  try {
    console.log("Firebase Save Data initiated");

    firebase
      .database()
      .ref(`users/${arg_token}`)
      .once("value", async (snapshot) => {
        console.log("snapshot: " + String(snapshot));
        if (snapshot.exists() && snapshot.hasChild("profilePictureURL")) {

          await AsyncStorage.setItem(
            "username",
            snapshot.child("username").val()
          );
          await AsyncStorage.setItem(
            "profilePictureURL",
            snapshot.child("profilePictureURL").val()
          );
          navigate("mainFlow");
        } else {
          console.log("NewUser");
          firebase.database().ref(`users/${arg_token}`).set({
            user_token: arg_token,
          });
          navigate("SetupProfile");
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const signUserWithPhoneAuth = (dispatch) => async (phoneNumber) => {
  try {
    // console.log(phoneNumber);
    let phNo = String(phoneNumber).replace("+", "");
    await AsyncStorage.setItem("user_token", phNo);
    dispatch({
      type: "UPDATE_TOKEN",
      payload: phNo,
    });
    updateUserDataToFirebase(phNo);
  } catch (error) {
    console.log(error);
    alert("Please check OTP and Try again!");
  }
};

const signUserWithFacebookAuth = (dispatch) => async () => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "256572699034125",
      {
        permissions: ["public_profile", "email"],
      }
    );
    dispatch({ type: "loadActivityIndicator" });
    if (type === "cancel") {
      dispatch({ type: "AUTH_FAILED" });
    } else {
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
      );
      const idToken = response.data.id;
      console.log(idToken);
      await AsyncStorage.setItem("user_token", idToken);
      dispatch({ type: "UPDATE_TOKEN", payload: idToken });
      updateUserDataToFirebase(idToken);
      dispatch({ type: "loadActivityIndicator" });
    }
  } catch (error) {
    console.log(error);
  }
};

const signOutUser = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("user_token");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("profilePictureURL");
    dispatch({ type: "SIGN_OUT_USER" });
    navigate("loginFlow");
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signUserWithFacebookAuth,
    signUserWithPhoneAuth,
    checkActiveUser,
    signOutUser,
  },
  { user_token: null, errorMessage: "", activityIndicator: false }
);
