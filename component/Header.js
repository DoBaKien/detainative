import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
function Header({ navigation, id }) {
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setValue(value);
    });
  }, []);
  const [value, setValue] = useState("");

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon
          name="arrow-back-circle-sharp"
          size={40}
          style={styles.imagestyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat", {
            id: id,
          });
        }}
      >
        <Image style={styles.logo} source={require("./image/logo.png")} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile", {
            id: id,
            id1: value,
            type: "asd",
          });
        }}
      >
        <Image
          style={styles.imagestyle}
          source={require("./image/user-icon.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  imagestyle: {
    resizeMode: "contain",
    marginTop: 8,
  },
  header: {
    marginTop: 30,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
});

export default Header;
