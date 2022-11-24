import { Text } from "@react-native-material/core";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AddGroup } from "./AddGroup";

import ListGroup from "./ListGroup";
function Group({ id, navigation }) {
  const [groups, setGroups] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };
  useEffect(() => {
    axios
      .get(`/loadUserConv/${id}`)
      .then(function (response) {
        var result = response.data.filter(function (word) {
          return word.type === "group";
        });
        setGroups(result.filter(ser).sort((a, b) => a.cid - b.cid));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [search, isFocused]);
  return (
    <View style={styles.container}>
      <AddGroup visible={visible} setVisible={setVisible} id={id} />
      <View style={{ height: 130 }}>
        <View style={styles.boxinput}>
          <TextInput
            placeholder="Nhập tên nhóm"
            variant="outlined"
            style={styles.input}
            onChangeText={(e) => setSearch(e)}
          />
        </View>
        <View style={styles.navbar}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
          >
            <View style={styles.boxnavbar}>
              <Icon name="add-circle" size={30} />
              <Text variant="body1">Tạo nhóm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <FlatList
          data={groups}
          renderItem={(data) => (
            <ListGroup a={data.item} navigation={navigation} id={id} />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
  },
  navbar: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },

  boxnavbar: {
    backgroundColor: "#96E9DA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  boxinput: {
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  input: {
    height: 60,
    width: "80%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
  },
});

export default Group;
