import { View } from "react-native";
import ButtonHigh from "./ButtonHigh";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileArrowUp, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const DobleButton = () => {
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
          handlePress={() => console.log("click")}
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
