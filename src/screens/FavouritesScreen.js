import React, { useContext, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { CustomHeader, FavouritePostSubContainer } from "../components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Context as PostContext } from "../context/PostContext";
import { Context as UserContext } from "../context/UserContext";

const FavouritesScreen = () => {
  const {
    fetchFavouritePostList,
    state: { favouritePostList, activityIndicator, lastFavSync },
  } = useContext(PostContext);
  const {
    state: { user_token },
  } = useContext(UserContext);

  useEffect(() => {
    fetchFavouritePostList(user_token, lastFavSync);
  }, []);

  const renderFavouritePosts = () => {
    return favouritePostList.map((item) => {
      console.log("item:", item);
      return (
        <TouchableOpacity
          key={item.post_id}
          activeOpacity={0.8}
          // TODO: add a onPress action for favourite post list
          onPress={() => {}}
        >
          <FavouritePostSubContainer
            post_image_URL={item.post_image_URL}
            post_heading={item.post_heading}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <>
      <CustomHeader
        buttonRightBool={false}
        navigationRoute="Activity"
        headerTitle="Favourite"
      />
      {activityIndicator ? (
        <ActivityIndicator size="large" color="#36b1b6" />
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor:'#FAFAFA' }}>{renderFavouritePosts()}</ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default FavouritesScreen;
