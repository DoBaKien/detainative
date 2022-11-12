import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-native-material/core";
import { useEffect, useState } from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function ListFriend({ a, navigation }) {
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setValue(value);
    });
  }, []);
  const [value, setValue] = useState("");
  const handle = (uid) => {
    navigation.navigate("Profile", {
      id1: uid,
      id: value,
      type: "friend",
    });
  };
  return (
    <TouchableOpacity onPress={() => handle(a.uid)}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri:
              a.avatar ||
              "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
          }}
        />
        <Text variant="h5" numberOfLines={1} style={{ width: "45%" }}>
          {a.nickName}
        </Text>

        <Text variant="caption" style={{ marginRight: 20 }}>
          Bạn bè
        </Text>

        <TouchableOpacity>
          <Image
            style={styles.tinyLogo}
            source={require("../../component/image/cancel-icon.png")}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#98E5B7",
    justifyContent: "space-between",
    borderRadius: 50,
    padding: 10,
    height: 100,
  },
  logo: {
    resizeMode: "contain",
    height: 50,
    width: 50,
  },
  tinyLogo: {
    resizeMode: "stretch",
    width: 50,
    height: 50,
  },
});

export default ListFriend;
