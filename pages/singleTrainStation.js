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
			if (isNaN(x)) {
				dayTimeTrains = x.split(' ').map(Number);
			} else {
				dayTimeTrains.push(x);
			}
			console.log(dayTimeTrains)
			if (dayTimeTrains.length) {
				dayTimeTrains.forEach(async(element) => {
					console.log(element)
					try {
						let { data } = await axios.get(`https://mta-real-time.herokuapp.com/trains/${element}/${this.props.stationId}`);
						console.log([...this.state.northBound,...data.northBound])
						this.setState({
							northBound: [...this.state.northBound,...data.northBound],
							southBound: [...this.state.southBound,...data.southBound]
						})
						console.log("============================================================================")
					} catch (err) {
						console.log(err);
					}
				});
			}else if(dayTimeTrains.length === 1){
				try {
					let { data } = await axios.get(`https://mta-real-time.herokuapp.com/trains/${dayTimeTrains[0]}/${this.props.stationId}`);
					this.setState({
						northBound: data.northBound,
						southBound: data.southBound
					})
				} catch (err) {
					console.log(err);
				}
			}
		} catch (err) {
			console.log(err)
		}

		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/trains/${this.props.train}/${this.props.stationId}`);
			this.setState({
				northBound: data.northBound,
				southBound: data.southBound
			})
		} catch (err) {
			console.log(err);
		}
	}

	northBoundTime = () => {
		let display = this.state.northBound.map((train,i) => {
			i++;
			return (
				<Text key={i}>{train.routeId}{` Train - `}{train.minutesArrival}</Text>
			)
		})
		return (
			<View><Text>NorthBound:</Text>{display}</View>
		)
	}

	southBoundTime = () => {
		let display = this.state.southBound.map((train,i) => {
			i++;
			return (
				<Text key={i}>{train.minutesArrival}</Text>
			)
		})
		return (
			<View><Text>SouthBound:</Text>{display}</View>
		)
	}

	render() {
		{console.log(this.state.northBound)}
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