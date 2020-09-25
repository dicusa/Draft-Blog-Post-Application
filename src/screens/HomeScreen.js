import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Share,
} from "react-native";
import { NewPostComponent, CustomHeader } from "../components";
import { Context as PostContext } from "../context/PostContext";
import { Context as UserContext } from "../context/UserContext";

import { PostContainerComponent } from "../components";
const HomeScreen = ({ navigation }) => {
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_MAX_HEIGHT = 45;

  const {
    getRecentPost,
    likePost,
    dislikePost,
    state: { activityIndicator, recentPosts, lastSync },
  } = useContext(PostContext);

  const {
    state: { user_token },
  } = useContext(UserContext);

  useEffect(() => {
    getRecentPost(lastSync);
  }, []);

  let scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  //To show Share dialog
  const onShare = async (item) => {
    try {
      const result = await Share.share({
        url: item.post_image_URL,
        title: item.post_heading,
        message:
          `${item.post_image_URL}` +
          "\n\n" +
          item.post_heading +
          "\n\n" +
          item.post_content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const loadPostList = () => {
    return recentPosts.map((item) => {
      return (
        <TouchableOpacity
          key={item.post_id}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("PostView", {
              post_object: item,
              route_name: "Home",
            });
          }}
        >
          <PostContainerComponent
            response={item}
            likedBool={item.like_count > 0 ? true : false}
            likePostCallback={() => {
              likePost(item.post_id, user_token);
            }}
            dislikePostCAllback={() => {
              dislikePost(item.post_id, user_token);
            }}
            sharePostCallback={() => {
              onShare(item);
            }}
          />
        </TouchableOpacity>
      );
    });
  };
  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#20262B" /> // dark_theme */}
      <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />
      <CustomHeader
        buttonLeftBool={false}
        buttonRightBool={false}
        headerTitle="Home"
        headerHeight={headerHeight}
        position="absolute"
      />
      <Animated.ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
          paddingTop: headerHeight,
        }}
        scrollEventThrottle={1}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      >
        {activityIndicator ? (
          <ActivityIndicator
            size="large"
            color="#36b1b6"
            style={{ justifyContent: "center", alignSelf: "center" }}
          />
        ) : (
          <View style={styles.container}>
            <NewPostComponent />
            {loadPostList()}
          </View>
        )}
      </Animated.ScrollView>
    </>
  );
};

HomeScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: "#1C2226",
  },
  headerTitleStyle: {
    color: "#FFFFFF",
  },
  headerTitleAlign: "center",

  // headerLeft: () => (
  //   <View style={styles.profileIcon}>
  //     <MaterialCommunityIcons name="human-greeting" size={20} color='#FFFFFF'/>
  //   </View>
  // ),
};

const styles = StyleSheet.create({
  profileIcon: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    borderRadius: 50,
    padding: 5,
    marginLeft: 10,
  },
  // defaultColorCode: #1C2226
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingStart: 10,
    paddingEnd: 10,
    marginTop: 10,
  },
});

export default HomeScreen;
