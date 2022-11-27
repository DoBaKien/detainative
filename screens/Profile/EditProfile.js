import { Text } from "@react-native-material/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../component/Header";

import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/AntDesign";
import { ModalImg } from "../../component/ModalImg";

function EditProfile({ navigation, route }) {
  const id = route.params.id;
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [datec, setDatec] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datec;
    setShow(Platform.OS === "ios");
    setDatec(currentDate);
    let tempDate = new Date(currentDate);
    let a = "";
    if (tempDate.getMonth() > 8) {
      a = tempDate.getMonth() + 1;
    } else {
      a = "0" + (tempDate.getMonth() + 1);
    }
    let b = "";

    if (tempDate.getDate() > 9) {
      b = tempDate.getDate();
    } else if (tempDate.getMonth() < 10) {
      b = "0" + tempDate.getDate();
    }

    let fDate = tempDate.getFullYear() + "-" + a + "-" + b;
    let fDate2 = b + "-" + a + "-" + tempDate.getFullYear();
    setText(fDate + "T08:39:08.000Z");
    setDate(fDate2);
  };

  useEffect(() => {
    axios
      .get(`/getUser/${id}`)
      .then(function (res) {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setNickName(res.data.nickName);
        setGender(res.data.gender);
        setPhoneNumber(res.data.phoneNumber);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setAvatar(res.data.avatar);
        setDate(format(new Date(res.data.dateOB), "dd-MM-yyyy"));
        setPreview(res.data.dateOB);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleSubmit = () => {
    axios
      .put(`/updateUser/${id}`, {
        uid: id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        nickName: nickName,
        phoneNumber: phoneNumber,
        email: email,
        dateOB: text || preview,
        password: password,
        avatar: avatar,
      })
      .then((res) => {
        Alert.alert("Thành công", "Cập nhật thành công", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Chat", {
                id: id,
              });
            },
          },
        ]);
      });
  };
  const gen = (gens) => {
    if (gens === "Male") {
      return "nam";
    } else {
      return "nữ";
    }
  };

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
      <ModalImg
        visible={visible}
        setVisible={setVisible}
        setAvatar={setAvatar}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={datec}
          mode="date"
          is24Hour="true"
          onChange={onChange}
        />
      )}
      <Header id={id} navigation={navigation} />
      <View
        style={[
          styles.body,
          {
            height: 200,
            marginVertical: 10,
          },
        ]}
      >
        {avatar && (
          <TouchableOpacity
            style={{ flex: 1 }}
            flexDirection="row"
            onPress={() => setVisible(true)}
          >
            <Image
              source={{ uri: avatar }}
              style={{ width: 200, height: "100%", borderRadius: 20 }}
            />
          </TouchableOpacity>
        )}
        {!avatar && (
          <TouchableOpacity
            style={{ width: 150, height: 150 }}
            onPress={() => setVisible(true)}
          >
            <Image
              style={styles.avatar}
              source={{
                uri:
                  avatar ||
                  "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ minHeight: 400, flex: 2 }}>
        <View style={styles.boxinput}>
          <Text style={{ fontSize: 18 }}>Nick name: </Text>
          <TextInput
            placeholder="Nick Name"
            variant="outlined"
            style={[styles.input, { width: "70%" }]}
            value={nickName}
            onChangeText={(e) => setNickName(e)}
          />
        </View>
        <View style={styles.boxinput}>
          <Text style={{ fontSize: 18 }}>Họ : </Text>
          <TextInput
            placeholder="Họ"
            variant="outlined"
            style={[styles.input, { width: "50%" }]}
            value={lastName}
            onChangeText={(e) => setLastName(e)}
          />
          <Text style={{ fontSize: 18, marginLeft: 10 }}>Tên : </Text>
          <TextInput
            placeholder="Tên"
            variant="outlined"
            style={[styles.input, { width: "20%" }]}
            value={firstName}
            onChangeText={(e) => setFirstName(e)}
          />
        </View>

        <View flexDirection="row" style={styles.boxinput}>
          <Text style={{ fontSize: 18 }}>Ngày sinh: </Text>
          <TextInput
            placeholder="Ngày sinh"
            variant="outlined"
            value={date}
            style={[styles.input, { color: "black", width: "50%" }]}
            editable={false}
          />
          <TouchableOpacity onPress={() => setShow(true)}>
            <View style={styles.boxbutton}>
              <Icon name="calendar" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.radioView}>
          <Text style={{ fontSize: 18 }}>Giới tính:</Text>
          <View style={styles.wrapper}>
            {["Male", "Female"].map((feeling) => (
              <View key={feeling} style={styles.radio}>
                <Text style={styles.feeling}>{gen(feeling)}</Text>
                <TouchableOpacity
                  style={styles.outter}
                  onPress={() => setGender(feeling)}
                >
                  {gender === feeling && <View style={styles.inner} />}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.boxinput}>
          <Text style={{ fontSize: 18 }}>Email </Text>
          <TextInput
            placeholder="Email"
            variant="outlined"
            style={[styles.input, { width: "60%" }]}
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.exit, { backgroundColor: "#DD5757" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Thoát</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.exit, { backgroundColor: "#98E5B7" }]}
          onPress={() => handleSubmit()}
        >
          <Text style={{ fontSize: 18 }}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  exit: {
    width: "40%",
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  bottom: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  radioView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  radio: {
    alignItems: "center",
  },
  feeling: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  inner: {
    width: 15,
    height: 15,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  outter: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  buttontext: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
  },
  bot: {
    height: 100,
    alignItems: "center",
  },
  body2: {
    marginTop: 20,
  },
  info: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  avatar: {
    resizeMode: "contain",
    width: 150,
    height: 150,
  },
  boxinput: {
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
  },

  boxbutton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
    backgroundColor: "#87B4C8",
    borderRadius: 20,
  },
  textinput: {
    width: "70%",
    marginLeft: 10,
    fontSize: 18,
  },
});

export default EditProfile;
