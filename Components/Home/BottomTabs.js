import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { firebase, db } from "../../firebase";

const BottomTabs = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");
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

  const BottomTabIcons = [
    {
      name: "Home",
      active: require("../../Assets/home-active.png"),
      inactive: require("../../Assets/home-inactive.png"),
    },
    {
      name: "Search",
      active: require("../../Assets/search-active.png"),
      inactive: require("../../Assets/search-inactive.png"),
    },
    {
      name: "add",
      active: require("../../Assets/add-active.png"),
      inactive: require("../../Assets/add-inactive.png"),
    },
    {
      name: "shop",
      active: require("../../Assets/shop-active.png"),
      inactive: require("../../Assets/shop-inactive.png"),
    },
    {
      name: "profile",
      active: {uri: avatar},
      inactive: {uri: avatar},
    },
  ];

  const Icon = ({ icon }) => (
    <TouchableOpacity
      onPress={() =>
        setActiveTab(icon.name) || icon.name === "add"
          ? navigation.push("NewPostScreen")
          : null
      }
    >
      <Image
        source={activeTab === icon.name ? icon.active : icon.inactive}
        style={[
          styles.Tabicon,
          icon.name === "profile" ? styles.profilePic() : null,
          activeTab === "profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {BottomTabIcons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "0%",
    zIndex: 999,
    backgroundColor: "white",
  },

  container: {
    flexdirection: "row",
    justifyContent: "space-around",
    height: 50,
    padding: 8,
    flexWrap: "wrap",
  },

  Tabicon: {
    width: 23,
    height: 23,
    margin: 28,
    resizeMode: "contain",
  },

  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
  }),
});

export default BottomTabs;
