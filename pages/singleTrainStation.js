import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class singleTrainStation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			northBound: [],
			southBound: []
		}
	}

	async componentDidMount() {
		let dayTimeTrains = [];
		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/stations/${this.props.stationId}`);
			let x = data[`Daytime Routes`]
			console.log(x);
			if (isNaN(x)) {
				dayTimeTrains = x.split(' ');
			} else {
				dayTimeTrains.push(x);
			}
			console.log(dayTimeTrains);
			if (dayTimeTrains.length > 0) {
				dayTimeTrains.forEach(async (element) => {
					let found = true;
					let data = [];
					try {
						 data = await axios.get(`https://mta-real-time.herokuapp.com/trains/${element}/${this.props.stationId}`).then(res => res.data)
					} catch (err){
						found = false;
					}
					console.log(data);
					if (found) {
						this.setState({
							northBound: [...this.state.northBound, ...data.northBound],
							southBound: [...this.state.southBound, ...data.southBound]
						})
					}
				});
			}
		} catch (err) {
			console.log(err)
		}
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
		justifyContent: "center",
	},
})

export default singleTrainStation