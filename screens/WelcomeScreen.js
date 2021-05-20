import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import {Input, Icon} from 'react-native-elements'

export default class SignupLogininScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      isModalVisible: "false",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: "",
      currencyCode:''
    };
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
       this.props.navigation.navigate("HomeScreen")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.errorMessage;
        return Alert.alert(errorMessage);
      });
  };

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      Alert.alert("Password does not match\nCheck your password");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
            IsBookRequestActive:false,
            currencyCode:this.state.currencyCode
          });
          return Alert.alert("User added successfully", "", [
            {
              text: "Ok",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.errorMessage;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>

              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength={12}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength={12}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Contact"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />

              <TextInput
              style={styles.formTextInput}
              placeholder={"Currency Code"}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  currencyCode: text,
                });
              }}
            />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />

              <TextInput
                style={styles.formTextInput}
                placeholder={"confirm Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />

              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({ isModalVisible: false })}
                >
                  <Text style={{ color: "rgb(128, 127, 128)" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageIcon}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXUVzo4swxlDM5p350qA18b0NLMKUTNd8Vg&usqp=CAU",
          }}
        />
        <View style={styles.profileContainer}>
          {this.showModal()}
          <Text style={styles.title}>No buy. No sale. Just Exchange</Text>
        </View>
        <View style={styles.buttonContainer}>
        <Input
        leftIcon={{
          type: 'font-awesome',
          name: 'envelope',
          color: 'white',
        }}
        style={{color:'white', marginLeft:20}}
        inputContainerStyle={{ marginHorizontal: 30 }}
        placeholder="Email"
        placeholderTextColor="rgb(128, 127, 128)"
        keyboardType="email-address"
        onChangeText={(text) => {
          this.setState({
            emailId: text,
          });
        }}
      />

      <Input
      leftIcon={{
        type: 'font-awesome',
        name: 'lock',
        color: 'white',
      }}
      style={{color:'white', marginLeft:20}}
      inputContainerStyle={{ marginHorizontal: 30 }}
      secureTextEntry={true}
      placeholder="Password"
      placeholderTextColor="rgb(128, 127, 128)"
      onChangeText={(text) => {
        this.setState({
          password: text,
        });
      }}
    />
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(236, 236, 236)",
  },
  profileContainer: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "300",
    paddingBottom: 30,
    color: "rgb(128, 127, 128)",
    alignSelf: "center",
    marginLeft: 20,
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "rgb(128, 127, 128)",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    color: "black",
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "rgb(128, 127, 128)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10.32,
    elevation: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageIcon: {
    width: 250,
    height: 200,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 10,
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "rgb(128, 127, 128)",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "rgb(128, 127, 128)",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: "rgb(128, 127, 128)",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
