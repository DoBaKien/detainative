import { Box, Text } from "@react-native-material/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ListConver from "./ListConver";

export const ModalConversation = ({
  visible,
  setVisible,
  cid,
  id,
  content,
}) => {
  const [showModal, setShowModal] = useState(visible);
  const [conV, setConV] = useState(visible);
  useEffect(() => {
    axios
      .get(`/loadUserConv/${id}`)
      .then(function (response) {
        setConV(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          <View style={{ height: 500, width: "100%" }}>
            <FlatList
              data={conV}
              renderItem={(data) => (
                <ListConver a={data.item} id={id} cid={cid} content={content} />
              )}
            />
          </View>
          <Box style={{ alignItems: "center", marginTop: 10 }}>
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
          </Box>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  btn: {
    height: 60,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#B9ECBB",
    justifyContent: "center",
    borderRadius: 20,
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
