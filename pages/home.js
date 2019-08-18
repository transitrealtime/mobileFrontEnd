import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TrainsView from '../components/trainView';

const Home = () => {
    return (
        <View style={styles.container}>
            <TrainsView></TrainsView>
            <Text style={{ textAlign: "center" }}>Made with love</Text>
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