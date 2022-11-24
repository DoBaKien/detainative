import { Text } from "@react-native-material/core";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
export const ModalImg = ({ visible, setVisible, setAvatar }) => {
  const [showModal, setShowModal] = useState(visible);

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
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.2,
      base64: true,
    });
    if (!result.cancelled) {
      setAvatar("data:image/jpeg;base64," + result.base64);
    }
    setVisible(false);
  };
  const pickImageCam = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });
    if (!result.cancelled) {
      setAvatar("data:image/jpeg;base64," + result.base64);
    }
    setVisible(false);
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          <View style={styles.option}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#87D6E1",
                },
              ]}
              onPress={() => {
                pickImageCam(false);
              }}
            >
              <Text style={{ fontSize: 20 }}>Mở camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#87D6E1",
                },
              ]}
              onPress={() => {
                pickImage();
              }}
            >
              <Text style={{ fontSize: 20 }}>Mở thư viện</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
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
  option: {
    marginBottom: 5,
  },
  button: {
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
    marginBottom: 10,
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
});
