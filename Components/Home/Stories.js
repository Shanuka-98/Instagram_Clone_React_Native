import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { users } from "../../data/Users";
import { firebase, db } from "../../firebase";

const Stories = () => {
  const [avatar, setAvatar] = useState(null);
  try {
    const user = firebase.auth().currentUser;
    db.collection("users")
      .doc(user.email)
      .get()
      .then((doc) => {
        var data = doc.data();
        if (data.profile_image === null || data.profile_image === "") {
          console.log("No DP");
        } else {
          console.log("DP Found");
          setAvatar(data.profile_image);
        }
      });
  } catch (error) {
    console.log(error);
  }

  return (
    <View style={{ marginBottom: 13, marginVertical: -10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map((user, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <LinearGradient
              colors={["#CA1D7E", "#E35157", "#F2703F"]}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={styles.border}
            >
              {index === 0 ? (
                <Image
                  style={styles.storyImage}
                  source={{
                    uri: avatar,
                  }}
                />
              ) : (
                <Image
                  style={styles.storyImage}
                  source={{ uri: user.avatar }}
                />
              )}
            </LinearGradient>

            <Text style={styles.storyText}>
              {user.user.length > 11
                ? user.user.slice(0, 10).toLowerCase() + "..."
                : user.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storyImage: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },

  border: {
    borderRadius: 70 / 2,
    marginHorizontal: 5,
    marginVertical: 10,
    marginLeft: 6,
    bottom: -10,
    justifyContent: "center",
    width: 70,
    height: 70,
  },

  storyText: {
    color: "black",
    fontWeight: "500",
    fontSize: 13,
  },
});

export default Stories;
