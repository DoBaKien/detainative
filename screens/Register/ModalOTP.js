import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

export const ModalOTP = ({ visible, children }) => {
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
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
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
});
