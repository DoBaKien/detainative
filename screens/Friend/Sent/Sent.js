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

import ListSent from "./ListSent";

function Sent({ route, navigation }) {
  const id = route.params.id;
  const [friendSent, setFriendSent] = useState("");

  useEffect(() => {
    axios
      .get(`/findSentRequests/${id}`)
      .then(function (response) {
        setFriendSent(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
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
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={styles.boxinput}>
          <TextInput
            placeholder="Tìm kiếm"
            variant="outlined"
            style={styles.input}
          />
          <Icon
            name="search1"
            color="#000"
            size={40}
            style={styles.iconsearch}
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
          <TouchableOpacity>
            <View style={styles.boxnavbar2}>
              <Text
                variant="body1"
                onPress={() => {
                  navigation.navigate("Request", {
                    id: id,
                  });
                }}
              >
                Chờ phản hồi
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxnavbar2}>
              <Text variant="body1">Đã gửi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <FlatList
          data={friendSent}
          renderItem={(data) => (
            <ListSent
              a={data.item}
              navigation={navigation}
              id={id}
              setFriendSent={setFriendSent}
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
  iconsearch: {
    marginLeft: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
  navbar: {
    height: 50,
    marginLeft: 20,
    alignItems: "center",
    flexDirection: "row",
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

export default Sent;
