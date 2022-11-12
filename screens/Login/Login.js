import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Stack, TextInput, Text } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

function Login({ navigation }) {
  const [sdt, setsdt] = useState("");
  const [mk, setMk] = useState("");

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("id", value);
    } catch (e) {
      console.log(e);
    }
  };
  function callFunctionJs() {
    axios
      .post(`/login`, {
        phoneNumber: "0905515525",
        password: "kien2209",
      })
      .then(function (response) {
        if (response.data === "Sai thong tin dang nhap") {
        } else {
          storeData(response.data);
          navigation.navigate("Chat", {
            id: response.data,
            name: sdt,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(202, 90, 90, 0.2) 0%",
          "rgba(234, 101, 91, 0.186603) 41.67%",
          "rgba(50, 193, 185, 0.2) 100%",
          "transparent",
        ]}
        style={styles.background}
      />
      <View style={styles.form}>
        <Image
          style={styles.tinyLogo}
          source={require("../../component/image/logo.png")}
        />
        <Stack spacing={10}>
          <View style={{ alignItems: "center" }}>
            <Text variant="h3">Đăng nhập</Text>
          </View>
          <TextInput
            placeholder="Số diện thoại *"
            variant="outlined"
            onChangeText={(value) => setsdt(value)}
          />
          <TextInput
            placeholder="Mật khẩu *"
            secureTextEntry
            variant="outlined"
            onChangeText={(value) => setMk(value)}
          />

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.login} onPress={callFunctionJs}>
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forget}>
              <Text style={styles.text1}>Quên mật khẩu</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
              <Text> Bạn chưa có tài khoản? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text style={styles.text1}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Stack>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    textDecorationLine: "underline",
    color: "#1FA19A",
  },
  forget: {
    marginTop: 50,
  },
  login: {
    backgroundColor: "#4ECCC4",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: "50%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "100%",
    justifyContent: "center",
  },
  tinyLogo: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
  },
});

export default Login;
