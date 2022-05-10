import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import axios from "axios";
import File from "../components/File";
import Path from "../components/Path";
import ButtonHigh from "../components/ButtonHigh";
import DobleButton from "../components/DobleButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFolder,
  faFile,
  faArrowTurnUp,
} from "@fortawesome/free-solid-svg-icons";

const Explorer = ({ serverIP }) => {
  const [data, setData] = useState([]);
  const [path, setPath] = useState("");

  useEffect(() => {
    axios.get(`http://${serverIP}/${path}`).then((response) => {
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
    });
  }, [path]);

  const navigate = (name) => {
    !path ? setPath(name) : setPath(`${path}-${name}`);
  };

  const returnDir = () => {
    const paths = path.split("-");
    paths.pop();
    setPath(paths.join("-"));
  };

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <Path path={path} />
        {path ? (
          <ButtonHigh
            color="#fff"
            bgColor="#ff3d3d"
            content="Return"
            icon={
              <FontAwesomeIcon icon={faArrowTurnUp} color="white" size={20} />
            }
            size="large"
            handlePress={returnDir}
          />
        ) : undefined}
        <DobleButton serverIP={serverIP} path={path} setData={setData} />
      </View>
      {data && (
        <>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              if (item.type === "directory") {
                return (
                  <ButtonHigh
                    color="#fff"
                    bgColor="#363636"
                    content={item.name}
                    icon={
                      <FontAwesomeIcon
                        icon={faFolder}
                        color="white"
                        size={20}
                      />
                    }
                    size="large"
                    handlePress={() => navigate(item.name)}
                  />
                );
              } else {
                return (
                  <File
                    name={item.name}
                    icon={
                      <FontAwesomeIcon icon={faFile} color="white" size={20} />
                    }
                  />
                );
              }
            }}
            keyExtractor={(item) => item.name}
          />
        </>
      )}
    </>
  );
};

export default Explorer;
