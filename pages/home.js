import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TrainsView from '../components/trainView';


const Home = () => {
    return (
        <View style={styles.container}>
            <TrainsView></TrainsView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex :1,
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default Home