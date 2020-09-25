import React, { useRef, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  YellowBox,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomSearchBar, SearchSuggestionContainer } from "../components";
import { Button } from "react-native-elements";
import { Context as SearchContext } from "../context/SearchContext";
import _ from "lodash";
import { _FlatList } from "react-native";
const GlobalSearchScreen = ({ navigation }) => {
  YellowBox.ignoreWarnings([
    "VirtualizedLists should never be nested", // TODO: Remove when fixed
  ]);

  // const SEARCH_MIN_HEIGHT = 0;
  // const SEARCH_MAX_HEIGHT = 50;

  // let scrollY = useRef(new Animated.Value(0)).current;

  // const searchBarHeight = scrollY.interpolate({
  //   inputRange: [0, SEARCH_MAX_HEIGHT - SEARCH_MIN_HEIGHT],
  //   outputRange: [SEARCH_MAX_HEIGHT, SEARCH_MIN_HEIGHT],
  //   extrapolate: "clamp",
  // });

  const {
    fetchTrendingPost,
    state: { trendingPostList, lastSearchSync, activityIndicator },
  } = useContext(SearchContext);

  // Smaple Data for testing
  const DATA = [
    {
      id: "0",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "1",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "2",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
  ];

  // Smaple Data for testing
  const PDATA = [
    {
      id: "15",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "16",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "17",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
  ];

  // Smaple Data for testing
  const TDATA = [
    {
      id: "3",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "4",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "5",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "6",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "7",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      id: "8",
      title: "Backpacking Combodia: 3 Suggested Itinearies for Your Trip.",
      url:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
  ];

  // Smaple Data for testing
  const BDATA = [
    {
      id: "9",
      title: "TRAVEL",
    },
    {
      id: "10",
      title: "TECHNOLOGIES",
    },
    {
      id: "11",
      title: "FOOD",
    },
    {
      id: "12",
      title: "SPORTS",
    },
    {
      id: "13",
      title: "TV & MOVIES",
    },
    {
      id: "14",
      title: "MUSIC",
    },
  ];

  useEffect(() => {
    fetchTrendingPost(lastSearchSync);
  }, []);

  const loadTrendingPost = () => {
    return _.uniq(
      trendingPostList
        .map((item) => {
          return (
            <TouchableOpacity
              key={item.post_id}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("PostView", {
                  post_object: item,
                  route_name: "GlobalSearch",
                });
              }}
            >
              <SearchSuggestionContainer
                post_header={item.post_heading}
                postImageURL={item.post_image_URL}
              />
            </TouchableOpacity>
          );
        })
        .sort((a, b) => (a.like_count > b.like_count ? -1 : 1))
    );
  };
  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#20262B" /> // dark_theme */}
      <StatusBar barStyle="dark-content" backgroundColor="#EBEBEB" />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <CustomSearchBar />
      </TouchableOpacity>

      <View style={styles.topicListContainer}>
        <FlatList
          data={BDATA}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Button
                key={item.id}
                type="outline"
                title={item.title}
                titleStyle={{ fontSize: 12, color: "#5E6367" }}
                containerStyle={{ margin: 5 }}
              />
            );
          }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
          // paddingTop: searchBarHeight,
        }}
        // scrollEventThrottle={1}
        // onScroll={Animated.event([
        //   { nativeEvent: { contentOffset: { y: scrollY } } },
        // ])}
      >
        <View style={styles.container}>
          <Text style={styles.flatListHeadingStyle}>Trending Post</Text>
          {activityIndicator ? (
            <ActivityIndicator
              size="large"
              color="#36b1b6"
              style={{ alignSelf: "center", justifyContent: "center" }}
            />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {loadTrendingPost()}
            </ScrollView>
          )}

          <Text style={styles.flatListHeadingStyle}>
            Post you may be intrested in
          </Text>
          <FlatList
            data={PDATA}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log("id: ", item.id);
                  }}
                >
                  <SearchSuggestionContainer
                    post_header={item.title}
                    postImageURL={item.url}
                  />
                </TouchableOpacity>
              );
            }}
          />

          <Text style={styles.flatListHeadingStyle}>All Topics</Text>
          <FlatList
            data={TDATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log("id: ", item.id);
                  }}
                >
                  <SearchSuggestionContainer
                    post_header={item.title}
                    postImageURL={item.url}
                    container_height={150}
                    container_width={Dimensions.get("screen").width / 2 - 15}
                  />
                </TouchableOpacity>
              );
            }}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  topicListContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
  },

  flatListHeadingStyle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5E6367",
    margin: 10,
  },
});

GlobalSearchScreen.navigationOptions = {
  header: null,
  title: "Search",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="ios-search" size={33} color={tintColor} />
  ),
};

export default GlobalSearchScreen;
