import React from 'react'
import { StyleSheet,View} from 'react-native';
import Favorites from '../components/favorites'
import TrainsView from '../components/trainView';


class Home extends React.Component {
    render() {
        return (
            // <ScrollView>
                <View style={styles.container}>
                    <Favorites></Favorites>
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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})
export default Home