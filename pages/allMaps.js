import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const allMaps = () => {
	const goToAllPins = () => {
		Actions.pinMap()
	}
	return (
		<Container>
			<Text>hi</Text>
			<Container style={styles.container}>
				<Button onPress={goToAllPins}>
					<FontAwesome5 style={{ fontSize: 20, color: 'white', margin: 19 }} name="map-pin" />
				</Button>
				<Button>
					<Icon style={{ fontSize: 20, color: 'white', margin: 15 }} name="pulse" />
				</Button>
				<Button>
					<Entypo style={{ fontSize: 20, color: 'white', margin: 15 }} name="location" />
				</Button>
			</Container>
		</Container>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexDirection: 'row'
	},
})
export default allMaps