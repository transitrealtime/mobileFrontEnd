import React from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import TrainsView from '../components/trainView';
import Favorites from '../components/favorites';


class Home extends React.Component {
    render() {
        return (
            // <ScrollView>
                <View style={styles.container}>
                    {/* <Favorites></Favorites> */}
                    <TrainsView></TrainsView>
                </View>
            // </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
export default Home