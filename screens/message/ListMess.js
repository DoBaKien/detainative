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

 
  const test = (content) => {
    if (content.length > 1000) {
      return (
        <Image
          style={{
            width: 250,
            height: 200,
            resizeMode: "contain",
          }}
          source={{
            uri: content,
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            width: "100%",
            maxWidth: 250,
            backgroundColor: "#e693f9",
            borderRadius: 20,
            padding: 5,
          }}
        >
          <Text style={{ textAlign: "center" }}>
            <Text>{content}</Text>
          </Text>
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
          alignItems: idMessage(con.uid) ? "flex-end" : "flex-start",
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../../component/image/user-icon.png")}
        />
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
  },
  logo: {
    resizeMode: "stretch",
    width: 66,
    height: 58,
  },
});

export default ListMess;
