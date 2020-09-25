import createDataContext from "./createDataContext";
import firebase from "firebase";
import { navigate } from "../navigationRef";
import _ from "lodash";

const postReducer = (state, action) => {
  switch (action.type) {
    case "loadActivityIndicator":
      return { ...state, activityIndicator: !state.activityIndicator };
    case "UPDATE_RECENT_POSTS":
      return {
        ...state,
        recentPosts: _.uniqBy(
          [...state.recentPosts, action.payload].sort((a, b) =>
            a.timestamp > b.timestamp ? -1 : 1
          ),
          "post_id"
        ),
      };
    case "UPDATE_FAVOURITE_LIST":
      return {
        ...state,
        favouritePostList: _.uniqBy(
          [...state.favouritePostList, action.payload],
          "post_id"
        ),
      };
    case "UPDATE_POST_LIKE_COUNT":
      const index = state.recentPosts.findIndex(
        (obj) => obj.post_id == `${action.payload.post_id}`
      );
      state.recentPosts[index].like_count = action.payload.like_count;
    // return state;
    case "UPDATE_LAST_SYNC_TIME":
      return { ...state, lastSync: action.payload };
    case "UPDATE_LAST_FAV_SYNC_TIME":
      return { ...state, lastFavSync: action.payload };
    case "UPDATE_LAST_ALL_POST_SYNC_TIME":
      return { ...state, lastAllPostSync: action.payload };

    case "UPDATE_USERS_ALL_POST_LIST":
      return {
        ...state,
        usersPost: _.uniqBy([...state.usersPost, action.payload], "post_id"),
      };
    case "FRESH_START":
      return {
        ...state,
        errorMessage: "",
        lastSync: 0,
        lastFavSync: 0,
        lastAllPostSync: 0,
        activityIndicator: false,
        recentPosts: [],
        favouritePostList: [],
        usersPost: [],
      };
    default:
      return state;
  }
};

const guid = () => {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  // return _p8() + _p8(true) + _p8(true) + _p8();
  return _p8() + _p8(true);
};

// Function to upload post to firebase
const uploadPost = (dispatch) => async (
  user_token,
  post_heading,
  post_hashtags,
  post_content,
  post_imageBLOB = null
) => {
  let post_image_URL = false;
  const imageGUID = guid();
  try {
    dispatch({ type: "loadActivityIndicator" });
    if (post_imageBLOB !== null) {
      console.log("inside storage upload ");

      await firebase
        .storage()
        .ref(`posts/${user_token}/${imageGUID}`)
        .put(post_imageBLOB);
      post_image_URL = await firebase
        .storage()
        .ref(`posts/${user_token}/${imageGUID}`)
        .getDownloadURL();
      console.log("post_image_URL:" + post_image_URL);
    }
    await firebase.database().ref(`posts/${user_token}/${imageGUID}`).set({
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      post_heading,
      post_hashtags,
      post_content,
      post_image_URL,
      like_count: 0,
      comment_count: 0,
    });
    await firebase.database().ref(`recent_posts/${user_token}`).set({
      post_id: imageGUID,
      user_token,
    });
    dispatch({ type: "loadActivityIndicator" });

    navigate("Home");
  } catch (error) {
    console.log(error);
  }
};

// Function to get all recent post from all users
const getRecentPost = (dispatch) => async (lastSync) => {
  try {
    let date = Date.now();
    console.log("Minutes", date);
    if (lastSync !== 0 && Math.abs(lastSync - date) < 1000000) {
    } else {
      dispatch({ type: "loadActivityIndicator" });
      await firebase
        .database()
        .ref("recent_posts")
        .on("value", async (snapshot) => {
          let json = snapshot.toJSON();
          for (let i in json) {
            let post_data = {
              comment_count: "",
              like_count: "",
              post_content: "",
              post_hashtags: "",
              post_heading: "",
              post_image_URL: "",
              timestamp: "",
              profilePictureURL: "",
              username: "",
              post_id: "",
            };
            await firebase
              .database()
              .ref(`posts/${json[i].user_token}/${json[i].post_id}`)
              .once("value", (snapshot) => {
                let {
                  comment_count,
                  like_count,
                  post_content,
                  post_hashtags,
                  post_heading,
                  post_image_URL,
                  timestamp,
                } = snapshot.toJSON();
                post_data = {
                  ...post_data,
                  comment_count,
                  like_count,
                  post_content,
                  post_hashtags,
                  post_heading,
                  post_image_URL,
                  timestamp,
                  post_id: json[i].post_id,
                };
              });
            await firebase
              .database()
              .ref(`users/${json[i].user_token}`)
              .once("value", (snapshot) => {
                let {
                  username,
                  profilePictureURL,
                  user_token,
                } = snapshot.toJSON();
                post_data = {
                  ...post_data,
                  username,
                  profilePictureURL,
                };
              });
            dispatch({
              type: "UPDATE_RECENT_POSTS",
              payload: post_data,
            });
          }
        });
      dispatch({ type: "UPDATE_LAST_SYNC_TIME", payload: date });

      dispatch({ type: "loadActivityIndicator" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to add post to Favourite list
const addToFavourite = (dispatch) => async (
  user_token,
  post_id,
  post_image_URL,
  post_heading
) => {
  try {
    let favourite_post = {
      post_id: "",
      user_token: "",
      post_image_URL: "",
      post_heading: "",
    };
    await firebase.database().ref(`favourites/${user_token}/${post_id}`).set({
      post_id,
      user_token,
      post_image_URL,
      post_heading,
    });
    favourite_post = {
      ...favourite_post,
      post_id,
      user_token,
      post_image_URL,
      post_heading,
    };
    dispatch({
      type: "UPDATE_FAVOURITE_LIST",
      payload: favourite_post,
    });
  } catch (error) {
    console.log(error);
  }
};

// TODO: this function fetches list of post from favourites
const fetchFavouritePostList = (dispatch) => async (
  user_token,
  lastFavSync
) => {
  try {
    let date = Date.now();
    if (lastFavSync !== 0 && Math.abs(lastFavSync - date) < 1000000) {
    } else {
      dispatch({ type: "loadActivityIndicator" });

      let favourite_post = {
        post_id: "",
        user_token: "",
        post_image_URL: "",
        post_heading: "",
      };
      await firebase
        .database()
        .ref(`favourites/${user_token}`)
        .once("value", (snapshot) => {
          // console.log("snapshot:", snapshot.toJSON());
          let json = snapshot.toJSON();

          for (let i in json) {
            let { user_token, post_image_URL, post_id, post_heading } = json[i];
            favourite_post = {
              ...favourite_post,
              user_token,
              post_image_URL,
              post_id,
              post_heading,
            };
            dispatch({
              type: "UPDATE_FAVOURITE_LIST",
              payload: favourite_post,
            });
          }
        });
      dispatch({ type: "UPDATE_LAST_FAV_SYNC_TIME", payload: date });
      dispatch({ type: "loadActivityIndicator" });
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchUsersAllPost = (dispatch) => async (user_token, lastAllPostSync) => {
  try {
    let date = Date.now();
    if (lastAllPostSync !== 0 && Math.abs(lastAllPostSync - date) < 1000000) {
    } else {
      // console.log("Inside fetchUsersAllPost");
      let post_struct = {
        timestamp: "",
        post_heading: "",
        post_hashtags: "",
        post_content: "",
        post_image_URL: "",
        like_count: "",
        comment_count: "",
        post_id: "",
      };

      await firebase
        .database()
        .ref(`posts/${user_token}`)
        .once("value", (snapshot) => {
          const json = snapshot.toJSON();
          for (let i in json) {
            // console.log("json", i);
            let {
              timestamp,
              post_heading,
              post_hashtags,
              post_content,
              post_image_URL,
              like_count,
              comment_count,
            } = json[i];
            post_struct = {
              ...post_struct,
              timestamp,
              post_heading,
              post_hashtags,
              post_content,
              post_image_URL,
              like_count,
              comment_count,
              post_id: i,
            };
            dispatch({
              type: "UPDATE_USERS_ALL_POST_LIST",
              payload: post_struct,
            });
          }
        });
      dispatch({ type: "UPDATE_LAST_ALL_POST_SYNC_TIME", payload: date });
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to Like the post
// TODO: write a query to increment 'like_count' in 'posts->user_id->post_id->like_count'
const likePost = (dispatch) => async (post_id, user_token) => {
  try {
    let like_count = 1;
    await firebase
      .database()
      .ref(`likes/${post_id}`)
      .transaction(
        (snapshot) => {
          if (snapshot !== null) {
            like_count = snapshot.likeArray.length + 1;
            return { likeArray: _.uniq([...snapshot.likeArray, user_token]) };
          } else {
            return { likeArray: [user_token] };
          }
        },
        async (error, committed, snapshot) => {
          if (error) {
            console.log("Transaction failed abnormally!", error);
          } else if (!committed) {
            console.log("Aborted the transaction ");
          } else {
            console.log("Successful");

            await firebase
              .database()
              .ref("posts")
              .orderByKey()
              .once("value", async (it) => {
                let KEY = it.toJSON();
                for (let i in KEY) {
                  if (it.child(`${i}`).hasChild(`${post_id}`)) {
                    console.log("like_count:", like_count);

                    await firebase
                      .database()
                      .ref(`posts/${i}/${post_id}`)
                      .update({
                        like_count: like_count,
                      });
                    break;
                  }
                }
              });
          }
        }
      );
    dispatch({
      type: "UPDATE_POST_LIKE_COUNT",
      payload: { post_id, like_count },
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to Dislike the post
// TODO: write a query to delete the user_id from 'like_array' in 'likes'
// TODO: write a query to decrement 'like_count' in 'posts->user_id->post_id->like_count'
const dislikePost = (dispatch) => async (post_id, user_token) => {
  try {
    let like_count = 0;
    await firebase
      .database()
      .ref(`likes/${post_id}`)
      .orderByValue()
      .equalTo(`${user_token}`)
      .ref.remove();
    await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .once("value", async (it) => {
        let KEY = it.toJSON();
        for (let i in KEY) {
          if (it.child(`${i}`).hasChild(`${post_id}`)) {
            await firebase
              .database()
              .ref(`posts/${i}/${post_id}`)
              .once("value", async (snapshot) => {
                like_count = snapshot.child("like_count").val();
                await firebase
                  .database()
                  .ref(`posts/${i}/${post_id}`)
                  .update({
                    like_count: snapshot.child("like_count").val() - 1,
                  });
              });
            break;
          }
        }
      });
    dispatch({
      type: "UPDATE_POST_LIKE_COUNT",
      payload: { post_id, like_count },
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPostData = (dispatch) => () => {
  dispatch({ type: "FRESH_START" });
};

export const { Provider, Context } = createDataContext(
  postReducer,
  {
    uploadPost,
    getRecentPost,
    addToFavourite,
    fetchFavouritePostList,
    fetchUsersAllPost,
    likePost,
    dislikePost,
    resetPostData,
  },
  {
    errorMessage: "",
    lastSync: 0,
    lastFavSync: 0,
    lastAllPostSync: 0,
    activityIndicator: false,
    recentPosts: [],
    favouritePostList: [],
    usersPost: [],
  }
);
