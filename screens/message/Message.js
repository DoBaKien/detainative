import { Text } from "@react-native-material/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ListMess from "./ListMess";
import { io } from "socket.io-client";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { ModalChat } from "../../component/ModalChat";

const socket = io.connect("https://chat-app-provip.herokuapp.com");

function Message({ route, navigation }) {
  const id = route.params.id;
  const cid = route.params.cid;

  const [currentMessage, setCurrentMessage] = useState("");
  const [user, setUser] = useState("");
  const [conv, setConv] = useState("");
  const scrollViewRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [messImg, setMessImg] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    socket.emit("join_room", cid);
    axios
      .get(`/receive/${cid}`)
      .then(function (response) {
        setMessageList(response.data);
        var result = response.data.filter(function (word) {
          return word.content.length > 1000;
        });
        setMessImg(result);
      })
      .catch(function (error) {
        console.log("receive" + error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/loadConvMem/${cid}`)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log("loadConvMem" + error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/loadConv/${cid}`)
      .then(function (response) {
        setConv(response.data);
      })
      .catch(function (error) {
        console.log("loadConvMem" + error);
      });
  }, []);
  const handle = async (e) => {
    if (currentMessage !== "") {
      axios
        .post(`/send`, {
          cid: cid,
          content: currentMessage,
          uid: id,
        })
        .catch(function (error) {
          console.log(error);
        });
      const messageData = {
        room: cid,
        uid: id,
        content: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      setMessageList((list) => [...list, messageData]);

      await socket.emit("send_message", messageData);
    }
    setCurrentMessage("");
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const leaveroom = () => {
    socket.emit("ic_leave", cid);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(202, 90, 90, 0.2) 0%",
          "rgba(234, 101, 91, 0.186603) 41.67%",
          "rgba(50, 193, 185, 0.2) 100%",
        ]}
        style={styles.background}
      />
      <ModalChat
        visible={visible}
        setVisible={setVisible}
        setCurrentMessage={setCurrentMessage}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={leaveroom}>
          <Image
            style={styles.tinyLogo}
            source={require("../../component/image/back-icon.png")}
          />
        </TouchableOpacity>
        <Text variant="h5">{conv.name}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChatDetail", {
              cid: cid,
              id: id,
              messImg: messImg,
              user: user,
            })
          }
        >
          <Image
            style={styles.tinyLogo}
            source={require("../../component/image/info-icon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          data={messageList}
          renderItem={(data) => (
            <ListMess con={data.item} id={id} user={user} />
          )}
          style={styles.list}
        />
      </View>
      <View style={styles.input}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            style={styles.tinyLogo}
            source={require("../../component/image/image-icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.tinyLogo}
            source={require("../../component/image/emoji-icon.png")}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Nhập tin nhắn"
          style={styles.inputtext}
          value={currentMessage}
          onChangeText={(value) => setCurrentMessage(value)}
        />
        <TouchableOpacity onPress={handle}>
          <Image
            style={styles.tinyLogo}
            source={require("../../component/image/send-icon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputtext: {
    borderWidth: 1,
    width: "60%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    height: 50,
    marginTop: 30,
    backgroundColor: "#96E9DA",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
  },
  input: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  list: {
    fontSize: 20,

    height: 600,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Message;
