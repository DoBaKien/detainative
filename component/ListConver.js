import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ListConver = ({ a, id, content, cid }) => {
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

  const share = (cid) => {
    axios
      .post(`/send`, {
        cid: cid,
        content: content,
        uid: id,
      })
      .then(function (response) {
        Alert.alert("Thành công", "Chuyển tiếp thành công");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        share(a.cid);
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
    width: 50,
    height: 50,
    borderRadius: 20,
  },
});
export default ListConver;
