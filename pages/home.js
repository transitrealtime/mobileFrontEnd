import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Home = () => {
    const goToAbout = () => {
        Actions.about()
    }
    const goToTrain = () => {
        Actions.train()
    }
    
    return (
        <View>
            <Text>This is HOME!</Text>
            <TouchableOpacity style={{ margin: 128 }} onPress={goToAbout}>
                <Text>This is About!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 128 }} onPress={goToTrain}>
                <Text>This is Trains!</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Home