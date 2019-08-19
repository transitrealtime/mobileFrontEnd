import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';


const allMaps = () => {
	const goToAllPins = () => {
		Actions.pinMap()
	}
	const goToLocationMap = () => {
		Actions.locationMap()
	}
	return (
		<Container style={styles.container}>
			<View style={styles.view}>
				<Button onPress={goToAllPins}>
					<FontAwesome5 style={{ fontSize: 20, color: 'white', margin: 19 }} name="map-pin" />
				</Button>
				<Text style={{marginLeft:10}}>All Station</Text>
			</View>
			<View style={styles.view}>
				<Button>
					<Ionicons style={{ fontSize: 20, color: 'white', margin: 17}} name="md-pulse" />
				</Button>
				<Text style={{marginLeft:10}}>NYC Pulse</Text>
			</View>
			<View style={styles.view}>
				<Button onPress={goToLocationMap}>
					<Entypo style={{ fontSize: 20, color: 'white', margin: 15 }} name="location" />
				</Button>
				<Text style={{marginLeft:10}}>Where Am I</Text>
			</View>
		</Container>

	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexDirection: 'column'
	},
	view: {
		display: 'flex',
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	text:{
		marginLeft:10
	}
})
export default allMaps