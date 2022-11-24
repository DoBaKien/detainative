import { Text } from "@react-native-material/core";
import axios from "axios";
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

const ListMess = ({ con, id, user, setMessageList, cid }) => {
  const idMessage = (uid) => {
    let idSend = id;
    return idSend === uid;
  };

  const deleteMess = (uid, msid) => {
    if (idMessage(uid)) {
      Alert.alert(
        "Bạn có chắn chắn muốn xóa",
        "Một khi đã xóa thì KHÔNG THỂ khôi phục",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              axios
                .delete(`/deleteMessage/${msid}`)
                .then(function (response) {
                  Alert.alert("Thành công", "Xóa thành Công", [
                    {
                      text: "OK",
                      onPress: () => {
                        axios
                          .get(`/receive/${cid}`)
                          .then(function (response) {
                            setMessageList(response.data);
                          })
                          .catch(function (error) {
                            console.log("receive" + error);
                          });
                      },
                    },
                  ]);
                })
                .catch(function (error) {
                  console.log(error);
                });
            },
          },
        ]
      );
    } else {
      console.log("asd");
    }
  };

  const test = (content, time, uid, msid) => {
    if (content.length > 1000) {
      return (
        <View>
          <TouchableOpacity
            onLongPress={() => {
              deleteMess(uid, msid);
            }}
            style={{
              width: 200,
              height: 190,
              borderRadius: 20,
              backgroundColor: "pink",
            }}
          >
            <Image
              style={{
                width: 200,
                height: 190,
                resizeMode: "contain",
              }}
              source={{
                uri: content,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text
              variant="caption"
              style={{
                textAlign: idMessage(con.uid) ? "right" : "left",
              }}
            >
              {time}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              deleteMess(uid, msid);
            }}
            style={{
              width: "100%",
              maxWidth: 250,
              backgroundColor: "pink",
              borderRadius: 20,
              padding: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {content}
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              variant="caption"
              style={{
                textAlign: idMessage(con.uid) ? "right" : "left",
              }}
            >
              {time}
            </Text>
          </View>
        </View>
      );
    }
  };
  return (
    <View>
      <View
        style={{
          width: "100%",
          marginBottom: 10,
          flexDirection: idMessage(con.uid) ? "row-reverse" : "row",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            marginLeft: idMessage(con.uid) ? 4 : 0,
            marginRight: idMessage(con.uid) ? 0 : 4,
            marginBottom: 20,
            alignContent: "center",
          }}
        >
          {Array.from(user)
            .filter((word) => word.uid === con.uid)
            .map((number, i) => (
              <Image
                key={i}
                style={styles.tinyLogo}
                source={{
                  uri:
                    number.avatar ||
                    "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
                }}
              />
            ))}
        </View>
        <View>
          {Array.from(user)
            .filter((word) => word.uid === con.uid)
            .map((number, i) => (
              <Text
                key={i}
                component="div"
                style={{
                  textAlign: idMessage(con.uid) ? "right" : "left",
                }}
              >
                {number.nickName}
              </Text>
            ))}
          <View>{test(con.content, con.sentTime, con.uid, con.msid)}</View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 25,
  },
});

export default ListMess;
