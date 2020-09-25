import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import firebase from "firebase";
import { navigate } from "../navigationRef";

const userReducer = (state, action) => {
  switch (action.type) {
    case "loadActivityIndicator":
      return { ...state, activityIndicator: !state.activityIndicator };
    case "UPDATE_FETCHED_DATA":
      return {
        ...state,
        username: action.payload.username,
        profilePictureURL: action.payload.profilePictureURL,
        user_token: action.payload.user_token,
        user_bio: action.payload.user_bio,
        user_website: action.payload.user_website,
      };
    case "RESET_DATA":
      return {
        ...state,
        errorMessage: "",
        activityIndicator: false,
        user_token: "",
        username: "",
        profilePictureURL: "",
        user_bio: "",
        user_website: "",
      };
    default:
      return state;
  }
};

const saveUserData = (dispatch) => async (username, profilePictureBlob) => {
  try {
    dispatch({ type: "loadActivityIndicator" });
    const user_token = await AsyncStorage.getItem("user_token");
    if (user_token) {
      await firebase
        .storage()
        .ref(`userProfilePicture/${user_token}`)
        .put(profilePictureBlob);
      console.log("Uploaded a image uri!");
      const imageURL = await firebase
        .storage()
        .ref(`userProfilePicture/${user_token}`)
        .getDownloadURL();
      console.log("URL:" + imageURL);
      await firebase.database().ref(`users/${user_token}`).update({
        username: username,
        profilePictureURL: imageURL,
        bio: "",
        website: "",
      });
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("profilePictureURL", imageURL);
      await AsyncStorage.setItem("user_bio", "");
      await AsyncStorage.setItem("user_website", "");
      dispatch({ type: "loadActivityIndicator" });
      navigate("mainFlow");
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchActiveUserData = (dispatch) => async (user_token) => {
  try {
    const username = await AsyncStorage.getItem("username");
    const profilePictureURL = await AsyncStorage.getItem("profilePictureURL");
    const user_bio = await AsyncStorage.getItem("user_bio");
    const user_website = await AsyncStorage.getItem("user_website");

    dispatch({
      type: "UPDATE_FETCHED_DATA",
      payload: {
        username,
        profilePictureURL,
        user_token,
        user_bio,
        user_website,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// TODO: Function to update user data called from Edit Profile Screen
const updateUserData = (dispatch) => async (
  user_token = "",
  username = "",
  profilePictureURL = "",
  user_bio = "",
  user_website = ""
) => {
  try {
    dispatch({ type: "loadActivityIndicator" });

    await firebase.database().ref(`users/${user_token}`).update({
      username,
      profilePictureURL,
      user_bio,
      user_website,
    });
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("profilePictureURL", profilePictureURL);
    await AsyncStorage.setItem("user_bio", user_bio);
    await AsyncStorage.setItem("user_website", user_website);
    dispatch({
      type: "UPDATE_FETCHED_DATA",
      payload: {
        username,
        profilePictureURL,
        user_token,
        user_bio,
        user_website,
      },
    });
    dispatch({ type: "loadActivityIndicator" });
    navigate("Account");
  } catch (error) {
    console.log(error);
  }
};

const resetUserData = (dispatch) => async () => {
  await AsyncStorage.removeItem("user_bio");
  await AsyncStorage.removeItem("user_website");
  dispatch({ type: "RESET_DATA" });
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { saveUserData, fetchActiveUserData, updateUserData, resetUserData },
  {
    errorMessage: "",
    activityIndicator: false,
    user_token: "",
    username: "",
    profilePictureURL: "",
    user_bio: "",
    user_website: "",
  }
);
