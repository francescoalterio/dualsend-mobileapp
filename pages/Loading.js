import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({ content }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff7700" />
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
});

export default Loading;
