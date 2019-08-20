import React from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import TrainsView from '../components/trainView';
import Favorites from '../components/favorites';


const Home = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Favorites></Favorites>
                <TrainsView></TrainsView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
})
export default Home