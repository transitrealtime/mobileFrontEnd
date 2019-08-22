import React from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Card, CardItem, Header, Container, Title, Icon, Body, Right, Left } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios';
import trainColors from '../components/trainColors'
import { TouchableOpacity } from 'react-native-gesture-handler';


class singleTrainStation extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props)
		this.state = {
			northBound: [],
			southBound: [],
			refreshing: false,
			heart: "ios-heart-empty",
		}
	}

	fetchTrainTimes = async () => {
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
				let northBound = [];
				let southBound = [];
				for (let element of dayTimeTrains) {
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
						northBound.push(north);
						southBound.push(south);

					}
				}
				if (this._isMounted) {
					this.setState({
						northBound,
						southBound
					})
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	_onRefresh = () => {
		this.setState({ refreshing: true });
		this.fetchTrainTimes().then(() => {
			this.setState({ refreshing: false });
		});
	}

	async componentDidMount() {
		this._isMounted = true;
		this.fetchTrainTimes();
		this.isFavorite();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


	allBoundTime = () => {
		let sideIndex = -1;
		let empty = true;
		let AllTrains = [this.state.northBound, this.state.southBound].map((side) => {
			let display;
			if (side.length !== 0) {
				display = side.map((train, i) => {
					let arrivalFirst = "";
					let arrivalRest = "";
					for (let i = 0; i < train.length; i++) {
						if (i === 0) arrivalFirst = train[i].minutesArrival;
						else {
							arrivalRest += train[i].minutesArrival + ' , ';
						}
					}
					if (train.length !== 0) {
						empty = false;
						return (
							<View key={i}>
								<CardItem header bordered style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
									<View style={[styles.circles, { backgroundColor: trainColors[train[0]["routeId"]] }]}>
										<Text style={{ fontSize: 30, color: 'white', fontWeight: "bold" }}>
											{train[0]["routeId"]}
										</Text>
									</View>
									<View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
										<Text style={{ fontSize: 20 }}>
											{arrivalFirst == 'Arriving Now' ? `${arrivalFirst}` : `Arriving in ${arrivalFirst}`}
										</Text>
										<Text>
											{arrivalRest.substring(0, arrivalRest.length - 2)}
										</Text>
									</View>
								</CardItem>
							</View>
						)
					}
				})
			}
			return (
				<View key={sideIndex++}>
					<Card><CardItem header style={{ flex: 1, justifyContent: 'center' }}><Text style={{ fontSize: 20 }}>{sideIndex === 0 ? 'Uptown' : 'Downtown'} </Text></CardItem></Card>
					{empty == true ? <Card><CardItem><Text style={{ fontSize: 20 }}>{'No Trains Found :('}</Text></CardItem></Card> : <Card>{display}</Card>}
				</View>
			)
		})
		return <View>
			{AllTrains}
		</View>
	}

	isFavorite = async () => {
		let string = `${this.props.train},${this.props.stationId},${this.props.stationName}`
		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/favorite/${Expo.Constants.installationId}/stations`);
			if (data.includes(string)) {
				this.setState({
					heart: 'ios-heart'
				})
			}
		}
		catch (err) {
			console.log(err);
		}
	}

	fetchFavoriteTrains = async () => {
		let string = `${this.props.train},${this.props.stationId},${this.props.stationName}`
		console.log(string)
		try {
			if (this.state.heart === "ios-heart-empty") {
				await axios.post(`https://mta-real-time.herokuapp.com/favorite/${Expo.Constants.installationId}/${string}`)
			} else {
				await axios.put(`https://mta-real-time.herokuapp.com/favorite/${Expo.Constants.installationId}/${string}`)
			}
			this.setState({
				heart: this.state.heart === "ios-heart-empty" ? "ios-heart" : "ios-heart-empty"
			})
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Container>
				<Header style={{ backgroundColor: 'white' }}>
					<Left>
						<TouchableOpacity onPress={() => { Actions.pop() }} >
							<Icon name="arrow-back" style={{ marginLeft: 5, fontSize: 35, color: '#1e90ff' }} >
							</Icon>
						</TouchableOpacity>
					</Left>
					<Body style={{ flex: 3 }}><Text style={{ fontSize: 17.5, fontWeight: "600" }}>{this.props.title}</Text></Body>
					<Right>
						<TouchableOpacity onPress={() => this.fetchFavoriteTrains()}>
						<Icon
								name={this.state.heart}
								style={this.state.heart === "ios-heart-empty" ? { fontSize: 35 } : { fontSize: 35, color: 'red' }}
							>
							</Icon>
						</TouchableOpacity>
					</Right>
				</Header>
				<ScrollView refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
					/>
				}>
					{this.allBoundTime()}
				</ScrollView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	circles: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		width: 50,
		height: 50,
	}
})

export default singleTrainStation