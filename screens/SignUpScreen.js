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

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  static navigationOptions = {
    title: "SignUp"
  };

  signUpUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authenticate => {
        console.log(authenticate);
        return authenticate.user
          .updateProfile({
            displayName: name
          })
          .then(() => {
            this.props.navigation.replace("Home");
          })
          .catch(error => {
            alert(error.message);
          });
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
          <Text>Sign Up</Text>
        </View>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={name => {
                this.setState({ name });
              }}
            />
          </Item>
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
              this.signUpUser(
                this.state.name,
                this.state.email,
                this.state.password
              );
            }}>
            <Text style={styles.buttonText}>Register</Text>
          </Button>
        </Form>
        <View style={styles.footer}>
          <Text>OR</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}>
            <Text style={styles.text}>Login Here!</Text>
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
    width: "100%"
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
