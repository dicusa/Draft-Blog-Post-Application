import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomHeader, ActivitySubContainer } from "../components";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
const ActivityScreen = ({ navigation }) => {
  return (
    <>
      <CustomHeader
        buttonRightBool={false}
        buttonLeftBool={false}
        headerTitle="Activity"
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("Favourites");
            }}
          >
            <ActivitySubContainer
              icon_url="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              title="Favourite Posts"
              sub_text="See all saved posts"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default ActivityScreen;
