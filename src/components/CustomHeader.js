import React from "react";
import { View, StyleSheet, Text, Dimensions, Animated } from "react-native";
import { Button, Icon } from "react-native-elements";
import { navigate } from "../navigationRef";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = ({
  buttonLeftBool = true,
  buttonRightBool = true,
  iconRightType,
  iconRightName,
  buttonRightCallback,
  headerTitle,
  navigationRoute = null,
  headerHeight = 45,
  position = "relative",
}) => {
  const positionHeaderTitle = headerTitle.length;
  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          height: headerHeight,
          // position: "absolute",
          // top: 0,
          width: "100%",
          justifyContent: "center",
          position,
        },
      ]}
    >
      {buttonLeftBool ? (
        <Button
          containerStyle={styles.buttonConatinerStyle}
          type="clear"
          icon={
            <Ionicons
              name="md-arrow-back"
              size={26}
              // color="#F8F8F8" // dark_theme
              color="#20262B"
            />
          }
          onPress={() => {
            navigate(navigationRoute);
          }}
        />
      ) : null}
      <Text style={styles.headingText}>{headerTitle}</Text>
      {buttonRightBool ? (
        <Icon
          type={iconRightType}
          name={iconRightName}
          onPress={() => {
            buttonRightCallback();
          }}
          size={27}
          //TODO: change the color to perfect hash code
          color="#24a0ed"
          containerStyle={styles.rightButtonContainerStyle}
        />
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    // backgroundColor: "#20262B", dark_theme
    backgroundColor: "#FFFFFF",

    borderBottomWidth: 0.5,
    // borderBottomColor: "#1C2226", dark_theme
    borderBottomColor: "#FFFFFF",

    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    // padding: 5,
    justifyContent: "center",
  },
  buttonConatinerStyle: {
    justifyContent: "center",
    height: "100%",
    // backgroundColor: "#20262B",

    left: 10,
    position: "absolute",
  },
  headingText: {
    // backgroundColor: "#20262B",
    left: 0,
    right: 0,
    fontSize: 19,
    fontWeight: "700",
    color: "#20262B",
    textAlignVertical: "center",
  },
  rightButtonContainerStyle: {
    bottom: 10,
    right: 10,
    position: "absolute",
  },
});

export { CustomHeader };
