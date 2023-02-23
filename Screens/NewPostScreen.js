import { SafeAreaView,StatusBar,StyleSheet } from 'react-native'
import React from 'react'
import AddNewPost from '../Components/newPost/AddNewPost'


const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style = {styles.container}>
    <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
        margin: 5
    }
}
)



export default NewPostScreen