import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'


const AddNewPost = ({navigation}) => (
  
    <View style = {styles.container}>
        <Header navigation = {navigation}/>
        <FormikPostUploader navigation = {navigation}/>
    </View>
    
)

const Header = ({navigation}) => (

    <View style = {styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/BackArrow.png')} style={styles.BackArrow}/>
        </TouchableOpacity>
        <Text style = {styles.headerText}>NEW POST</Text>
        <Text></Text>
    </View>
) 

const styles = StyleSheet.create({
    container: {
        marginhorizontal: 10
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    headerText: {
        fontSize: 20,
        //margin : 10,
        fontcolor: '#000',
        fontWeight: '700',
        marginRight: 25,
    },

    BackArrow: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        margin: 8,
        transform: [{ rotate: '90deg'}]
    },
})


export default AddNewPost
