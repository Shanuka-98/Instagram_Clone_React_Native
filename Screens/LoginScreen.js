import { View, Image,StyleSheet } from 'react-native'
import React from 'react'
import LoginForm from '../Components/login/LoginForm'

const LoginScreen = ({navigation}) => (
 
    <View style = {styles.logoContainer}>
      <Image source = {require('../Assets/IgLogo.png')} style = {styles.logo}/>
      <LoginForm navigation = {navigation}/>
    </View>
  
)

const styles = StyleSheet.create(

  {
    logoContainer: {
      
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 12,
      backgroundColor: 'white',
      alignItems: 'center',
    },

    logo: {
      width: 170,
      height: 170,
      resizeMode: 'contain',
      alignItems: 'center',
      marginTop: 110

    },


  }
)


export default LoginScreen