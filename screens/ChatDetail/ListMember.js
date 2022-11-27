import { Text } from "@react-native-material/core";
import axios from "axios";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

function ListMember({ a, role, setMembers, id, cid }) {
  const handleRole = (uid) => {
    Alert.alert("Cảnh báo", "MỘt khi đã ủy quyền thì KHÔNG THỂ hoàn tác", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          axios.put(`/nRole/${cid}/${id}/${uid}`).then(function (response) {
            Alert.alert("Thành công", "Ủy quyền thành công", [
              {
                text: "OK",
                onPress: () => {
                  axios
                    .get(`/loadConvRoleMem/${cid}`)
                    .then(function (response) {
                      setMembers(response.data);
                    })
                    .catch(function (error) {
                      console.log("loadConvMem" + error);
                    });
                },
              },
            ]);
          });
        },
      },
    ]);
  };
  const handleXoa = () => {
    Alert.alert("Cảnh báo", "Xóa thành viên này ra khỏi nhóm", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          axios.delete(`/leaveGroup/${a.uid}/${cid}`).then(function (response) {
            Alert.alert("Thành công", "Xóa thành công", [
              {
                text: "OK",
                onPress: () => {
                  axios
                    .get(`/loadConvMem/${cid}`)
                    .then(function (response) {
                      var result = response.data.filter(function (word) {
                        return word.uid !== id;
                      });
                      setMembers(result);
                    })
                    .catch(function (error) {
                      console.log("loadConvMem" + error);
                    });
                },
              },
            ]);
          });
        },
      },
    ]);
  };
  const type = () => {
    if (role === "Owner") {
      return (
        <>
          <TouchableOpacity
            style={styles.buttontext2}
            onPress={() => handleRole(a.uid)}
          >
            <Text style={{ textAlign: "center" }}>Ủy Quyền</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttontext} onPress={handleXoa}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Xóa khỏi nhóm
            </Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <View style={styles.buttontv}>
          <Text>Thành viên</Text>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri:
            a.avatar ||
            "https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png",
        }}
      />

      <Text variant="subtitle1" numberOfLines={1} style={{ width: 120 }}>
        {a.nickName}
      </Text>
      {type()}
    </View>
  );
}

const styles = StyleSheet.create({
  buttontext: {
    width: 90,
    borderRadius: 10,

    backgroundColor: "red",
  },
  buttontext2: {
    width: 100,
    borderRadius: 30,
    backgroundColor: "#B9ECBB",
  },
  buttontv: {
    width: 120,
    borderRadius: 30,
    paddingLeft: 20,
    backgroundColor: "#B9ECBB",
  },
  container: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  logo: {
    resizeMode: "contain",
    height: 50,
    width: 50,
    marginRight: 10,
  },
});

export default ListMember;
