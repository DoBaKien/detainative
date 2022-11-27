import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-native-material/core";
import axios from "axios";
import { useEffect, useState } from "react";

import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

function ListRq({ a, id, setFriendRq, navigation }) {
  const AccpetRq = (uid, name) => {
    axios.put(`/acceptRequest/${id}/${uid}`).then((res) => {
      Alert.alert("Thành công", `Thêm bạn ${name} thành công `, [
        {
          text: "OK",
          onPress: () => {
            axios
              .get(`/findPendingRequests/${id}`)
              .then(function (response) {
                setFriendRq(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
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
                    axios
                      .get(`/findPendingRequests/${id}`)
                      .then(function (response) {
                        setFriendRq(response.data);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  },
                },
              ]);
            });
          },
        },
      ]
    );
  };
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setValue(value);
    });
  }, []);
  const [value, setValue] = useState("");
  const handle = (uid) => {
    navigation.navigate("Profile", {
      id1: uid,
      id: value,
      type: "rq",
    });
  };
  return (
    <TouchableOpacity onPress={() => handle(a.uid)}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri:
              a.avatar ||
              "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
          }}
        />
        <Text variant="h5" numberOfLines={1} style={{ width: "45%" }}>
          {a.nickName}
        </Text>

        <TouchableOpacity
          onPress={() => {
            AccpetRq(a.uid, a.nickName);
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={require("../../../component/image/ok-icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            RejecttRq(a.uid, a.nickName);
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={require("../../../component/image/cancel-icon.png")}
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

export default ListRq;
