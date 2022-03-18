import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Body from "./components/body";
import Header from "./Layout/header";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Body />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcdcdc",
  },
});
