import { Text } from "@react-native-material/core";
import { Image, StyleSheet, View } from "react-native";

function ListImage({ a }) {
  return (
    <View>
      <Image
        style={styles.avatar}
        source={{
          uri: a.content,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  avatar: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    marginHorizontal: 10,
    backgroundColor: "white",
    filter: "blur(8px)",
  },
});

export default ListImage;
