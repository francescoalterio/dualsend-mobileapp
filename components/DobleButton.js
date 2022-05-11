import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import ButtonHigh from "./ButtonHigh";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileArrowUp, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const DobleButton = ({ serverIP, path, setData }) => {
  const [nameDirectory, setNameDirectory] = useState("");
  const [createDirectory, setCreateDirectory] = useState(false);

  const sendFile = async () => {
    const file = await DocumentPicker.getDocumentAsync();

    const response = await FileSystem.uploadAsync(
      `http://${serverIP}/upload/${path}`,
      file.uri,
      {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        fieldName: "file",
      }
    );
    const result = await JSON.parse(response.body);
    const directories = result.content.directories.map((dir) => {
      return {
        name: dir,
        type: "directory",
        path: `${path}/${dir}`,
      };
    });

    const files = result.content.files.map((file) => {
      return {
        name: file,
        type: "file",
        path: `${path}/${file}`,
      };
    });

    setData([...directories, ...files]);
  };

  const handleCreateDirectory = async () => {
    const response = await axios.post(`http://${serverIP}/create/${path}`, {
      name: nameDirectory,
    });
    const directories = response.data.content.directories.map((dir) => {
      return {
        name: dir,
        type: "directory",
        path: `${path}/${dir}`,
      };
    });

    const files = response.data.content.files.map((file) => {
      return {
        name: file,
        type: "file",
        path: `${path}/${file}`,
      };
    });

    setData([...directories, ...files]);
    setCreateDirectory(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxButtons}>
        <ButtonHigh
          color="#fff"
          bgColor="#3369ff"
          content="Send File"
          icon={
            <FontAwesomeIcon icon={faFileArrowUp} color="white" size={20} />
          }
          handlePress={sendFile}
        />
        <ButtonHigh
          color="#fff"
          bgColor="#299925"
          content="Create Directory"
          icon={<FontAwesomeIcon icon={faFolderPlus} color="white" size={20} />}
          handlePress={() => setCreateDirectory(true)}
        />
      </View>
      {createDirectory ? (
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            placeholder="Directory Name"
            value={nameDirectory}
            onChangeText={(text) => setNameDirectory(text)}
          />
          <TouchableOpacity onPress={handleCreateDirectory}>
            <Text style={styles.button}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCreateDirectory(false)}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  boxButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "97.5%",
  },
  boxInput: {
    width: "100%",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: "50%",
    borderRadius: 10,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    outlineColor: "#ff4e26",
  },
  button: {
    backgroundColor: "#ff4e26",
    height: 40,
    borderRadius: 10,
    color: "#fff",
    padding: 10,
    textAlign: "center",
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: "#ff3d3d",
    height: 40,
    borderRadius: 10,
    color: "#fff",
    padding: 10,
    textAlign: "center",
    marginLeft: 10,
  },
});

export default DobleButton;
