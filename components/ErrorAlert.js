import { View, Text, StyleSheet } from "react-native";

const ErrorAlert = ({ error }) => {
  return (
    <View
      style={
        !error
          ? [styles.container]
          : [styles.container, styles.containerAnimated]
      }
    >
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    backgroundColor: "#ff3636",
    height: 40,
    borderRadius: 5,
    textAlign: "center",
    padding: 10,
    marginLeft: "2.5%",
    position: "absolute",
    bottom: -100,
    transition: "all 1s",
  },
  containerAnimated: {
    bottom: 50,
  },

  text: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ErrorAlert;
