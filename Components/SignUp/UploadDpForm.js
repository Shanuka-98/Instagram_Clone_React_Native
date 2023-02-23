import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { firebase, db } from "../../firebase";
import { Button } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Badge,
  IconButton,
  MD3Colors,
  Portal,
  Dialog,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const UploadDpForm = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  var UploadImage = false;

  const selectImage = async () => {
    try {
      if (UploadImage === false) {
        global.results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 5],
          quality: 1,
        });
        setThumbnailUrl(global.results.uri);
      } else if (UploadImage === true) {
        const storage = firebase.storage();
        const ref = storage
          .ref()
          .child("Profile-Pictures/" + global.results.uri.split("/").pop());

        const img = await fetch(global.results.uri);
        const bytes = await img.blob();

        ref.put(bytes).then((snapshot) => {
          console.log("Uploaded to firebase!");
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImageUrl(downloadURL);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UploadDp = async () => {
    try {
      UploadImage = true;
      selectImage();
      const authUser = await firebase.auth().currentUser;
      db.collection("users").doc(authUser.email).update({
      profile_image: imageUrl.toString(),
      });
      console.log("Image url > ",imageUrl.toString());
      console.log("Updated!");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload your profile picture</Text>
      <View style={styles.AvatarContainer}>
        <UserAvatar size={175} src={thumbnailUrl} name="Shanuka Piyumantha" />
      </View>
      <View style={styles.IconContainer}>
        <IconButton
          mode="contained-tonal"
          style={styles.badge}
          size={30}
          icon={({ size, color }) => (
            <MaterialIcons
              name="add-photo-alternate"
              size={35}
              color="#311B92"
            />
          )}
          onPress={() => selectImage()}
        ></IconButton>
      </View>
      <View style={styles.ButtonContainer}>
        <Button
          mode="contained-tonal"
          onPress={() => UploadDp()}
          style={styles.button}
        >
          Upload
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },

  AvatarContainer: {
    paddingTop: 140,
    paddingHorizontal: 12,
    backgroundColor: "white",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },

  button: {
    marginTop: 20,
  },

  IconContainer: {
    position: "absolute",
    zIndex: 100,
    left: -6,
    top: 2,
  },

  badge: {
    top: 380,
    left: 240,
    zIndex: 100,
    backgroundColor: "#ecf",
  },

  ButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  text: {
    fontSize: 28,
    fontWeight: "900",
    color: "black",
    textAlign: "center",
    marginTop: 90,
  },
});
export default UploadDpForm;
