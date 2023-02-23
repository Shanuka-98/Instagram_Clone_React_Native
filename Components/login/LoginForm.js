import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { firebase, db } from "../../firebase";

const LoginForm = ({ navigation }) => {
  const Loginschema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase Login Successful!", email, password);
    } catch (error) {
      Alert.alert(
        "Login Error",
        error.message + "\n \n... What do you want to do?",
        [
          {
            text: "Ok",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel",
          },

          { text: "Sign Up", onPress: () => navigation.push("SignUpScreen") },
        ]
      );
    }
  };

  return (
    <View style={styles.warpper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={Loginschema}
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
                placeholder="Phone number, email address or Username"
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
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <TouchableOpacity>
                <Text style={{ color: "#6BB0F5" }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <Pressable
              titleSize={20}
              style={styles.Button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.ButtonText}>Log In</Text>
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
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

export default LoginForm;
