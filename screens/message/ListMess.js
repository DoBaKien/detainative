import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ListMess = ({ con, id, user }) => {
  const checkName = (name) => {
    let a = name.nickName;
    return a;
  };
  const idMessage = (uid) => {
    let idSend = id;
    return idSend === uid;
  };
  const checkAvatar = (name) => {
    let a = name.avatar;
    return a;
  };
  const test = (content) => {
    if (content.length > 1000) {
      return (
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 20,
            backgroundColor: "pink",
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain",
            }}
            source={{
              uri: content,
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: "100%",
            maxWidth: 250,
            backgroundColor: "pink",
            borderRadius: 20,
            padding: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>{content}</Text>
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
                    checkAvatar(number) ||
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
                {checkName(number)}
              </Text>
            ))}
          <View>{test(con.content)}</View>
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
