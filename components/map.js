import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { regionFrom } from './getRegion'


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			marginBottom: 1,
			location: []
		}
	}
	
	async componentDidMount(){
		try{
			await navigator.geolocation.getCurrentPosition(
				position => {
					const obj = JSON.stringify(position);
					const location = JSON.parse(obj)
					console.log(location)
					this.setState({ location });
				},
				error => Alert.alert(error.message),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			);
		}catch (err){
			console.log(err)
		}
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

	onMapReady = () => this.setState({ marginBottom: 0 })

	render() {
		let data = regionFrom(40.7831, -73.9712, 10000);
		//console.log(data);
		if(this.state.location.length>0){
			console.log(this.state.location)
		}
		return (
			<View style={styles.container}>
				<MapView provider={PROVIDER_GOOGLE}
					onMapReady={this.onMapReady}
					style={[styles.map, { flex: 1, marginBottom: this.state.marginBottom }]}
					initialRegion={{
						latitude: 40.7549,
						longitude: -73.9840,
						latitudeDelta: 0,
						longitudeDelta: 0.08983111749910169,
					}}
					showsUserLocation={true}
					showsMyLocationButton={true}
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
