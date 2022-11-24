import { HStack, Text, VStack } from "@react-native-material/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const ModalChangeName = ({
  visible,
  setVisible,
  cid,
  id,
  navigation,
}) => {
  const [showModal, setShowModal] = useState(visible);
  const [name, setName] = useState("");
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

  const handleChange = () => {
    axios
      .put(`/updateConvName/${cid}/${name}`)
      .then(function (response) {
        Alert.alert("Chỉnh sửa", "Thành công", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("Chat", {
                id: id,
              }),
          },
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowModal(false);
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          <View style={styles.boxinput}>
            <TextInput
              placeholder="Name Conversation"
              variant="outlined"
              style={styles.input}
              onChangeText={(e) => setName(e)}
            />
          </View>
          <HStack
            style={{
              alignItems: "center",
              marginTop: 10,
              justifyContent: "space-between",
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
            <TouchableOpacity
              style={[
                styles.otpbutton,
                {
                  backgroundColor: "#B9ECBB",
                },
              ]}
              onPress={() => {
                handleChange();
              }}
            >
              <Text color="white">Chỉnh sửa</Text>
            </TouchableOpacity>
          </HStack>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
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
