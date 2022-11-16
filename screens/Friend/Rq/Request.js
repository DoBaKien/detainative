import { Text } from "@react-native-material/core";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Header from "../../../component/Header";

import ListRq from "./ListRq";

function Request({ route, navigation }) {
  const id = route.params.id;
  const [friendRq, setFriendRq] = useState("");
  const [search, setSearch] = useState("");

  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.nickName.toLowerCase().includes(search.toLowerCase())) {
      return val;
    } else if (val.phoneNumber.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };
  useEffect(() => {
    axios
      .get(`/findPendingRequests/${id}`)
      .then(function (response) {
        setFriendRq(response.data.filter(ser));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [search]);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(202, 90, 90, 0.2) 0%",
          "rgba(234, 101, 91, 0.186603) 41.67%",
          "rgba(50, 193, 185, 0.2) 100%",
          "transparent",
        ]}
        style={styles.background}
      />
      <Header navigation={navigation} id={id} />
      <View style={{ height: 130, marginTop: 20 }}>
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
            <View style={[styles.boxnavbar2, { backgroundColor: "#96E9DA" }]}>
              <Text variant="body1">Thêm bạn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.boxnavbar2, { backgroundColor: "#87D6E1" }]}>
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
            <View style={[styles.boxnavbar2, { backgroundColor: "#96E9DA" }]}>
              <Text variant="body1">Đã gửi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <FlatList
          data={friendRq}
          renderItem={(data) => (
            <ListRq
              a={data.item}
              navigation={navigation}
              id={id}
              setFriendRq={setFriendRq}
            />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
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

  navbar: {
    height: 50,
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  boxnavbar: {
    backgroundColor: "##96E9DA",
    padding: 10,
    borderRadius: 20,
  },
  boxnavbar2: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 20,
  },
});

export default Request;
