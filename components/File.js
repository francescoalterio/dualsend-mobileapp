import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import * as FileSystem from "expo-file-system";

const File = ({ name, icon, path, serverIP }) => {
  const download = () => {
    FileSystem.downloadAsync(
      `http://${serverIP}/get/${path}-${name}`,
      FileSystem.documentDirectory + "${name}"
    ).then(({ uri }) => {
      console.log("Finished downloading to ", uri);
    });
  };

  return (
    <View style={styles.background}>
      <View onPress={() => console.log("clik")} style={styles.box}>
        <View style={styles.container}>
          <Text style={[styles.text, { fontSize: 20 }]}>{icon}</Text>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.boxTouchable}>
          <TouchableOpacity onPress={download}>
            <View style={styles.touchable}>
              <FontAwesomeIcon icon={faDownload} color="white" size={20} />
            </View>
          </TouchableOpacity>
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

  box: {
    width: "95%",
    height: 70,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderColor: "#363636",
    borderStyle: "solid",
    borderWidth: 4,
    borderRadius: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  container: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },

  text: {
    marginRight: 10,
    color: "#fff",
  },

  boxTouchable: {
    height: "100%",
    justifyContent: "center",
    marginRight: 10,
  },

  touchable: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default File;
