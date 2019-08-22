import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { connect } from "react-redux";
import { getRouteThunk } from '../store/utilities/directionRoute';
import axios from 'axios';

class directionsMap extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			marginBottom: 1,
			connectors: []
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		try {
			await this.props.getRoute()
			let connectors = [];
			let pins = [];
			let i =0;
			this.props.routes.steps.forEach((step, i) => {
				if (step.transitType === "WALKING") {
					connectors.push(
						<Polyline key={i}
							coordinates={step.polyline}
							strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
							strokeWidth={6}
							lineDashPattern={[10]}
							lineCap="round"
						/>)
				}
				else {
					connectors.push(
						<Polyline key={i}
							coordinates={step.trainInfo.polyLine}
							strokeColor={step.trainInfo.trainColor} // fallback for when `strokeColors` is not supported by the map-provider
							strokeWidth={6}
							lineCap="round"
						/>)
				}
			})
			if (this._isMounted) {
				this.setState({
					connectors: connectors
				})
			}
		} catch (err) {
			console.log(err)
		}

	}

	// 	else {
	// 		console.log(step.trainInfo.startLocation.latitude)
	// 	}
	// console.log(step.startLocation.latitude)
	// connectors.push(<Polyline key={i}
	// 	coordinates={[
	// 		{latitude:step.startLocation.latitude, longitude: step.startLocation.longitude},
	// 		{latitude:step.endLocation.latitude, longitude: step.endLocation.longitude}
	// 	]}
	// 	strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
	// 	strokeColors={[
	// 		'#7F0000',
	// 		'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
	// 		'#B24112',
	// 		'#E5845C',
	// 		'#238C23',
	// 		'#7F0000'
	// 	]}
	// 	strokeWidth={6}
	// />)
	// })
	componentWillUnmount() {
		this._isMounted = false;
	}


	onMapReady = () => this.setState({ marginBottom: 0 })

	render() {
		return (
			<View style={styles.container}>
				<MapView provider={PROVIDER_GOOGLE}
					onMapReady={this.onMapReady}
					style={[styles.map, { marginBottom: this.state.marginBottom }]}
					initialRegion={{
						latitude: 40.7549,
						longitude: -73.9840,
						latitudeDelta: 0,
						longitudeDelta: 0.08983111749910169,
					}}
					showsCompass={false}
					loadingEnabled={true}>
					{this.state.connectors}
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

const mapState = (state) => {
	return {
		routes: state.routes
	}
}

const mapDispatch = (dispatch) => {
	return {
		getRoute: () => dispatch(getRouteThunk())
	}
}

export default connect(mapState, mapDispatch)(directionsMap);