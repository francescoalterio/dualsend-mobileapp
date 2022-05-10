import { View } from "react-native";
import ButtonHigh from "./ButtonHigh";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileArrowUp, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const DobleButton = ({ serverIP, path, setData }) => {
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

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "97.5%",
        }}
      >
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
          handlePress={() => console.log("click")}
        />
      </View>
    </View>
  );
};

export default DobleButton;
