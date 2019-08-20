import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import { Card, CardItem, Right, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

let FONT_BACK_LABEL = 18;

if (PixelRatio.get() <= 2) {
	FONT_BACK_LABEL = 14;
}

class Home extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props)
		this.state = {
			stations: [],
			train: "",
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
				"N": 'rgb(217,189,17)',
				"Q": 'rgb(217,189,17)',
				"R": 'rgb(217,189,17)',
				"S": "#808183",
				"W": 'rgb(217,189,17)',
				"Z": "#996633"
			}
		}
	}

	goToSingleStation = async (train, stationId) => {
		let stationName = await this.getStationName(stationId);
		Actions.singleTrainStation({ train: `${train}`, stationId: `${stationId}`, title: `${train} Train ${stationName}` })
	}

	getStationName = async (stationId) => {
		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/stations/${stationId}`);
			return data[`Stop Name`]
		} catch (err) {
			console.log(err)
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		try {
			let { data } = await axios.get(`https://mta-real-time.herokuapp.com/trains/${this.props.trains}`);
			if (this._isMounted) {
				this.setState({
					stations: data,
					train: this.props.trains
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	display = () => (
		this.state.stations.map((item, i) => {
			let color2 = this.state.trainColors[this.props.trains];
			return (
				<CardItem
					key={i}
					bordered button
					onPress={() => this.goToSingleStation(this.props.trains, item.stationId)}
					style = {{display :'flex',flexDirection: 'row', justifyContent: 'space-between'}}
				>
					<Text style={[styles.stationText, { color: color2 }]}>
						{`${item.stationName}`}
					</Text>
					<Right>
						<Icon name="arrow-forward" />
					</Right>
				</CardItem>
			)
		})
	)
	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={[styles.circles, { backgroundColor: this.state.trainColors[this.props.trains] }]}><Text style={{ fontSize: 30, color: 'white' }}>{this.props.trains}</Text></View>
					<Card style = {{ alignSelf: 'stretch'}}>{this.display()}</Card>
				</View>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
	text: {
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontSize: 150,
		textAlign: 'center'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: "center",
	},
	stationText: {
		fontSize: FONT_BACK_LABEL,
	},
	circles: {
		marginTop: 5,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		width: 50,
		height: 50,
	}
})
export default Home