import { Text } from "@react-native-material/core";
import { Image, StyleSheet, View } from "react-native";

function ListMember({ a }) {
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

      <Text variant="subtitle1">{a.nickName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    height: 50,
    width: 50,
    marginRight: 10,
  },
});

export default ListMember;
