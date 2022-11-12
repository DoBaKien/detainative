import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListConV = ({ a, navigation, id }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("Message", {
          cid: a.cid,
          id: id,
        });
      }}
    >
      <View style={styles.chip}>
        <Image
          style={styles.tinyLogo}
          source={require("../../component/image/user-icon.png")}
        />
        <View>
          <Text style={styles.name}>{a.name}</Text>
          <Text style={styles.message}>{a.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    marginLeft: 10,
    color: "gray",
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 10,
  },
  chip: {
    backgroundColor: "#87D6E1",
    flexDirection: "row",
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
export default ListConV;
