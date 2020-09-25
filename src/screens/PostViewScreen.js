import React, { useEffect, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  BackHandler,
  Dimensions,
} from "react-native";
import { CustomHeader } from "../components";
import { Image, Button, Icon } from "react-native-elements";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Context as PostContext } from "../context/PostContext";
import { Context as UserContext } from "../context/UserContext";

const PostViewScreen = ({ navigation }) => {
  const {
    like_count,
    post_content,
    post_heading,
    post_image_URL,
    timestamp,
    post_id,
  } = navigation.getParam("post_object");
  const route_name = navigation.getParam("route_name");
  const {
    state: { user_token },
  } = useContext(UserContext);

  const {
    addToFavourite,
    state: { favouritePostList },
  } = useContext(PostContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(route_name);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const addToCollection = () => {
    addToFavourite(user_token, post_id, post_image_URL, post_heading);
  };

  const [favourite, setFavourite] = useState(
    favouritePostList.some((ele) => {
      return ele.post_id === post_id;
    })
  );

  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#20262B" /> // dark-theme */}
      <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />
      <CustomHeader navigationRoute={route_name} headerTitle="Blog" />

      <ScrollView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri:
                post_image_URL !== false
                  ? post_image_URL
                  : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            }}
            containerStyle={styles.post_image_style}
          />
          <View style={styles.post_container}>
            <View style={styles.post_container1Row}>
              <Text style={styles.post_heading_style}>{post_heading}</Text>
              <Icon
                type="font-awesome"
                name={favourite ? "bookmark" : "bookmark-o"}
                size={30}
                color="#24a0ed"
                iconStyle={{ marginRight: 10 }}
                onPress={() => {
                  addToCollection(), setFavourite(!favourite);
                }}
              />
            </View>
            <View style={styles.timestamp_and_like_count_container}>
              <Button
                type="clear"
                icon={
                  <Ionicons
                    name="ios-time"
                    size={24}
                    color="#505357"
                    style={{ marginRight: 10 }}
                  />
                }
                title={new Date(parseInt(timestamp)).toLocaleDateString()}
                titleStyle={styles.timestamp_style}
                disabled
              />
              <View
                style={{ borderWidth: 0.5, borderColor: "gray", height: "60%" }}
              />
              <Button
                disabled
                type="clear"
                title={String(like_count)}
                iconRight
                icon={
                  <Entypo
                    name={like_count > 0 ? "heart" : "heart-outlined"}
                    size={24}
                    color="#505357"
                    style={{ marginLeft: 5 }}
                  />
                }
                titleStyle={{ color: "#5E6367" }}
              />
            </View>
            <Text style={styles.content_style}>
              <Text style={[styles.content_style, { fontSize: 28 }]}>
                {post_content[0]}
              </Text>
              {post_content.substring(1)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get("screen").height,
    backgroundColor: "#FFFFFF",
  },
  post_image_style: {
    top: 0,
    height: Dimensions.get("screen").height * 0.4,
  },
  post_container: {
    flex: 1,
    marginTop: -20,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F6F6F6",
    paddingStart: 10,
    paddingEnd: 10,
    // backgroundColor: "#1C2226",
  },
  post_container1Row: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  post_heading_style: {
    fontSize: 24,
    fontWeight: "bold",
    marginStart: 10,
    maxWidth: Dimensions.get("screen").width - 70,
    color: "#232323",
    // lineHeight: 25,
    letterSpacing: 0.2,
  },
  timestamp_and_like_count_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  timestamp_style: {
    fontSize: 14,
    color: "#939DA7",
  },
  content_style: {
    marginStart: 10,
    marginBottom: 40,
    paddingTop:10,
    fontSize: 18,
    color: "#332427",
    lineHeight: 25,
    letterSpacing: 0.2,
  },
});

export default PostViewScreen;
