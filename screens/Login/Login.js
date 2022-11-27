import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Stack, Text } from "@react-native-material/core";
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
    if (sdt === "" || mk === "") {
      Alert.alert("Yêu cầu", "Vui lòng nhập đầy đủ thông tin", [
        { text: "OK" },
      ]);
    } else {
      axios
        .post(`/login`, {
          phoneNumber: sdt,
          password: mk,
        })
        .then(function (response) {
          if (response.data === "Sai thong tin dang nhap") {
            Alert.alert(
              "Cảnh báo",
              "Vui lòng kiểm tra số điện thoại hoặc mật khấu",
              [{ text: "OK" }]
            );
          } else {
            storeData(response.data);
            navigation.navigate("Chat", {
              id: response.data,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
        <Stack spacing={30}>
          <View style={{ alignItems: "center" }}>
            <Text variant="h3">Đăng nhập</Text>
          </View>
          <View flexDirection="row" style={styles.input}>
            <Icon name="user-alt" size={30} color="#C0C0C0" />
            <TextInput
              placeholder="Số diện thoại *"
              variant="outlined"
              keyboardType="number-pad"
              style={styles.textinput}
              onChangeText={(value) => setsdt(value)}
            />
          </View>
          <View flexDirection="row" style={styles.input}>
            <Icon name="key" size={30} color="#C0C0C0" />
            <TextInput
              placeholder="Mật khẩu *"
              secureTextEntry
              variant="outlined"
              style={styles.textinput}
              onChangeText={(value) => setMk(value)}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.login} onPress={callFunctionJs}>
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forget}>
              <View flexDirection="row" style={{ alignItems: "center" }}>
                <Image
                  style={{ width: 25, height: 25, resizeMode: "contain" }}
                  source={require("../../component/image/fpass-icon.png")}
                />
                <Text style={styles.text1}>Quên mật khẩu</Text>
              </View>
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
  textinput: {
    width: "100%",
    marginLeft: 10,
    fontSize: 20,
  },
  input: {
    height: 60,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 20,
    backgroundColor: "white",
    alignItems: "center",
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
    padding: 20,
    paddingTop: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },

  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    resizeMode: "contain",
    width: "100%",
    marginBottom: 20,
    height: 120,
  },
});

export default Login;
