import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  YellowBox,
  Animated,
  Linking,
  ImageBackground,
} from "react-native";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Button, Avatar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Context as PostContext } from "../context/PostContext";
import { Context as UserContext } from "../context/UserContext";
import { CustomHeader } from "../components";

import { CustomUserPostConatiner } from "../components";
const ProfileScreen = ({ navigation }) => {
  YellowBox.ignoreWarnings([
    "VirtualizedLists should never be nested", // TODO: Remove when fixed
  ]);

  // const HEADER_MIN_HEIGHT = 0;
  // const HEADER_MAX_HEIGHT = 50;

  const {
    fetchUsersAllPost,
    state: { usersPost, lastAllPostSync },
  } = useContext(PostContext);

  const {
    state: { user_token, username, profilePictureURL, user_website, user_bio },
  } = useContext(UserContext);

  useEffect(() => {
    fetchUsersAllPost(user_token, lastAllPostSync);
    console.log("user_POST", usersPost);
  }, []);

  // let scrollY = useRef(new Animated.Value(0)).current;
  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  //   outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  //   extrapolate: "clamp",
  // });

  return (
    <>
      <CustomHeader
        headerTitle="Account"
        buttonLeftBool={false}
        iconRightType="simple-line-icon"
        iconRightName="settings"
        buttonRightCallback={() => {
          navigation.navigate("Settings");
        }}
        // headerHeight={headerHeight}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FAFAFA" }}
        nestedScrollEnabled
        // scrollEventThrottle={16}
        // onScroll={Animated.event([
        //   { nativeEvent: { contentOffset: { y: scrollY } } },
        // ])}
      >
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri:
                "https://cdn4.vectorstock.com/i/1000x1000/32/33/poligon-geometric-gradient-background-vector-4433233.jpgs",
            }}
            progressiveRenderingEnabled={true}
            style={styles.userSubContainer}
          >
            <Avatar
              source={{ uri: profilePictureURL }}
              avatarStyle={{ borderRadius: 50 }}
              // TODO: Change border color
              containerStyle={styles.avatarStyle}
              placeholderStyle={{ backgroundColor: "gray" }}
            />
            <View style={styles.userSubContainerLevel2}>
              <Text style={styles.username}>{username}</Text>
              {user_bio !== "" ? (
                <Text numberOfLines={2} style={styles.bio}>
                  {user_bio}
                </Text>
              ) : null}
              {user_website !== "" ? (
                <Text
                  numberOfLines={1}
                  style={styles.website}
                  onPress={() => {
                    Linking.openURL("https://" + user_website);
                  }}
                >
                  {user_website}
                </Text>
              ) : null}
            </View>
          </ImageBackground>
          <Button
            type="outline"
            title="Edit Profile"
            containerStyle={styles.buttonStyle}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          />
          <View style={styles.level3Conatiner}>
            <Text style={styles.level3heading}>{usersPost.length} POSTS</Text>
          </View>
          <View style={{ paddingStart: 10, paddingEnd: 10 }}>
            <FlatList
              data={usersPost.sort(
                (a, b) => (a.timestamp > b.timestamp ? -1 : 1) // This is the approch to sort array by timestamp
              )}
              keyExtractor={(item) => item.post_id}
              renderItem={({ item }) => {
                return (
                  // Add a Touchable Opacity and direct them to post view screen
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate("PostView", {
                        post_object: item,
                        route_name: "Account",
                      });
                    }}
                  >
                    <CustomUserPostConatiner
                      post_image={item.post_image_URL}
                      post_heading={item.post_heading}
                    />
                  </TouchableOpacity>
                );
              }}
              numColumns={2}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

// ProfileScreen.navigationOptions = ({ navigation }) => ({
//   headerStyle: {
//     backgroundColor: "#1C2226",
//   },
//   headerTitleStyle: {
//     color: "#FFFFFF",
//   },
//   headerTitleAlign: "center",
//   headerRight: () => (
//     <View>
//       <Button
//         type="clear"
//         titleStyle={{ color: "#FFFFFF" }}
//         iconRight={true}
//         icon={<SimpleLineIcons name="settings" color="#FFFFFF" size={22} />}
//         onPress={() => {
//           navigation.navigate("Settings");
//         }}
//       />
//     </View>
//   ),
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingStart: 10,
    // paddingEnd: 10,
    backgroundColor: "#FAFAFA",
  },

  userSubContainer: {
    // flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatarStyle: {
    borderWidth: 2,
    borderColor: "#FAFAFA",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 1,
    height: 100,
    width: 100,
    borderRadius: 150,
  },
  userSubContainerLevel2: {
    alignItems: "center",
    paddingTop: 10,
  },
  username: {
    fontSize: 22,
    color: "#FFFFFF",
    // marginBottom:5
  },
  bio: {
    fontSize: 14,
    color: "#FAFAFA",
  },
  website: {
    fontSize: 14,
    color: "#0000EE",
    textDecorationLine: "underline",
  },
  buttonStyle: {
    margin: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  level3Conatiner: {
    // backgroundColor:'gray',
    borderTopColor: "#D6D6D6",
    borderBottomColor: "#D6D6D6",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7.5,
    marginBottom: 14.5,
  },
  level3heading: {
    fontSize: 16,
    margin: 7.5,
    fontWeight: "700",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;
