import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { firebase, db } from "../../firebase";

const SignUpForm = ({ navigation }) => {
  const SignUpschema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    username: Yup.string()
      .min(6, "Username must be at least 6 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // const getRandomProfileImage = async () => {
  //     const response = await fetch('https://randomuser.me/api/')
  //     const data = await response.json()
  //     return data.results[0].picture.large
  // }

  const onSignUp = async (email, username, password) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("Firebase Sign Up Successful!", email, username, password);
      db.collection("users").doc(authUser.user.email).set({
        user_Uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_image: "",
      });
    } catch (error) {
      Alert.alert(
        "Sign Up Error",
        error.message + "\n \n... What do you want to do?",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.warpper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignUp(values.email, values.username, values.password);
        }}
        validationSchema={SignUpschema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#CCC"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#444"
                autoCapitalize="none"
                autoFocus={true}
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  borderColor:
                    5 < values.username.length || values.username.length === 0
                      ? "#CCC"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="username"
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? "#CCC"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#444"
                autoCapitalize="none"
                secureTextEntry={true}
                textContentType="password"
                autoCorrect={false}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <Pressable
              titleSize={20}
              style={styles.Button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.ButtonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.goBack("LoginScreen")}
              >
                <Text style={{ color: "#6BB0F5" }}> Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  warpper: {
    marginTop: -20,
    flex: 1,
    width: "100%",
  },

  inputContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    padding: 12,
    marginBottom: 10,
  },

  Button: (isValid) => ({
    borderRadius: 50,
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    borderRadius: 12,
  }),

  ButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  signUpContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SignUpForm;
