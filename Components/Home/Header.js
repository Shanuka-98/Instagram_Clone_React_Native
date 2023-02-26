import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import {firebase} from '../../firebase'


const handleSignOut = async () => {
  try {
    await firebase.auth().signOut()
    console.log('Signed Out')
  }
  catch (error) {
  console.log(error)
}
}



const Header = () => {
  return (
    
    
    <View style = {styles.container}>
      <TouchableOpacity>
      <Image style = {styles.logo}
      source = {require('../../Assets/IgLogo.png')}/>


      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut}>
      <Image
          source = {require('../../Assets/instagram-arrow-icon.jpg')}
          style={styles.ArrowIcon}
        />
      </TouchableOpacity>


        <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Image style={styles.HeartIcon}
          source = {require('../../Assets/IgHeart2.png')}
          
          />
        </TouchableOpacity>

        
        <TouchableOpacity>
          <View style={styles.UnReadBadge}>
            <Text style={styles.UnReadtext}>12</Text>
          </View>
          <Image style={styles.MessengerIcon}
          source = {require('../../Assets/MessengerIcon.png')}
          
          />
        </TouchableOpacity>
        

      </View>
    
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 8,

},

iconsContainer: {
    flexDirection: 'row',
},

HeartIcon: {
    width:34,
    height:33,
    marginLeft:28,
    resizeMode:'contain'
},

MessengerIcon: {
    width:34,
    height:32,
    marginLeft:26,
    resizeMode:'contain'
},

ArrowIcon:{ 
    width: 20,  
    height: 20,  
    resizeMode: 'contain',
    bottom: -4.5,
    marginLeft: -55,
},

logo: {
    width: 110,
    height: 32,
    resizeMode: 'contain',
    bottom: -6,
    marginLeft: 0,
},
  UnReadBadge: {
    backgroundColor: 'red',
    position: 'absolute',
    left: 40,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    top: -4,

},

  UnReadtext: {
    color: 'white',
    fontWeight: '700',
    top: -2,

    
},


})

export default Header
