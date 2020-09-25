import React, { lazy } from "react";
import { YellowBox } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import FavouritesScreen from "./src/screens/FavouritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SigninScreen from "./src/screens/SigninScreen";
import OTPScreen from "./src/screens/OTPScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SetupProfileScreen from "./src/screens/SetupProfileScreen";
import ActivityScreen from "./src/screens/ActivityScreen";

import { setNavigator } from "./src/navigationRef";
import {
  SimpleLineIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as PostProvider } from "./src/context/PostContext";
import { Provider as SearchProvider } from "./src/context/SearchContext";

import firebase from "firebase";
import * as Facebook from "expo-facebook";
import GlobalSearchScreen from "./src/screens/GlobalSearchScreen";
import NewPostScreen from "./src/screens/NewPostScreen";
import PostViewScreen from "./src/screens/PostViewScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

Facebook.initializeAsync(`${token_id}`);

YellowBox.ignoreWarnings(["Setting a timer"]);
const firebaseConfig = {
  // place your firebase config object here
};

if (firebase.apps.length === 0 || firebase.apps.length === null) {
  firebase.initializeApp(firebaseConfig);
}

// Home and search screen
const home = createSwitchNavigator({
  Home: HomeScreen,
  NewPost: NewPostScreen,
});
home.navigationOptions = {
  title: "Home",
  tabBarIcon: ({ tintColor }) => (
    <SimpleLineIcons name="home" color={tintColor} size={27} />
  ),
};

const search = createSwitchNavigator({
  GlobalSearch: GlobalSearchScreen,
  Search: SearchScreen,
});
search.navigationOptions = {
  header: null,

  title: "Search",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="ios-search" size={33} color={tintColor} />
  ),
};

// Profile and settings screen
const profile = createSwitchNavigator({
  Account: ProfileScreen,
  Settings: SettingsScreen,
  EditProfile: EditProfileScreen,
});



profile.navigationOptions = {
  title: "Account",
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="person-outline" color={tintColor} size={30} />
  ),
};

const activity = createSwitchNavigator({
  Activity: ActivityScreen,
  Favourites: FavouritesScreen,
});

activity.navigationOptions = {
  title: "Favourites",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="heart-o" color={tintColor} size={27} />
  ),
};

// Bottom Tab Navigator
const mainFlow = createBottomTabNavigator(
  {
    home,
    search,
    activity,
    profile,
  },
  {
    tabBarOptions: {
      //For Dark_theme
      // activeBackgroundColor: "#1C2226",
      // activeTintColor: "#36b1b6",
      // inactiveBackgroundColor: "#1C2226",
      // inactiveTintColor: "#F7F0F5",
      // keyboardHidesTabBar: true,
      // showLabel: false,
      // labelStyle: {
      //   fontSize: 14,
      // },

      // style: {
      //   backgroundColor: "#f7f7f7",
      //   height: 50,
      // },

      // For Light_theme
      activeBackgroundColor: "#FFFFFF",
      activeTintColor: "#36b1b6",
      inactiveBackgroundColor: "#FFFFFF",
      inactiveTintColor: "#96A3B7",
      keyboardHidesTabBar: true,
      showLabel: false,
      labelStyle: {
        fontSize: 14,
      },

      style: {
        backgroundColor: "#f7f7f7",
        height: 45,
      },
    },
  },
  lazy
);

const switchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  SetupProfile: SetupProfileScreen,

  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    OTP: OTPScreen,
  }),
  mainFlow,
  PostView: PostViewScreen,
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <SearchProvider>
      <PostProvider>
        <UserProvider>
          <AuthProvider>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </AuthProvider>
        </UserProvider>
      </PostProvider>
    </SearchProvider>
  );
};
