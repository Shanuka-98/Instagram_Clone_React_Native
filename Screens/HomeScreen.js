import {
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Home/Header";
import Stories from "../Components/Home/Stories";
import Posts from "../Components/Home/Posts";
import { BottomTabIcons } from "../Components/Home/BottomTabs";
import BottomTabs from "../Components/Home/BottomTabs";
import { firebase, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  try {
    useEffect(() => {
      console.log("Checking DP....");
      const user = firebase.auth().currentUser;
      db.collection("users")
        .doc(user.email)
        .get()
        .then((doc) => {
          var data = doc.data();
          if (data.profile_image === null || data.profile_image === "") {
            navigation.navigate("UploadDpScreen");
          }
        });
    }, []);
  } catch (error) {
    console.log(error);
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collectionGroup("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
        );
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />

      <ScrollView>
        {posts.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
      </ScrollView>

      <BottomTabs icons={BottomTabIcons} navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default HomeScreen;
