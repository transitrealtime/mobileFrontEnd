import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

const trainColors = require('./trainColors')


export default class App extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			marginBottom: 1,
			location: [],
			distance: [],
			initialRegion: [],
		}
	}

	
	goToSingleStation = async (stationId, train, stationName) => {
		Actions.singleTrainStation({ stationId: `${stationId}`, title: `${stationName}`, stationName: stationName, train: train })
	}

	async componentDidMount() {
		this._isMounted = true;
		try {
			await navigator.geolocation.getCurrentPosition(
				async position => {
					const obj = JSON.stringify(position);
					const location = JSON.parse(obj)
					const currLoc = [location[`coords`][`latitude`], location[`coords`][`longitude`]];
					console.log(currLoc)
					let region = {
						latitude: location[`coords`][`latitude`],
						longitude: location[`coords`][`longitude`],
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					}
					this.mapView.animateToRegion(region,1000);
					if(this._isMounted){
						this.setState({
							initialRegion:region
						})
					}
					try {
						let { data } = await axios.get('https://mta-real-time.herokuapp.com/stations');
						let distance = [];
						for (let stations in data) {
							distance.push({
								station: data[stations],
								stationId: stations,
								distance: this.haversine(currLoc, [data[stations]["GTFS Latitude"], data[stations]["GTFS Longitude"]])
							})
						}
						let nearBy = []
						let i = 0;
						distance.sort(function (a, b) { return a.distance - b.distance; }).slice(0, 5).forEach(element => {
							nearBy.push(
								<MapView.Marker
									key={i++}
									pinColor={trainColors[element[`station`]["Daytime Routes"].toString()[0]]}
									coordinate={{
										"latitude": element[`station`]["GTFS Latitude"],
										"longitude": element[`station`]["GTFS Longitude"],
									}}
									title={element[`station`]["Stop Name"]}
									description={`${element[`station`]["Daytime Routes"]}`}>
									<MapView.Callout onPress={() => this.goToSingleStation(
										element[`stationId`], element[`station`][`Daytime Routes`].toString()[0],
										element[`station`]["Stop Name"])}>
										<Text>{element[`station`]["Stop Name"]}{"\n"}{`${element[`station`]["Daytime Routes"]}`}</Text>
									</MapView.Callout>
								</MapView.Marker>
							)
						});
						if (this._isMounted) {
							this.setState({
								distance: nearBy
							})
						}
					} catch (err) {
						console.log(err)
					}
				},
				error => Alert.alert(error.message),
				{ timeout: 20000, maximumAge: 1000 }
			);
		} catch (err) {
			console.log(err)
		}
	}

	haversine = ([lat1, lon1], [lat2, lon2]) => {
		const [pi, asin, sin, cos, sqrt, pow, round] = [
			'PI', 'asin', 'sin', 'cos', 'sqrt', 'pow', 'round'
		]
			.map(k => Math[k]),
			[rlat1, rlat2, rlon1, rlon2] = [lat1, lat2, lon1, lon2]
				.map(x => x / 180 * pi),

			dLat = rlat2 - rlat1,
			dLon = rlon2 - rlon1,
			radius = 6372.8;
		return round(
			radius * 2 * asin(
				sqrt(
					pow(sin(dLat / 2), 2) +
					pow(sin(dLon / 2), 2) *
					cos(rlat1) * cos(rlat2)
				)
			) * 100
		) / 100;
	};

	componentWillUnmount() {
		this._isMounted = false;
	}

	onMapReady = () => this.setState({ marginBottom: 0 })

	render() {
		if (this.state.initialRegion.length > 0) {
			console.log(initialRegion)
		}
		return (//provider={PROVIDER_GOOGLE}
			<View style={styles.container}>
				<MapView 
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
					showsCompass={false}
					loadingEnabled={true}
					ref={ref => { this.mapView = ref }}>
					{this.state.distance}
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
