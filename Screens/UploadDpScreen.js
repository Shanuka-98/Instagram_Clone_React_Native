import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import UploadDpForm from '../Components/SignUp/UploadDpForm'
import UserAvatar from 'react-native-user-avatar';

const UploadDpScreen = ({ navigation }) => {

  return (
    <View style={styles.Container}>
      {/* <UserAvatar size={175} name="Avishay Bar"/> */}
      {/* <UserAvatar size={100} name="John Doe" bgColors={['#ccc', '#fafafa', '#ccaabb']}/> */}
      <UploadDpForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },

});
export default UploadDpScreen;
