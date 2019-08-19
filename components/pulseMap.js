import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

export default class Pulse extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			marginBottom: 1,
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		let pins = [];
		try {
			let { data } = await axios.get('http://mta-real-time.herokuapp.com/trains/now')
			let i = 0;
			for (let stations of data) {
				for (let station of stations) {
					pins.push(
						<MapView.Marker
							key={i++}
							pinColor='#3498DB'
							coordinate={{
								"latitude": station[`latitude`],
								"longitude": station[`Longitude`],
							}}
							title={station["stopName"]}
							description={`${station[`train`]}`}>
							<MapView.Callout onPress={() => this.goToSingleStation(station[`stationId`])}>
								<Text>{station["stopName"]}{"\n"}{`${station[`train`]}`}</Text>
							</MapView.Callout>
						</MapView.Marker>
					)
				}
			}
			if (this._isMounted) {
				this.setState({
					markers: pins
				})
			}
		} catch (err) {
			console.log(err)
		}

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	goToSingleStation = async (stationId) => {
		let stationName = await this.getStationName(stationId);
		Actions.singleTrainStation({ stationId: `${stationId}`, title: `${stationName}` })
	}

	getStationName = async (stationId) => {
		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/stations/${stationId}`);
			return data[`Stop Name`]
		} catch (err) {
			console.log(err)
		}
	}

	onMapReady = () => this.setState({ marginBottom: 0 })

	render() {
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
					showsCompass={false}
					loadingEnabled={true}>
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
