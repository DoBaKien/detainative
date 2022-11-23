import { Text } from "@react-native-material/core";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../../component/Header";

function Add({ route, navigation }) {
  const id = route.params.id;

  const [user, setUser] = useState("asd");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const handleFind = () => {
    if (number === "") {
      Alert.alert("Cảnh báo", "Vui lòng nhập số điện thoại", [
        { text: "OK", onPress: () => setUser("asd") },
      ]);
    } else {
      axios
        .get(`/findAllBySdt/${number}/${id}`)
        .then(function (response) {
          console.log(response.data);
          setUser(response.data);
          if (response.data.uid !== "nf") {
            axios
              .get(`/checkFStt/${id}/${response.data.uid}`)
              .then(function (response) {
                setType(response.data);
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .then(function (error) {
          console.log(error);
        });
    }
    setNumber("")
  };
  const AddFriend = () => {
    axios
      .post(`/addFriend`, {
        uid1: id,
        uid2: user.uid,
      })
      .then(function (re) {
        Alert.alert(
          "Thành công",
          `Gửi lời mời kết bạn ${user.nickName} thành công `,
          [
            {
              text: "OK",
              onPress: () => {
                setUser("asd");
                navigation.navigate("Chat", { id: id });
              },
            },
          ]
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handle = (uid, value) => {
    navigation.navigate("Profile", {
      id1: uid,
      id: id,
      type: value,
    });
  };
  const UserFind = () => {
    if (user.uid !== "nf" && type === "Stranger" && user !== "asd") {
      return (
        <TouchableOpacity onPress={() => handle(user.uid, "add")}>
          <View style={styles.viewUser}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  user.avatar ||
                  "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
              }}
            />
            <Text variant="h4">{user.nickName}</Text>
            <TouchableOpacity onPress={() => AddFriend()}>
              <Image
                style={styles.logo}
                source={require("../../../component/image/add-icon.png")}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    } else if (
      user.uid !== "nf" &&
      type === "Cancel request" &&
      user !== "asd"
    ) {
      return (
        <TouchableOpacity onPress={() => handle(user.uid, "sent")}>
          <View style={styles.viewUser}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  user.avatar ||
                  "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
              }}
            />
            <Text variant="h4">{user.nickName}</Text>
            <Text variant="subtitle1">Đã gửi</Text>
            <TouchableOpacity onPress={() => RejecttRq()}>
              <Image
                style={styles.logo}
                source={require("../../../component/image/cancel-icon.png")}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    } else if (user.uid !== "nf" && type === "Response" && user !== "asd") {
      return (
        <TouchableOpacity onPress={() => handle(user.uid, "rq")}>
          <View style={styles.viewUser}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  user.avatar ||
                  "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
              }}
            />
            <View>
              <Text variant="h4">{user.nickName}</Text>
              <Text variant="subtitle1">Chờ xác nhận</Text>
            </View>
            <TouchableOpacity onPress={() => RejecttRq()}>
              <Image
                style={styles.logo}
                source={require("../../../component/image/ok-icon.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => RejecttRq()}>
              <Image
                style={styles.logo}
                source={require("../../../component/image/cancel-icon.png")}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    } else if (user.uid !== "nf" && type === "Friend" && user !== "asd") {
      return (
        <TouchableOpacity onPress={() => handle(user.uid, "Friend")}>
          <View style={styles.viewUser}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  user.avatar ||
                  "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
              }}
            />
            <View>
              <Text variant="h4">{user.nickName}</Text>
              <Text variant="subtitle1">Bạn bè</Text>
            </View>
            <TouchableOpacity onPress={() => RejecttRq()}>
              <Image
                style={styles.logo}
                source={require("../../../component/image/chat-icon.png")}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const RejecttRq = () => {
    Alert.alert(
      "Cảnh báo",
      `Bạn có chắc chắn muốn hủy lời mời kết bạn với ${user.nickName}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            axios.delete(`/deleteRequest/${id}/${user.uid}`).then((res) => {
              Alert.alert("Thành công", `Xóa lời mời kết bạn thành công `, [
                {
                  text: "OK",
                  onPress: () => {
                    setUser("asd");
                  },
                },
              ]);
            });
          },
        },
      ]
    );
  };
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
      <View style={{ height: 130, marginTop: 20, alignItems: "center" }}>
        <View flexDirection="row" style={styles.input}>
          <Icon name="search" size={30} color="#C0C0C0" />
          <TextInput
            placeholder="Nhập số điện thoại"
            variant="outlined"
            style={styles.textinput}
            value={number}
            onChangeText={(e) => setNumber(e)}
          />
          <TouchableOpacity onPress={() => handleFind()}>
            <View style={styles.boxbutton}>
              <Text style={{ fontSize: 20, color: "white" }}>Tìm</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.navbar}>
          <TouchableOpacity>
            <View style={[styles.boxnavbar, { backgroundColor: "#87D6E1" }]}>
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

      <View style={{ flex: 3 }}>{UserFind()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewUser: {
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#98E5B7",
    height: 100,
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    borderRadius: 50,
  },
  boxbutton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 10,
    backgroundColor: "#87B4C8",
    borderRadius: 20,
  },
  logo: {
    resizeMode: "contain",
    height: 50,
    width: 50,
  },
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
  textinput: {
    width: "60%",
    marginLeft: 10,
    fontSize: 18,
  },
  input: {
    height: 60,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 20,
    backgroundColor: "white",
    alignItems: "center",
  },

  navbar: {
    height: 50,
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  boxnavbar: {
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

export default Add;
