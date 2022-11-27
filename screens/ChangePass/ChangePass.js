import { Stack, Text } from "@react-native-material/core";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../component/Header";
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const ChangePass = ({ navigation, route }) => {
  const [sdt, setSdt] = useState("");
  const [mkCu, setMkCu] = useState("");
  const [mkMoi, setMkMoi] = useState("");
  const [errorPass, setErrorPass] = useState("none");
  const id = route.params.id;
  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setMkMoi(e);
    } else {
      setMkMoi("");
    }
  };

  const handleChange = () => {
    if (sdt !== "" && mkCu !== "" && mkMoi !== "" && mkCu !== mkMoi) {
      axios
        .post("/login", {
          phoneNumber: sdt,
          password: mkCu,
        })
        .then(function (response) {
          if (response.data === "Sai thong tin dang nhap") {
            console.log("asd");
          } else {
            console.log(response.data);
            axios
              .put(`/updatePassword/${response.data}`, {
                password: mkMoi,
              })
              .then(function (response) {
                Alert.alert(
                  "Yêu cầu",
                  "Vui lòng nhập mật khẩu mới không trùng mật khẩu cũ"
                );
                navigation.navigate("Login");
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (mkMoi === mkCu) {
      Alert.alert(
        "Yêu cầu",
        "Vui lòng nhập mật khẩu mới không trùng mật khẩu cũ"
      );
      console.log(mkMoi);
      console.log(mkCu);
    } else {
      setErrorPass("flex");
      Alert.alert("Yêu cầu", "Vui lòng nhập đầy đủ thông tin và định dạng");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          "rgba(202, 90, 90, 0.2) 0%",
          "rgba(234, 101, 91, 0.186603) 41.67%",
          "rgba(50, 193, 185, 0.2) 100%",
          "transparent",
        ]}
        style={styles.background}
      />
      <Header navigation={navigation} id={id} />
      <View style={styles.form}>
        <Stack spacing={20}>
          <View style={{ alignItems: "center" }}>
            <Text variant="h3">Đổi mật khẩu</Text>
          </View>
          <TextInput
            placeholder="Số diện thoại *"
            keyboardType="number-pad"
            variant="outlined"
            style={styles.input}
            onChangeText={(e) => setSdt(e)}
          />
          <TextInput
            placeholder="Mật khẩu cũ *"
            style={styles.input}
            variant="outlined"
            secureTextEntry
            onChangeText={(e) => setMkCu(e)}
          />
          <TextInput
            placeholder="Mật khẩu mới *"
            style={styles.input}
            variant="outlined"
            secureTextEntry
            onChangeText={(e) => handleChanglePassword(e)}
          />
          <View
            style={{
              display: errorPass,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text style={{ color: "red" }}>
              Mật khẩu phải có tối thiểu tám ký tự, ít nhất một chữ cái viết
              hoa, một chữ cái viết thường và một số
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.register}
              onPress={() => handleChange()}
            >
              <Text>Đổi</Text>
            </TouchableOpacity>
          </View>
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  input: {
    height: 60,
    width: "100%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 18,
    paddingLeft: 20,
    backgroundColor: "white",
  },
  form: {
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  register: {
    backgroundColor: "#4ECCC4",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: "50%",
  },
});

export default ChangePass;
