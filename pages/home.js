import React from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import TrainsView from '../components/trainView';
import Favorites from '../components/favorites';


class Home extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Favorites></Favorites>
                    <TrainsView></TrainsView>
                    <Text>{this.state.location}</Text>
                </View>
            </ScrollView>
        )
    }
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