import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps';
import { regionFrom } from './getRegion'

export default class App extends React.Component {

   render() {
      let data = regionFrom(40.7831, -73.9712, 10000);
      console.log(data);
      return (
         <View style={styles.container}>
            <MapView style={styles.map}
               initialRegion={{
                  latitude: 40.7549,
                  longitude: -73.9840,
                  latitudeDelta: 0,
                  longitudeDelta: 0.08983111749910169,
               }}
            >
            </MapView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent: 'flex-end',
      alignItems: 'center'
   },
   map: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
   }
});
