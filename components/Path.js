import { View, Text, StyleSheet, ScrollView } from "react-native";

const Path = ({ path }) => {
  const paths = path.split("-");
  const pathFormatted = paths.join("/");

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.path}>{"C:/" + pathFormatted}</Text>
        </ScrollView>
      </View>
      <View style={styles.separator}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: "center",
  },
  separator: {
    width: "100%",
    height: 3,
    backgroundColor: "#ff4e26",
  },
  path: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Path;
