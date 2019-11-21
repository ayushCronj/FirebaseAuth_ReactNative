import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoadingScreen from "./screens/LoadingScreen";

var config = {
  apiKey: "AIzaSyCC8pFuab75XVgqU9sKqtYzyH_YCaID12Y",
  authDomain: "reactnative-57d16.firebaseapp.com",
  databaseURL: "https://reactnative-57d16.firebaseio.com",
  projectId: "reactnative-57d16",
  storageBucket: "reactnative-57d16.appspot.com",
  messagingSenderId: "1060827936833",
  appId: "1:1060827936833:web:207438935aad682e8c2ec0",
  measurementId: "G-86L56DJGBF"
};
firebase.initializeApp(config);

const MainNavigator = createStackNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen },
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: "Loading"
  }
);

const App = createAppContainer(MainNavigator);

export default App;
