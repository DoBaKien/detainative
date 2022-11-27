import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function HeaderProfile({ navigation, id }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon
          name="arrow-back-circle-sharp"
          size={40}
          style={styles.imagestyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat", {
            id: id,
          });
        }}
      >
        <Image style={styles.logo} source={require("./image/logo.png")} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChangePass", {
            id: id,
          });
        }}
      >
        <Icon name="settings-outline" size={40} style={styles.imagestyle} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  imagestyle: {
    resizeMode: "contain",
    marginTop: 8,
  },
  header: {
    marginTop: 30,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
});

export default HeaderProfile;
