import { Box, HStack, Text, VStack } from "@react-native-material/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ModalConversation } from "./ModalConversation";

export const ModalMessage = ({
  visible,
  setVisible,
  cid,
  id,
  uid,
  msid,
  content,
}) => {
  const [showModal, setShowModal] = useState(visible);
  const [visi, setVisi] = useState(false);
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
      Alert.alert("Cảnh báo", "Không xóa tin nhắn của ngưới khác", [
        { text: "OK" },
      ]);
    }
  };

  useEffect(() => {
    toggle();
  }, [visible]);
  const toggle = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const type = () => {
    if (content.length > 1000) {
      return (
        <View style={{ alignItems: "center" }}>
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
        </View>
      );
    } else {
      return (
        <View style={{ borderWidth: 1, padding: 10 }}>
          <Text>{content}</Text>
        </View>
      );
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <ModalConversation
        visible={visi}
        setVisible={setVisi}
        cid={cid}
        id={id}
        content={content}
      />
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          {type()}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => deleteMess(uid, msid)}
          >
            <Text>Xóa tin nhắn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => setVisi(true)}>
            <Text>Chuyển tiếp</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={[
                styles.otpbutton,
                {
                  backgroundColor: "#DD5757",
                },
              ]}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text color="white">Thoát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  btn: {
    height: 60,

    padding: 10,
    backgroundColor: "#B9ECBB",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  modalBg: {
    height: 800,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  otpbutton: {
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: "40%",
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
    width: "90%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
  },
});
