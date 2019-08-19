import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { regionFrom } from './getRegion'


export default class App extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			marginBottom: 1,
			location: [],
			distance: [],
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		try {
			await navigator.geolocation.getCurrentPosition(
				async position => {
					const obj = JSON.stringify(position);
					const location = JSON.parse(obj)
					try {
						let { data } = await axios.get('https://mta-real-time.herokuapp.com/stations');
						const currLoc = [location[`coords`][`latitude`], location[`coords`][`longitude`]];
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
									pinColor='#3498DB'
									coordinate={{
										"latitude": element[`station`]["GTFS Latitude"],
										"longitude": element[`station`]["GTFS Longitude"],
									}}
									title={element[`station`]["Stop Name"]}
									description={`${element[`station`]["Daytime Routes"]}`}>
									<MapView.Callout onPress={() => this.goToSingleStation(element[`stationId`])}>
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
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			);
		} catch (err) {
			console.log(err)
		}
	}

	goToSingleStation = async (stationId) => {
		let stationName = await this.getStationName(stationId);
		Actions.singleTrainStation({stationId: `${stationId}`, title: `${stationName}` })
	}

	getStationName = async (stationId) => {
		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/stations/${stationId}`);
			return data[`Stop Name`]
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
		if (this.state.distance.length > 0) {
			//    console.log(this.state.distance)
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
					showsCompass={false}
				>
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
