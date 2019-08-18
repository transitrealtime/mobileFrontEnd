import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { regionFrom } from './getRegion'


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			marginBottom: 1,
		}
	}
	
	async componentDidMount(){
		try{
			await navigator.geolocation.getCurrentPosition(
				position => {
					const location = JSON.stringify(position);
					console.log(location)
					this.setState({ location });
				},
				error => Alert.alert(error.message),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			);
		}catch (err){
			console.log(err)
		}
	}
	
	onMapReady = () => this.setState({ marginBottom: 0 })

	render() {
		let data = regionFrom(40.7831, -73.9712, 10000);
		console.log(data);
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
					<MapView.Marker
						coordinate={{
							latitude: 40.7549,
							longitude: -73.9840
						}}
						title={"home"}
						description={"here"}
					/>
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
