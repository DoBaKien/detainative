import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Chat from "../screens/Chat/Chat";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import Friend from "../screens/Friend/Friend";
import Group from "../screens/Group/Group";

function Bottom({ route, navigation }) {
  const id = route.params.id;
  const [screen, setScreen] = useState(
    <Chat id={id} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(202, 90, 90, 0.2) 0%",
          "rgba(234, 101, 91, 0.186603) 41.67%",
          "rgba(50, 193, 185, 0.2) 100%",
          // "transparent",
        ]}
        style={styles.background}
      />
      <Header navigation={navigation} id={id} />
      <View style={styles.body}>
        <View style={{ flex: 1 }}>{screen}</View>
      </View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => setScreen(<Chat id={id} navigation={navigation} />)}
          >
            <Image
              style={styles.imagestyle}
              source={require("./image/chat-icon.png")}
            />
            <Text>Tin nhắn</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              setScreen(<Friend id={id} navigation={navigation} />)
            }
          >
            <Image
              style={styles.imagestyle}
              source={require("./image/friend-icon.png")}
            />
            <Text>Bạn bè</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => setScreen(<Group id={id} navigation={navigation} />)}
          >
            <Image
              style={styles.imagestyle}
              source={require("./image/team-icon.png")}
            />
            <Text>{"  "}Nhóm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  button: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  buttons: {
    backgroundColor: "#96E9DA",
    flexDirection: "row",
    borderRadius: 20,
    margin: 10,
  },
  imagestyle: {
    resizeMode: "contain",
  },
  header: {
    marginTop: 35,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "stretch",
  },
});

export default Bottom;
