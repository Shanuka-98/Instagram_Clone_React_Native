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
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [UploadImage, setUploadImage] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const selectImage = async () => {
    setUploadImage(false);
    setBtnLoading(false);
    try {
      if (UploadImage === false) {
          const results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 5],
          quality: 1,
        });
        setThumbnailUrl(results.uri);
        setUploadImage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upload = async () => {
    try {
      setBtnLoading(true);
      if (UploadImage === true) {
        setUploadImage(false);
        console.log("uploading image...");
        const storage = firebase.storage();
        const ref = storage
          .ref()
          .child("Profile-Pictures/" + thumbnailUrl.split("/").pop());

        const img = await fetch(thumbnailUrl);
        const bytes = await img.blob();

        const uploadTask = ref.put(bytes);

        uploadTask.on("state_changed", (snapshot) => {
          // Get the upload progress percentage
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        });

        uploadTask.then((snapshot) => {
          console.log("Uploaded to firebase!");
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            //setImageUrl(downloadURL);
            console.log("File available at", downloadURL);
            UploadDp(downloadURL);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UploadDp = async (imageUrl) => {
    try {
      console.log("Updating profile picture...");
      if (imageUrl) {
        const authUser = await firebase.auth().currentUser;
        await db.collection("users").doc(authUser.email).update({
          profile_image: imageUrl.toString(),
        });
        console.log("Updated profile picture URL: ", imageUrl.toString());
        navigation.navigate("HomeScreen");
      } else {
        console.log("No image URL available for update");
      }
    } catch (error) {
      console.log("Error updating profile picture: ", error);
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
          loading={btnLoading}
          mode="contained-tonal"
          onPress={() => upload()}
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
