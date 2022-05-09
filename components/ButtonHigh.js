import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const ButtonHigh = ({ bgColor, color, content, icon, size, handlePress }) => {
  const width = size === "large" ? "100%" : "50%";
  return (
    <View style={[styles.background, { width }]}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.touchable, { backgroundColor: bgColor }]}
      >
        <View style={styles.container}>
          <Text style={[styles.text, { color: color, fontSize: 20 }]}>
            {icon}
          </Text>
          <Text style={[styles.text, { color: color }]}>{content}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    marginTop: 10,
  },

  touchable: {
    width: "95%",
    height: 70,
    borderRadius: 20,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    paddingLeft: 20,
    justifyContent: "center",
  },

  container: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    marginRight: 10,
  },
});

export default ButtonHigh;
