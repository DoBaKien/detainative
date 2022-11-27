import { Text } from "@react-native-material/core";
import axios from "axios";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ModalMessage } from "../../component/ModalMessage";

const ListMess = ({ con, id, user, setMessageList, cid }) => {
  const [visible, setVisible] = useState(false);
  const idMessage = (uid) => {
    let idSend = id;
    return idSend === uid;
  };

  const test = (content, time) => {
    if (content.length > 1000) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
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
              setVisible(true);
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
      <ModalMessage
        visible={visible}
        setVisible={setVisible}
        content={con.content}
        cid={cid}
        id={id}
        msid={con.msid}
        uid={con.uid}
      />
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
          <View>{test(con.content, con.sentTime)}</View>
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
