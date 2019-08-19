import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import { Card, CardItem, Right, Icon } from 'native-base'
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
					} catch (err) {
						found = false;
					}
					if (found) {
						let north = data.northBound;
						let south = data.southBound;
						if (data.northBound.length > 3) north = data.northBound.slice(0, 3);
						if (data.southBound.length > 3) south = data.southBound.slice(0, 3);
						if (this._isMounted) {
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
			return (
				<CardItem bordered key={i}><Text style={{fontSize:20}}>{train.routeId}{` Train - `}{train.minutesArrival}</Text></CardItem>
			)
		}) : <CardItem><Text style={{fontSize:20}}>{'No Trains Found :('}</Text></CardItem>
		return (
			<Card style={{ alignSelf: 'stretch' }}>
				<CardItem header><Text style={{fontSize:20}}>NorthBound - </Text></CardItem>
				{display}
			</Card>
		)
	}

	southBoundTime = () => {
		let display = this.state.southBound.length !== 0 ? this.state.southBound.map((train, i) => {
			return (
				<CardItem bordered key={i}><Text style={{fontSize:20}}>{train.routeId}{` Train - `}{train.minutesArrival}</Text></CardItem>
			)
		}) : <CardItem><Text style={{fontSize:20}}>{'No Trains Found :('}</Text></CardItem>
		return (
			<Card style={{ alignSelf: 'stretch' }}>
				<CardItem header><Text style={{fontSize:20}}>SouthBound - </Text></CardItem>
				{display}
			</Card>
		)
	}

	render() {
		return (
			<ScrollView>
				{this.northBoundTime()}
				{this.southBoundTime()}
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