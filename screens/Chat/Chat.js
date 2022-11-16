import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

import ListConV from "./ListConV";

function Chat({ id, navigation }) {
  const [conV, setConV] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`/loadUserConv/${id}`)
      .then(function (response) {
        setConV(response.data.filter(ser).sort((a, b) => a.cid - b.cid));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [search]);

  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxinput}>
        <TextInput
          placeholder="Tìm kiếm"
          variant="outlined"
          style={styles.input}
          onChangeText={(e) => setSearch(e)}
        />
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
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    flex: 0.5,
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
});

export default Chat;
