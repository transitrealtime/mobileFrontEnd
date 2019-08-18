import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView from 'react-native-maps';
import axios from 'axios';
import { regionFrom } from './getRegion'

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         markers: [],
         locationResult: "",
         location: ""
      }
   }
   async componentDidMount() {
      let pins = [];
      let { data } = await axios.get('http://mta-real-time.herokuapp.com/stations').catch(err => console.log(err));
      let i = 0;
      Object.values(data).forEach(element => {
         pins.push(
            <MapView.Marker
               key={i++}
               pinColor='#3498DB'
               coordinate={{
                  "latitude": element["GTFS Latitude"],
                  "longitude": element["GTFS Longitude"],
               }}
               title={element["Stop Name"]}
               description={`${element["Daytime Routes"]}`}
            />
         )
      })
      this.setState({
         markers: pins
      })
   }

   render() {
      let data = regionFrom(40.7831, -73.9712, 10000);
      return (
         <View style={styles.container}>
            <MapView style={styles.map}
               initialRegion={{
                  latitude: 40.7549,
                  longitude: -73.9840,
                  latitudeDelta: .009,
                  longitudeDelta: 0.009,
               }}
               showsUserLocation={true}
            >
               {this.state.markers}
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
