import { Text } from "@react-native-material/core";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function ListGroup({ a, navigation, id }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Message", {
          cid: a.cid,
          id: id,
        });
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
          }}
        />
        <Text variant="h5" numberOfLines={1} style={{ width: "45%" }}>
          {a.name}
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

export default ListGroup;
