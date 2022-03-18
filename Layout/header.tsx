import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-easy-icon";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_800ExtraBold,
} from "@expo-google-fonts/playfair-display";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Header() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Text>
            <Ionicons
              name="menu"
              color="rgba(0, 0, 0, .9)"
              size={24}
              style={{ backgroundColor: "transparent" }}
            />
          </Text>
        </View>
        <Text
          style={{ fontFamily: "PlayfairDisplay_800ExtraBold", fontSize: 24 }}
        >
          Kamsety{" "}
          <Text
            style={{
              fontSize: 10,
            }}
          >
            (R)
          </Text>
        </Text>
        <Text>
          <Ionicons
            name="cart-outline"
            color="rgba(0, 0, 0, .9)"
            size={24}
            style={{ backgroundColor: "transparent" }}
          />
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "absolute",
    top: 0,
    zIndex: 9,
    width: "100%",
    // backgroundColor: "#dcdcdc",
  },
});
