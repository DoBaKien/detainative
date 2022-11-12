import { Text } from "@react-native-material/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ListMember from "./ListMember";

function ChatDetail({ route, navigation }) {
  const cid = route.params.id;
  const members = route.params.user;
  const [conv, setConv] = useState("");
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
  const type = () => {
    if (conv.type === "group") {
      return (
        <View>
          <TouchableOpacity>
            <View style={styles.headerbutton}>
              <Text style={{ color: "#D40707" }}>Add Member</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <Text>direct</Text>;
    }
  };
  return (
    <View style={styles.container}>
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
        <TouchableOpacity>
          <View style={styles.headerbutton}>
            <Text style={{ color: "#D40707" }}>Leave group</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.navbar}>
        <Image
          style={styles.logo}
          source={require("../../component/image/logo-icon.png")}
        />
        <Text variant="h4" numberOfLines={1}>
          {conv.name}
        </Text>
        {type()}
      </View>
      <View style={styles.body}>
        <FlatList
          data={members}
          keyExtractor={(item) => item.uid}
          renderItem={(data) => (
            <ListMember a={data.item} navigation={navigation} />
          )}
          style={styles.list}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
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
    height: 100,
    marginBottom: 10,
  },
  navbar: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
  },
  body: {
    flex: 1,
  },
});

export default ChatDetail;
