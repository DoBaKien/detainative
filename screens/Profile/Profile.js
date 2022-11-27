import { Stack, Text } from "@react-native-material/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import HeaderProfile from "../../component/HeaderProfile";

function Profile({ navigation, route }) {
  const id = route.params.id;
  const idl = route.params.id1;
  const type = route.params.type;

  const AccpetRq = (uid, name) => {
    axios.put(`/acceptRequest/${id}/${uid}`).then((res) => {
      Alert.alert("Thành công", `Thêm bạn ${name} thành công `, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Chat", { id: id });
          },
        },
      ]);
    });
  };

  const RejecttRq = (uid, name) => {
    Alert.alert(
      "Cảnh báo",
      `Bạn có chắc chắn muốn xóa lời mời kết bạn của ${name}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            axios.delete(`/deleteRequest/${id}/${uid}`).then((res) => {
              Alert.alert("Thành công", `Xóa lời mời kết bạn thành công `, [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Chat", { id: id });
                  },
                },
              ]);
            });
          },
        },
      ]
    );
  };
  const friend = () => {
    if (id === idl && type === "asd") {
      return (
        <Stack
          flexDirection="row"
          style={{
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TouchableOpacity style={{ width: "40%" }}>
            <View style={[styles.button, { backgroundColor: "#4ECCC4" }]}>
              <Text
                style={styles.buttontext}
                onPress={() => {
                  navigation.navigate("EditProfile", {
                    id: id,
                  });
                }}
              >
                Chỉnh sửa
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "40%" }}>
            <View style={[styles.button, { backgroundColor: "#E9C8C8" }]}>
              <Text
                style={[
                  styles.buttontext,
                  {
                    color: "#D40707",
                  },
                ]}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        </Stack>
      );
    } else if (type === "friend" && id !== idl) {
      return (
        <TouchableOpacity>
          <View style={[styles.button, { backgroundColor: "#98E5B7" }]}>
            <Text style={[styles.buttontext]}>Nhắn tin</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (type === "sent" && id !== idl) {
      return (
        <TouchableOpacity>
          <View style={[styles.button, { backgroundColor: "#E9C8C8" }]}>
            <Text
              style={[
                styles.buttontext,
                {
                  color: "#D40707",
                },
              ]}
              onPress={() => {
                RejecttRq(user.uid, user.nickName);
              }}
            >
              Hủy lời mời
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (type === "rq" && id !== idl) {
      return (
        <View style={styles.viewRq}>
          <TouchableOpacity>
            <View style={[styles.button, { backgroundColor: "#98E5B7" }]}>
              <Text
                style={styles.buttontext}
                onPress={() => {
                  AccpetRq(user.uid, user.nickName);
                }}
              >
                Chấp nhận
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.button, { backgroundColor: "#E9C8C8" }]}>
              <Text
                style={[
                  styles.buttontext,
                  {
                    color: "#D40707",
                  },
                ]}
                onPress={() => {
                  RejecttRq(user.uid, user.nickName);
                }}
              >
                Hủy lời mời
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (type === "add" && id !== idl) {
      return (
        <TouchableOpacity>
          <View style={[styles.button, { backgroundColor: "#98E5B7" }]}>
            <Text style={styles.buttontext} onPress={() => AddFriend()}>
              Gửi lời mởi kết bạn
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const AddFriend = () => {
    axios
      .post(`/addFriend`, {
        uid1: id,
        uid2: idl,
      })
      .then(function (re) {
        Alert.alert(
          "Thành công",
          `Gửi lời mời kết bạn ${user.nickName} thành công `,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Chat", { id: id }),
            },
          ]
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get(`/getUser/${idl}`)
      .then(function (response) {
        setUser(response.data);
        setDate(format(new Date(response.data.dateOB), "dd-MM-yyyy"));
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
      <HeaderProfile id={id} navigation={navigation} />
      <View
        style={[
          styles.body,
          {
            flex: 1.5,
            marginTop: 20,
          },
        ]}
      >
        <Image
          style={styles.avatar}
          source={{
            uri:
              user.avatar ||
              "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
          }}
        />
        <Text variant="h5" style={{ fontWeight: "bold", marginTop: 20 }}>
          {user.nickName}
        </Text>
      </View>
      <View style={{ flex: 2, flexDirection: "row" }}>
        <View
          style={[
            styles.body2,
            {
              flex: 1,
              alignItems: "flex-end",
            },
          ]}
        >
          <Text style={styles.info}>Họ và tên: </Text>
          <Text style={styles.info}>Ngày sinh: </Text>
          <Text style={styles.info}>Giới tính: </Text>
          <Text style={styles.info}>Điện thoại: </Text>
          <Text style={styles.info}>Email: </Text>
        </View>
        <View
          style={[
            styles.body2,
            {
              flex: 2,
            },
          ]}
        >
          <Text style={styles.info}>
            {user.lastName} {user.firstName}
          </Text>
          <Text style={styles.info}>{date}</Text>
          <Text style={styles.info}>{user.gender}</Text>
          <Text style={styles.info}>{user.phoneNumber}</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.bot}>{friend()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewRq: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  buttontext: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  button: {
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
  },
  bot: {
    height: 100,
    alignItems: "center",
  },
  body2: {
    marginTop: 20,
  },
  info: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  avatar: {
    resizeMode: "contain",
    width: "80%",
    height: "80%",
  },
});

export default Profile;
