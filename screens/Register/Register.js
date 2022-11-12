import { Button, Stack, Text, TextInput } from "@react-native-material/core";
import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

function Register({ navigation }) {
  const [sdt, setsdt] = useState("");
  const [mk, setMk] = useState("");
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");

  const createTwoButtonAlert = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Image
          style={styles.tinyLogo}
          source={require("../../component/image/logo.png")}
        />
        <Stack spacing={10}>
          <View style={{ alignItems: "center" }}>
            <Text variant="h3">Register</Text>
          </View>
          <TextInput
            placeholder="Họ"
            variant="outlined"
            onChangeText={(value) => setHo(value)}
          />
          <TextInput
            placeholder="Tên"
            variant="outlined"
            onChangeText={(value) => setTen(value)}
          />
          <TextInput
            placeholder="Số diện thoại *"
            variant="outlined"
            onChangeText={(value) => setsdt(value)}
          />
          <TextInput
            placeholder="Mật khẩu *"
            variant="outlined"
            onChangeText={(value) => setMk(value)}
            secureTextEntry
          />

          <Button title="Sign Up" onPress={createTwoButtonAlert} />

          <Button
            title="Log in"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
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

export default Register;
