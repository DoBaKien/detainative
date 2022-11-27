import { Text } from "@react-native-material/core";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ModalChangeName } from "../../component/ModalChangeName";
import { AddMember } from "./AddMember";
import ListImage from "./ListImage";

import ListMember from "./ListMember";

function ChatDetail({ route, navigation }) {
  const cid = route.params.cid;

  const id = route.params.id;

  var mems = route.params.user.filter(function (word) {
    return word.uid !== id;
  });

  const messImg = route.params.messImg;
  const [members, setMembers] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    axios
      .get(`/loadConvRoleMem/${cid}`)
      .then(function (response) {
        setMembers(response.data);
      })
      .catch(function (error) {
        console.log("loadConvMem" + error);
      });
  }, [visible, isFocused]);

  const [conv, setConv] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    axios
      .get(`loadConv/${cid}`)
      .then(function (response) {
        setConv(response.data);
      })
      .catch(function (error) {
        console.log("loadConvMem" + error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/getUserRole/${id}/${cid}`)
      .then(function (response) {
        setRole(response.data);
      })
      .catch(function (error) {
        console.log("getUserRole" + error);
      });
  }, []);

  const Listimg = () => {
    return (
      <FlatList
        horizontal={true}
        data={messImg}
        keyExtractor={(item) => item.msid}
        renderItem={(data) => (
          <ListImage a={data.item} navigation={navigation} />
        )}
      />
    );
  };

  const handeLeave = () => {
    Alert.alert("Cảnh báo", "Rời khỏi nhóm sẽ mất toàn bộ tin nhắn", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          axios.delete(`/leaveGroup/${id}/${cid}`).then(function (response) {
            Alert.alert("Thành công", "Xóa thành công", [
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
        },
      },
    ]);
  };
  const handleDelete = () => {
    Alert.alert(
      "Giải tán nhóm",
      "Mời tất cả mọi người rời nhóm và xóa tin nhắn? Nhóm đã giải tán sẽ KHÔNG THỂ khôi phục",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            axios.delete(`/deleteGroup/${cid}`).then(function (response) {
              Alert.alert("Thành công", "Xóa thành công", [
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
          },
        },
      ]
    );
  };

  const navbarView = () => {
    if (role === "Owner") {
      return (
        <View style={styles.navbar}>
          <View style={styles.icontext}>
            <TouchableOpacity>
              <Image
                style={styles.tinyLogo}
                source={require("../../component/image/phone-icon.png")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>Gọi điện</Text>
          </View>
          <View style={styles.icontext}>
            <TouchableOpacity>
              <Image
                style={styles.tinyLogo}
                source={require("../../component/image/video-icon.png")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>Cuộc gọi video</Text>
          </View>

          <View style={styles.icontext}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
            >
              <Image
                style={styles.tinyLogo}
                source={require("../../component/image/add-icon.png")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }} numberOfLines={1}>
              Thêm thành viên
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.navbar}>
          <View style={styles.icontext}>
            <TouchableOpacity>
              <Image
                style={styles.tinyLogo}
                source={require("../../component/image/phone-icon.png")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>Gọi điện</Text>
          </View>
          <View style={styles.icontext}>
            <TouchableOpacity>
              <Image
                style={styles.tinyLogo}
                source={require("../../component/image/video-icon.png")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>Cuộc gọi video</Text>
          </View>
        </View>
      );
    }
  };
  const type = () => {
    if (conv.type === "group" && role === "Owner") {
      return (
        <View style={styles.body}>
          {navbarView()}
          <View style={{ height: 40, zIndex: 2 }}>
            <Text variant="h6" style={{ textAlign: "center" }}>
              Thành viên nhóm
            </Text>
          </View>
          <View style={styles.list}>
            <FlatList
              data={members}
              keyExtractor={(item) => item.uid}
              renderItem={(data) => (
                <ListMember
                  cid={cid}
                  id={id}
                  a={data.item}
                  navigation={navigation}
                  role={role}
                  setMembers={setMembers}
                />
              )}
            />
          </View>
          <View style={{ height: 150, zIndex: 2 }}>
            <Text variant="h6">Hình đã gửi</Text>
            {Listimg()}
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.buttontext, { backgroundColor: "#DD5757" }]}
            >
              <Text style={{ color: "white" }}>Giải tán nhóm</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (conv.type === "group" && role === "Member") {
      return (
        <View style={styles.body}>
          {navbarView()}

          <View style={{ height: 40, zIndex: 2 }}>
            <Text variant="h6" style={{ textAlign: "center" }}>
              Thành viên nhóm
            </Text>
          </View>
          <View style={styles.list}>
            <FlatList
              data={members}
              keyExtractor={(item) => item.uid}
              renderItem={(data) => (
                <ListMember
                  cid={cid}
                  id={id}
                  a={data.item}
                  navigation={navigation}
                  role={role}
                  setMembers={setMembers}
                />
              )}
            />
          </View>
          <View style={{ height: 150, zIndex: 2 }}>
            <Text variant="h6">Hình đã gửi</Text>
            {Listimg()}
          </View>
          <View style={styles.bottom} onPress={handeLeave}>
            <TouchableOpacity
              onPress={handeLeave}
              style={[styles.buttontext, { backgroundColor: "#8A57DD" }]}
            >
              <Text style={{ color: "white" }}>Rời khỏi nhóm</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.body}>
          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  mems[0].avatar ||
                  "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
              }}
            />
            <Text variant="h4">{mems[0].nickName}</Text>
          </View>
          <View style={styles.navbar}>
            <View style={styles.icontext}>
              <TouchableOpacity>
                <Image
                  style={styles.tinyLogo}
                  source={require("../../component/image/phone-icon.png")}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 15 }}>Gọi điện</Text>
            </View>
            <View style={styles.icontext}>
              <TouchableOpacity>
                <Image
                  style={styles.tinyLogo}
                  source={require("../../component/image/video-icon.png")}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 15 }}>Cuộc gọi video</Text>
            </View>
            <View style={styles.icontext}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", {
                    id1: mems[0].uid,
                    id: id,
                    type: "friend",
                  });
                }}
              >
                <Image
                  style={styles.tinyLogo}
                  source={require("../../component/image/profile-icon.png")}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 15 }} numberOfLines={1}>
                Trang cá nhân
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}></View>
          <View style={{ height: 150, zIndex: 2 }}>
            <Text variant="h6">Hình đã gửi</Text>
            {Listimg()}
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              style={[styles.buttontext, { backgroundColor: "#DD5757" }]}
            >
              <Text style={{ color: "white" }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <AddMember
        visible={visible}
        setVisible={setVisible}
        navigation={navigation}
        id={id}
        cid={cid}
      />
      <ModalChangeName
        visible={visible1}
        setVisible={setVisible1}
        navigation={navigation}
        cid={cid}
        id={id}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={require("../../component/image/back-icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flexDirection: "row" }}
          onPress={() => {
            setVisible1(true);
          }}
        >
          <Image
            style={styles.logo}
            source={require("../../component/image/logo-icon.png")}
          />
          <Text variant="h5" numberOfLines={1}>
            {conv.name}
          </Text>
        </TouchableOpacity>
        <Image
          style={styles.tinyLogo}
          source={require("../../component/image/info-icon.png")}
        />
      </View>
      <LinearGradient
        colors={[
          "rgba(155, 176, 227, 0.6) 0%",
          "rgba(149, 150, 191, 0.729167) 20%",
          "rgba(211, 100, 100, 0.24) 100%",
        ]}
        style={styles.background}
      />
      {type()}
    </View>
  );
}
const styles = StyleSheet.create({
  icontext: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  navbar: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  buttontext: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  list: {
    flex: 2,
    zIndex: 2,
  },
  profile: {
    flex: 1,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    zIndex: 2,
    height: 60,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#6CB6C7",
    flexDirection: "row",
    alignItems: "center",
  },
  bottom: {
    zIndex: 2,
    height: 80,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#6CB6C7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerbutton: {
    justifyContent: "center",
    backgroundColor: "#E9C8C8",
    height: 50,
    padding: 10,
    borderRadius: 30,
  },
  logo: {
    resizeMode: "contain",
    height: 40,
    width: 50,
    marginRight: 10,
  },
  avatar: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    marginBottom: 30,
  },
  body: {
    flex: 1,
  },
  tinyLogo: {
    resizeMode: "contain",
    height: 50,
    width: 50,
  },
});

export default ChatDetail;
