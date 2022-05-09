import { Text, View, StyleSheet } from "react-native";

const File = ({ name, icon }) => {
  return (
    <View style={styles.background}>
      <View onPress={() => console.log("clik")} style={styles.touchable}>
        <View style={styles.container}>
          <Text style={[styles.text, { fontSize: 20 }]}>{icon}</Text>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },

  touchable: {
    width: "95%",
    height: 70,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderColor: "#363636",
    borderStyle: "solid",
    borderWidth: 4,
    borderRadius: 20,
    paddingLeft: 20,
  },

  container: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    marginRight: 10,
    color: "#fff",
  },
});

export default File;
