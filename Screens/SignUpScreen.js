import { View, StyleSheet, Image} from 'react-native'
import React from 'react'
import SignUpForm from '../Components/SignUp/SignUpForm'

const SignUpScreen = ({navigation}) => (
    <View style = {styles.logoContainer}>
    <Image source = {require('../Assets/IgLogo.png')} style = {styles.logo}/>
    <SignUpForm navigation = {navigation}/>
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

export default SignUpScreen