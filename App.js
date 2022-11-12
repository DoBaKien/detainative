import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bottom from "./component/Bottom";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Message from "./screens/message/Message";
import Profile from "./screens/Profile/Profile";
import ChatDetail from "./screens/ChatDetail/ChatDetail";
import Request from "./screens/Friend/Rq/Request";
import Sent from "./screens/Friend/Sent/Sent";
import Add from "./screens/Friend/Add/Add";
import axios from "axios";
axios.defaults.baseURL = "http://192.168.0.100:8083";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Chat"
          component={Bottom}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Message"
          component={Message}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="ChatDetail"
          component={ChatDetail}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Request"
          component={Request}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Sent"
          component={Sent}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
