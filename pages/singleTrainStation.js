import React from 'react'
import { StyleSheet, Text, View,ScrollView, RefreshControl } from 'react-native';
import { Card, CardItem} from 'native-base'
import axios from 'axios';

class singleTrainStation extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props)
		this.state = {
			northBound: [],
			southBound: [],
			trainColors: {
				1: "#EE352E",
				2: "#EE352E",
				3: "#EE352E",
				4: "#00933C",
				5: "#00933C",
				6: "#00933C",
				7: "#B933AD",
				"A": "#0039A6",
				"B": "#FF6319",
				"C": "#0039A6",
				"D": "#FF6319",
				"E": "#0039A6",
				"F": "#FF6319",
				"G": "#6CBE45",
				"J": "#996633",
				"L": "#808183",
				"M": "#FF6319",
				"N": "#FCCC0A",
				"Q": "#FCCC0A",
				"R": "#FCCC0A",
				"S": "#808183",
				"W": "#FCCC0A",
				"Z": "#996633",
				refreshing: false,
			}
		}
	}
	
	fetchTrainTimes = async () =>{
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
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


	allBoundTime = () => {
		let sideIndex = -1;
		let empty = true;
		let AllTrains = [this.state.northBound, this.state.southBound].map((side) => {
			let display = side.length !== 0 ? side.map((train, i) => {
				empty = false;
				let arrivalFirst = "";
				let arrivalRest = "";
				for (let i = 0; i < train.length; i++) {
					if (i === 0) arrivalFirst = train[i].minutesArrival;
					else {
						arrivalRest += train[i].minutesArrival + ' , ';
					}
				}
				if (train.length !== 0) {
					return (
						<View key={i}>
							<CardItem header bordered style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
								<View style={[styles.circles, { backgroundColor: this.state.trainColors[train[0]["routeId"]] }]}>
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
			}) : <CardItem><Text style={{ fontSize: 20 }}>{'No Trains Found :('}</Text></CardItem>
			return (
				<View key = {sideIndex++}>
					<Card><CardItem header style={{ flex: 1, justifyContent: 'center' }}><Text style={{ fontSize: 20 }}>{sideIndex === 0 ?'North Bound' : 'South Bound'} </Text></CardItem></Card>
					{empty ? <Card><CardItem><Text style={{ fontSize: 20 }}>{'No Trains Found :('}</Text></CardItem></Card> : <Card>{display}</Card>}
				</View>
			)
		})
		return <View>
			{AllTrains}
		</View>
	}

	render() {
		return (
			<ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
			}>
				{this.allBoundTime()}
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