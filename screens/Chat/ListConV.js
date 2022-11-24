import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListConV = ({ a, navigation, id }) => {
  const [dir, setDir] = useState("");
  useEffect(() => {
    axios
      .get(`/loadConvMem/${a.cid}`)
      .then(function (response) {
        var results = response.data.filter(function (word) {
          return word.uid !== id;
        });
        setDir(results[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [a.cid]);
  const type = (name, type) => {
    if (type === "direct") {
      return (
        <View style={styles.chip}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                dir.avatar ||
                "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
            }}
          />
          <View>
            <Text style={styles.name}>{dir.nickName}</Text>
            <Text style={styles.message}>{a.type}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.chip}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                a.avatar ||
                "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
            }}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}>{a.type}</Text>
          </View>
        </View>
      );
    }
  };
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
      {type(a.name, a.type)}
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
    padding: 15,
    borderRadius: 20,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
export default ListConV;
