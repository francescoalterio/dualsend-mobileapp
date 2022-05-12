import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const InputIPServer = ({ setServerIP, setIsLoading, error, setError }) => {
  const [input, setInput] = useState("");

  const handlePress = async () => {
    setIsLoading(true);
    axios
      .get(`http://${input}:3241`)
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            setIsLoading(false);
            setServerIP(`${input}:3241`);
            AsyncStorage.setItem("dualServerIP", `${input}:3241`);
          }, 1500);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError("El servidor no existe o la dirección es incorrecta!");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el IP de tu Servidor:</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <View style={{ width: "100%" }}>
        <Button color={"#ff7700"} title="Conectar" onPress={handlePress} />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    backgroundColor: "#1f1f1f",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ff7700",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: "#ff7700",
    fontWeight: "bold",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  error: {
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    backgroundColor: "#ff3636",
    width: "100%",
    height: 40,
    borderRadius: 5,
    textAlign: "center",
    padding: 10,
  },
});

export default InputIPServer;
