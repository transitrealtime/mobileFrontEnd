import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TrainsView from '../components/trainView';

const Home = () => {
    const goToAbout = () => {
        Actions.about()
    }
    return (
        <View style={styles.container}>
            <TrainsView></TrainsView>
            <Text style={{ textAlign: "center" }}>Made with love and coffee</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default Home