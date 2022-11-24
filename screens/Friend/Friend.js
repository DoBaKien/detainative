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

import ListFriend from "./ListFriend";

function Friend({ id, navigation }) {
  const [friends, setFriends] = useState("");
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  useEffect(() => {
    axios
      .get(`/findUserFriends/${id}`)
      .then(function (response) {
        setFriends(response.data.filter(ser));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [search, isFocused]);

  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.nickName.toLowerCase().includes(search.toLowerCase())) {
      return val;
    } else if (val.phoneNumber.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ height: 130 }}>
        <View style={styles.boxinput}>
          <TextInput
            placeholder="Tìm kiếm"
            variant="outlined"
            style={styles.input}
            onChangeText={(e) => setSearch(e)}
          />
        </View>
        <View style={styles.navbar}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Add", {
                id: id,
              });
            }}
          >
            <View style={styles.boxnavbar}>
              <Text variant="body1">Thêm bạn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Request", {
                id: id,
              });
            }}
          >
            <View style={styles.boxnavbar2}>
              <Text variant="body1">Chờ phản hồi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Sent", {
                id: id,
              });
            }}
          >
            <View style={styles.boxnavbar2}>
              <Text variant="body1">Đã gửi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <FlatList
          data={friends}
          renderItem={(data) => (
            <ListFriend a={data.item} navigation={navigation} id={id} />
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
    width: "75%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
  },
  iconsearch: {
    marginLeft: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
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
    padding: 10,
    borderRadius: 20,
  },
  boxnavbar2: {
    backgroundColor: "#96E9DA",
    padding: 10,
    borderRadius: 20,
    marginLeft: 20,
  },
});

export default Friend;
