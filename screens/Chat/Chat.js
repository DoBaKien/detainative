import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import ListConV from "./ListConV";

function Chat({ id, navigation }) {
  const [conV, setConV] = useState("");

  useEffect(() => {
    axios
      .get(`/loadUserConv/${id}`)
      .then(function (response) {
        setConV(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.boxinput}>
        <TextInput
          placeholder="Tìm kiếm"
          variant="outlined"
          style={styles.input}
        />
        <Icon name="search1" color="#000" size={40} style={styles.iconsearch} />
      </View>

      <View style={{ flex: 8, width: "90%" }}>
        <FlatList
          data={conV}
          renderItem={(data) => (
            <ListConV a={data.item} navigation={navigation} id={id} />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  boxinput: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: 60,
    width: "75%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
    marginTop: 15,
  },
  iconsearch: {
    marginLeft: 10,
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
});

export default Chat;
