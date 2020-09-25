import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Button, Image } from "react-native-elements";
import { Entypo, FontAwesome, Feather } from "@expo/vector-icons";
const PostContainerComponent = ({
  response: {
    comment_count,
    like_count,
    post_content,
    post_hashtags,
    post_heading,
    post_image_URL,
    timestamp,
    profilePictureURL,
    username,
  },
  likedBool = false,
  likePostCallback,
  dislikePostCAllback,
  sharePostCallback,
}) => {
  const [liked, setLiked] = useState(likedBool);
  return (
    <View style={styles.conatiner}>
      {post_image_URL !== false ? (
        <Image
          source={{ uri: post_image_URL }}
          // style={styles.post_image_style}
          containerStyle={styles.post_image_style}
        />
      ) : null}
      <View style={[styles.childContainerOne, styles.marginStyle]}>
        <Avatar
          rounded
          size="small"
          source={{
            uri: profilePictureURL,
          }}
          containerStyle={styles.avatar_style}
        />
        <Text style={styles.username_style}>{username}</Text>
        <Text style={styles.timestamp_style}>
          {new Date(parseInt(timestamp)).toLocaleDateString()}
        </Text>
      </View>
      <Text style={[styles.heading_style, styles.marginStyle]}>
        {post_heading}
      </Text>
      {post_hashtags !== "" ? (
        <Text style={[styles.hashtags_style, { marginStart: 5, marginEnd: 5 }]}>
          {post_hashtags}
        </Text>
      ) : null}
      {post_content !== "" ? (
        <Text
          numberOfLines={4}
          style={[styles.content_style, styles.marginStyle]}
        >
          {post_content}
        </Text>
      ) : null}
      <View style={styles.divider} />
      <View style={styles.footer_button_container_style}>
        <Button
          type="clear"
          icon={
            <Entypo
              name={liked ? "heart" : "heart-outlined"}
              size={24}
              color="#505357"
              style={{ marginLeft: 5 }}
            />
          }
          iconRight={true}
          title={String(like_count)}
          titleStyle={{ color: "#5E6367" }}
          containerStyle={styles.footer_button_style}
          onPress={() => {
            liked ? dislikePostCAllback() : likePostCallback(),
              setLiked(!liked);
          }}
        />
        <Button
          type="clear"
          icon={
            <FontAwesome
              name="commenting-o"
              size={24}
              color="#505357"
              style={{ marginLeft: 5 }}
            />
          }
          activeOpacity={1}
          raised
          iconRight={true}
          title={String(comment_count)}
          titleStyle={{ color: "#5E6367" }}
          containerStyle={styles.footer_button_style}
        />
        <Button
          type="clear"
          icon={<Feather name="share-2" size={24} color="#505357" />}
          containerStyle={styles.footer_button_style}
          titleStyle={{ color: "#5E6367" }}
          onPress={() => {
            sharePostCallback();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: "#282B30",
    backgroundColor: "#FFFFFF",

    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  post_image_style: {
    width: "100%",
    height: 150,
    borderRadius: 20,
    marginBottom: 5,
  },
  marginStyle: {
    margin: 5,
  },
  childContainerOne: {
    width: "100%",
    flexDirection: "row",
  },
  avatar_style: {
    borderWidth: 0.5,
    borderColor: "#D6D6D6",
  },
  username_style: {
    fontSize: 18,
    color: "#57626D",
    textAlignVertical: "center",
    marginStart: 10,
    letterSpacing: 0.2,
  },
  timestamp_style: {
    fontSize: 14,
    color: "#939DA7",
    textAlignVertical: "center",
    position: "absolute",
    right: 15,
    top: 0,
    bottom: 0,
    letterSpacing: 0.2,
  },
  heading_style: {
    fontSize: 22,
    color: "#232323",
    fontWeight: "bold",
    letterSpacing: 0.2,
    marginTop: 7.5,
    marginBottom: 7.5,
  },
  hashtags_style: {
    fontSize: 14,
    color: "#3b87e0",
    letterSpacing: 0.2,
    marginTop: 5,
    marginBottom: 5,
  },
  content_style: {
    fontSize: 17,
    color: "#393939",
    letterSpacing:0.3,
    lineHeight:22
  },
  divider: {
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#939DA7",
  },
  footer_button_container_style: {
    flexDirection: "row",
    width: "100%",
  },
  footer_button_style: {
    flex: 0.33,
    borderRadius: 10,
    marginTop: 2,
  },
});

export { PostContainerComponent };
