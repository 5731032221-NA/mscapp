import React from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
// import { Font } from "expo";
import * as Font from 'expo-font'

import { Provider } from "react-redux";
import configureStore from "./store";
import Home from "./screens/Home";
import Form from "./screens/Form";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Map from "./screens/Map";
import ReadQR from "./screens/ReadQR";
import Question from "./screens/Question";
import Lotto from "./screens/Lotto";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import NotificationPopup from 'react-native-push-notification-popup';
const Stack = createStackNavigator();
const store = configureStore();
// import { FlashMessage} from "react-native-flash-message";
export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Prompt: require("./assets/fonts/Kanit-Regular.ttf"),
      Prompt_Bold: require("./assets/fonts/Kanit-Bold.ttf"),
      Prompt_LightItalic: require("./assets/fonts/Kanit-LightItalic.ttf"),
      Prompt_ExtraLight: require("./assets/fonts/Kanit-ExtraLight.ttf")
    });

    this.setState({ fontLoaded: true });
    BackHandler.addEventListener("hardwareBackPress", function () {
      return true;
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.fontLoaded ? <NavigationContainer >
          <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false ,animationEnabled: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ReadQR" component={ReadQR} />
            <Stack.Screen name="Form" component={Form} />
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Lotto" component={Lotto} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Question" component={Question} />
          </Stack.Navigator>
        </NavigationContainer> : null}
      </Provider>
    );
  }
}
