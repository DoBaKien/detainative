import { Button, Text } from "@react-native-material/core";
import { Image, StyleSheet, View } from "react-native";

function ListMember({ a, role }) {
  const type = () => {
    if (role === "Owner") {
      return (
        <View style={styles.buttontext}>
          <Text style={{ color: "white" }}>Xóa khỏi nhóm</Text>
        </View>
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

      <Text variant="subtitle1" numberOfLines={1} style={{ width: 180 }}>
        {a.nickName}
      </Text>
      {type()}
    </View>
  );
}

const styles = StyleSheet.create({
  buttontext: {
    width: 150,
    borderRadius: 30,
    paddingLeft: 20,
    backgroundColor: "red",
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
