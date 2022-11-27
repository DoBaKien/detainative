import { Stack, Text } from "@react-native-material/core";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
var regUserName = /^[0-9]{9,10}$/;
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

import { ModalOTP } from "./ModalOTP";
function Register({ navigation }) {
  const [sdt, setsdt] = useState("");
  const [mk, setMk] = useState("");
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");
  const [visible, setVisible] = useState(false);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixInput = useRef();
  const [otp, setOtp] = useState({ a: "", b: "", c: "", d: "", e: "", f: "" });
  const [errorPass, setErrorPass] = useState("none");
  const handleSignUp = () => {
    if (sdt !== "" && mk !== "" && ho !== "" && ten !== "") {
      axios
        .post("/register", {
          phoneNumber: sdt,
        })
        .then(function (re) {
          console.log(re.data);
          if (re.data === "Phone number already in use") {
            Alert.alert("Cảnh báo", "Số điện thoại đã dược đăng ký", [
              { text: "OK" },
            ]);
          } else {
            setVisible(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Alert.alert("Yêu cầu", "Vui lòng nhập đầy đủ thông tin", [
        { text: "OK" },
      ]);
      setErrorPass("flex");
    }
  };
  const handleOTP = (e) => {
    axios
      .post(`/register/${e}`, {
        firstName: ten,
        lastName: ho,
        phoneNumber: sdt,
        password: mk,
        gender: "Male",
        nickName: `${ho} ${ten}`,
      })
      .then(function (response) {
        callFunctionJs();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleChangleUserName = (e) => {
    if (regUserName.test(e)) {
      setsdt(e);
    } else {
      setsdt("");
    }
  };

  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setMk(e);
    } else {
      setMk("");
    }
  };

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
        phoneNumber: sdt,
        password: mk,
      })
      .then(function (response) {
        storeData(response.data);
        navigation.navigate("Chat", {
          id: response.data,
        });
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
      <ModalOTP visible={visible}>
        <Text>Nhập mã OTP đã gửi về số điện thoại +84 {sdt.slice(1)}</Text>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={(text) => {
                setOtp({ ...otp, a: text });
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              ref={secondInput}
              maxLength={1}
              onChangeText={(text) => {
                setOtp({ ...otp, b: text });
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={(text) => {
                setOtp({ ...otp, c: text });
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={(text) => {
                setOtp({ ...otp, d: text });
                text ? fifthInput.current.focus() : thirdInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fifthInput}
              onChangeText={(text) => {
                setOtp({ ...otp, e: text });
                text ? sixInput.current.focus() : fourthInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={sixInput}
              onChangeText={(text) => {
                setOtp({ ...otp, f: text });
                !text && fifthInput.current.focus();
              }}
            />
          </View>
        </View>
        <View style={styles.otptext}>
          <TouchableOpacity
            style={[
              styles.otpbutton,
              {
                backgroundColor: "#DD5757",
              },
            ]}
            onPress={() => setVisible(false)}
          >
            <Text color="white">Thoát</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.otpbutton,
              {
                backgroundColor: "#4ECCC4",
              },
            ]}
            onPress={() =>
              handleOTP(otp.a + otp.b + otp.c + otp.d + otp.e + otp.f)
            }
          >
            <Text>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </ModalOTP>
      <View style={styles.form}>
        <Image
          style={styles.tinyLogo}
          source={require("../../component/image/logo.png")}
        />
        <Stack spacing={20}>
          <View style={{ alignItems: "center" }}>
            <Text variant="h3">Đăng ký</Text>
          </View>
          <TextInput
            placeholder="Họ *"
            variant="outlined"
            style={styles.input}
            onChangeText={(value) => setHo(value)}
          />
          <TextInput
            placeholder="Tên *"
            variant="outlined"
            style={styles.input}
            onChangeText={(value) => setTen(value)}
          />
          <TextInput
            placeholder="Số diện thoại *"
            keyboardType="number-pad"
            variant="outlined"
            style={styles.input}
            onChangeText={(value) => handleChangleUserName(value)}
          />
          <TextInput
            placeholder="Mật khẩu *"
            style={styles.input}
            variant="outlined"
            onChangeText={(value) => handleChanglePassword(value)}
            secureTextEntry
          />
          <View style={{ display: errorPass }}>
            <Text>
              Mật khẩu phải có tối thiểu tám ký tự, ít nhất một chữ cái viết
              hoa, một chữ cái viết thường và một số
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.register}
              onPress={() => handleSignUp()}
            >
              <Text>Đăng Ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.login}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text>Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </Stack>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
  },
  otptext: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  login: {
    backgroundColor: "#4ECCC4",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: "60%",
    minWidth: 200,
    marginTop: 20,
  },
  register: {
    backgroundColor: "#4ECCC4",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: "50%",
  },
  otpbutton: {
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: "40%",
  },
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
  },
  tinyLogo: {
    resizeMode: "contain",
    width: "100%",
    height: 120,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 20,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Register;
