import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Context as PostContext } from "../context/PostContext";

import { ScrollView } from "react-native-gesture-handler";
import { CustomHeader } from "../components";
const SettingsScreen = () => {
  const { signOutUser } = useContext(AuthContext);
  const { resetUserData } = useContext(UserContext);
  const { resetPostData } = useContext(PostContext);

  return (
    <>
      <CustomHeader
        headerTitle="Settings"
        navigationRoute="Account"
        buttonRightBool={false}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View style={styles.container}>
          <Button
            type="clear"
            title="Log Out"
            onPress={() => {
              signOutUser(), resetPostData(), resetUserData();
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

SettingsScreen.navigationOptions = {
  title: "Settings",
  headerStyle: {
    backgroundColor: "#1C2226",
  },
  headerTitleStyle: {
    color: "#FFFFFF",
  },
  headerTitleAlign: "center",
  headerTintColor: "#F8F8F8",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
});

export default SettingsScreen;
