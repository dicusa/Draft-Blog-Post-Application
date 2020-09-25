import createDataContext from "./createDataContext";
import firebase from "firebase";
import _ from "lodash";
const searchAuth = (state, action) => {
  switch (action.type) {
    case "loadActivityIndicator":
      return { ...state, activityIndicator: !state.activityIndicator };
    case "UPDATE_TRENDING_POST_LIST":
      return {
        ...state,
        trendingPostList: _.uniq(
          action.payload.sort((a, b) => (a.like_count > b.like_count ? -1 : 1))
        ),
      };
    case "UPDATE_LAST_SEARCH_SYNC":
      return { ...state, lastSearchSync: action.payload };
    default:
      return state;
  }
};

// TODO: Function to implement logic of fetching most liked and commented posts => Trending Post
const fetchTrendingPost = (dispatch) => async (lastSearchSync) => {
  try {
    let date = Date.now();
    if (lastSearchSync !== 0 && Math.abs(lastSearchSync - date) < 1000000) {
    } else {
      dispatch({ type: "loadActivityIndicator" });

      let trendList = [];
      await firebase
        .database()
        .ref("posts")
        .once("value", (snapshot) => {
          snapshot.forEach((snap) => {
            let json = snap.toJSON();
            for (let i in json) {
              trendList.push({
                comment_count: json[i].comment_count,
                like_count: json[i].like_count,
                post_content: json[i].post_content,
                post_hashtags: json[i].post_hashtags,
                post_heading: json[i].post_heading,
                post_image_URL: json[i].post_image_URL,
                timestamp: json[i].timestamp,
                profilePictureURL: json[i].profilePictureURL,
                post_id: i,
              });
            }
          });
        });
      dispatch({ type: "UPDATE_TRENDING_POST_LIST", payload: trendList });
      dispatch({ type: "UPDATE_LAST_SEARCH_SYNC", payload: date });
      dispatch({ type: "loadActivityIndicator" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  searchAuth,
  { fetchTrendingPost },
  {
    errorMessage: "",
    activityIndicator: false,
    trendingPostList: [],
    lastSearchSync: 0,
  }
);
