import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps';


export default class App extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <MapView style={styles.map}
               initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
               }}
            >
            </MapView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      position: 'absolute',
      top:0,
      left:0,
      bottom:0,
      right:0,
      justifyContent:'flex-end',
      alignItems:'center'
   },
   map:{
      position:'absolute',
      top:0,
      left:0,
      bottom:0,
      right:0
   }
});
