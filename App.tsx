import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Body from "./components/body";
import Header from "./Layout/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [count, setCount] = useState(1);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Header count={count} />
        <Body setCount={setCount} count={count} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcdcdc",
  },
});
