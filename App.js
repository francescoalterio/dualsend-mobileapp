import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Explorer from "./pages/Explorer";

export default function App() {
  const [serverIP, setServerIP] = useState("192.168.1.7:3000");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Explorer serverIP={serverIP} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#1f1f1f",
    paddingBottom: 20,
  },
});
