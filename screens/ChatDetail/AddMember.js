import { Text } from "@react-native-material/core";
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
import { MultipleSelectList } from "react-native-dropdown-select-list";

export const AddMember = ({ visible, setVisible, id, cid }) => {
  const [showModal, setShowModal] = useState(visible);
  const [friends1, setFriends1] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/loadFriendsToAddConv/${id}/${cid}`)
      .then(function (response) {
        let newArray = response.data.map((item) => {
          return { key: item.uid, value: item.nickName };
        });
        setFriends1(newArray);
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

  const handleadd = () => {
    axios
      .post(`/newMems/${cid}`, categories)
      .then(function (response) {
        Alert.alert("Thành công", `Thêm thành viên thành công`, [
          {
            text: "OK",
            onPress: () => {
              setVisible(false);
            },
          },
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          <View style={styles.list}>
            <MultipleSelectList
              setSelected={(val) => setCategories(val)}
              data={friends1}
              save="key"
              label="Categories"
              notFoundText="Not found user"
              placeholder="Search friend"
              maxHeight={300}
              searchPlaceholder="Find your friend"
              boxStyles={{ marginTop: 25, fontSize: 30 }}
              badgeStyles={{ fontSize: 20, backgroundColor: "#98E5B7" }}
              dropdownTextStyles={{ fontSize: 20 }}
              badgeTextStyles={{ fontSize: 15, color: "black" }}
            />
          </View>

          <View flexDirection="row" style={{ justifyContent: "space-between" }}>
            <TouchableOpacity
              style={[
                styles.otpbutton,
                {
                  backgroundColor: "#DD5757",
                },
              ]}
              onPress={() => {
                setVisible(false);
                setCategories("");
              }}
            >
              <Text color="white">Thoát</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.otpbutton,
                {
                  backgroundColor: "#87D6E1",
                },
              ]}
              onPress={() => {
                handleadd();
              }}
            >
              <Text>Thêm</Text>
            </TouchableOpacity>
          </View>
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
    width: "80%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
  },
  list: {
    height: 400,
  },
});
