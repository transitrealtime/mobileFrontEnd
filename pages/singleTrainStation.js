import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class singleTrainStation extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props)
		this.state = {
			northBound: [],
			southBound: []
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		let dayTimeTrains = [];
		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/stations/${this.props.stationId}`);
			let x = data[`Daytime Routes`]
			if (isNaN(x)) {
				dayTimeTrains = x.split(' ');
			} else {
				dayTimeTrains.push(x);
			}
			if (dayTimeTrains.length > 0) {
				dayTimeTrains.forEach(async (element) => {
					let found = true;
					let data = [];
					try {
						 data = await axios.get(`https://mta-real-time.herokuapp.com/trains/${element}/${this.props.stationId}`).then(res => res.data)
					} catch (err){
						found = false;
					}
					if (found) {
						let north = data.northBound;
						let south = data.southBound;
						if (data.northBound.length > 3) north = data.northBound.slice(0,3);
						if (data.southBound.length > 3) south = data.southBound.slice(0,3);
						if(this._isMounted){
							this.setState({
								northBound: [...this.state.northBound, ...north],
								southBound: [...this.state.southBound, ...south]
							})
						}
					}
				});
			}
		} catch (err) {
			console.log(err)
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


	northBoundTime = () => {
		let display = this.state.northBound.length !== 0 ? this.state.northBound.map((train, i) => {
			i++;
			return (
				<Text key={i}>{train.routeId}{` Train - `}{train.minutesArrival}</Text>
			)
		}) : <Text>{'No Trains Found'}</Text>
		return (
			<View><Text>NorthBound:</Text>{display}</View>
		)
	}

	southBoundTime = () => {
		let display = this.state.southBound.length !== 0 ? this.state.southBound.map((train, i) => {
			i++;
			return (
				<Text key={i}>{train.routeId}{` Train - `}{train.minutesArrival}</Text>
			)
		}) : <Text>{'No Trains Found'}</Text>
		return (
			<View><Text>SouthBound:</Text>{display}</View>
		)
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View>{this.northBoundTime()}</View>
					<View>{this.southBoundTime()}</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
})

export default singleTrainStation