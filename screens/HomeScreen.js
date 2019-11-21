import React from "react";
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import * as firebase from "firebase";
import { Form, Input, Label, Button, Item } from "native-base";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName
        });
      } else {
        this.props.navigation.replace("SignIn");
      }
    });
  }

  static navigationOptions = {
    title: "Home"
  };

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signout");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} />
          <Text>Home</Text>
        </View>
        <View style={styles.userDetails}>
          <Text> Hey {this.state.name} </Text>
          <Text> You are signed in as : {this.state.email} </Text>
        </View>
        <Button
          style={styles.button}
          full
          rounded
          success
          onPress={() => {
            this.signOutUser();
          }}>
          <Text style={styles.buttonText}>Log Out</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 20
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  userDetails: {},

  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  }
});
