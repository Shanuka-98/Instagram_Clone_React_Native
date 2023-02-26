import { View, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { firebase, db } from "../../firebase";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import { Platform } from "react-native";

const PlaceHolderImage =
  "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";

const uploadPostSchema = Yup.object().shape({
  caption: Yup.string().max(2200, "Caption has reached the characters"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PlaceHolderImage);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);
  var btnLoading = false;

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection("users")
      .where("user_Uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profile_image: doc.data().profile_image,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFirebase = (Img, caption) => {
    console.log("image Url is > ", Img);
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: Img,
        user: currentLoggedInUser.username,
        profile_image: currentLoggedInUser.profile_image,
        user_Uid: firebase.auth().currentUser.uid,
        user_Email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        Comments: [],
      })
      .then(() => navigation.goBack());
    btnLoading = false;

    return unsubscribe;
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS === "ios") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Camera roll permission is needed to access photos from your device",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "Allow", onPress: () => Linking.openSettings() },
            ]
          );
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      global.results = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      });

      setThumbnailUrl(global.results.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const btnLoad = () => {
    if (thumbnailUrl === PlaceHolderImage) {
      btnLoading = false;
    } else {
      btnLoading = true;
    }
  };

  const uploadImage = async (caption) => {
    console.log("uploading image...");
    try {
      const storage = firebase.storage();
      const ref = storage
        .ref()
        .child("posts/" + global.results.uri.split("/").pop());

      const img = await fetch(global.results.uri);
      const bytes = await img.blob();

      await ref.put(bytes).then((snapshot) => {
        console.log("Uploaded to firebase!");
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          global.UploadImg = downloadURL;
          uploadPostToFirebase(global.UploadImg, caption);
          console.log("File available at", global.UploadImg);
          console.log("Post Uploaded!");
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ caption: "" }}
      onSubmit={(values) => {
        if (thumbnailUrl === PlaceHolderImage) {
          alert("Please select an image");
        } else {
          try {
            uploadImage(values.caption);
          } catch (error) {
            console.log(error);
          }
        }
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PlaceHolderImage,
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, marginLeft: 12, marginTop: 10 }}>
              <TextInput
                label="Write a caption"
                style={{ color: "#000", fontSize: 15, backgroundColor: "#fff" }}
                placeholder="e.g My Awesome Selfie"
                placeholderTextColor={"gray"}
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />

          <Button
            icon="image-multiple"
            mode="contained"
            style={styles.button}
            onPress={() => selectImage()}
          >
            Pick an image from camera roll
          </Button>

          <Button
            loading={btnLoading}
            mode="text"
            onPress={handleSubmit}
            onPressOut={() => btnLoad()}
            style={styles.button}
            disabled={!isValid}
          >
            Share
          </Button>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  content: {
    paddingTop: 40,
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default FormikPostUploader;
