import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TrainsView from '../components/trainView';

const Home = () => {
    const goToAbout = () => {
        Actions.map()
    }
    return (
        <View style={styles.container}>
            <TrainsView></TrainsView>
            <TouchableOpacity onPress={goToAbout}>
            <Text style={{ textAlign: "center" , fontSize: 100}}>Made with love</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    }
})
export default Home