import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Explorer from "./pages/Explorer";
import InputIPServer from "./pages/InputIPServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "./pages/Loading";

export default function App() {
  const [serverIP, setServerIP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getServerIP = async () => {
      const serverIP = await AsyncStorage.getItem("dualServerIP");
      if (serverIP) {
        setIsLoading(true);
        axios
          .get(`http://${serverIP}`)
          .then((res) => {
            if (res.status === 200) {
              setTimeout(() => {
                setIsLoading(false);
                setServerIP(serverIP);
              }, 1500);
            }
          })
          .catch((err) => {
            setIsLoading(false);
          });
      }
    };
    getServerIP();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {serverIP ? (
        <Explorer serverIP={serverIP} />
      ) : isLoading ? (
        <Loading content="Conectando al Servidor..." />
      ) : (
        <InputIPServer
          setServerIP={setServerIP}
          setIsLoading={setIsLoading}
          error={error}
          setError={setError}
        />
      )}
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
