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

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: "SignIn"
  };

  signInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} />
          <Text>Sign In</Text>
        </View>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label> Email </Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={email => {
                this.setState({ email });
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label> Password </Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={password => {
                this.setState({ password });
              }}
            />
          </Item>
          <Button
            style={styles.button}
            full
            rounded
            onPress={() => {
              this.signInUser(this.state.email, this.state.password);
            }}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Button>
        </Form>

        <View style={styles.footer}>
          <Text>OR</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SignUp");
            }}>
            <Text style={styles.text}>Register Here!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  form: {
    padding: 20,
    width: "100%",
    marginBottom: 30
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  },
  text: {
    color: "blue"
  }
});
