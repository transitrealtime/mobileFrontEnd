import React from 'react'
import { Card, CardItem, Header, Container, Title, Icon, Body, Right, Left } from 'native-base'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import trainColors from './trainColors'

export default class Favorites extends React.Component {
    _isMounted = false;
    constructor(props) {
        super();
        this.state = {
            favorites: [],
            hide: true
        }
    }

    getFavorites = async () => {
        try {
            let { data } = await axios.get(`https://mta-real-time.herokuapp.com/favorite/${Expo.Constants.installationId}/stations`);
            if (this._isMounted) {
                this.setState({
                    favorites: data
                })
            }
        } catch (error) {
            console.log(error);
        }

    }

    goToSingleStation = async (train, stationId, stationName) => {
        Actions.singleTrainStation({ train: `${train}`, stationId: `${stationId}`, stationName: stationName, title: `${train} Train ${stationName}` })
    }

    removeFavorite = async (decode) => {
        console.log(decode);
        console.log(Expo.Constants.installationId)
        try {
            await axios.put(`https://mta-real-time.herokuapp.com/favorite/${Expo.Constants.installationId}/${decode}`)
        } catch (error){
            console.log(error);
        }
        this.getFavorites();
    }

    seedFavorites = () => {
        let favs = this.state.favorites.length !== 0 ? this.state.favorites.map((element, i) => {
            let decoded = element.split(',');
            return (
                <CardItem bordered button key={i} style={{ display: 'flex', justifyContent: 'space-between' }} onPress={() => this.goToSingleStation(decoded[0], decoded[1], decoded[2])}>
                    <View style = {[styles.circle,{backgroundColor : trainColors[decoded[0]]}]}><Text style={{color:'white',fontSize:15}}>{decoded[0]}</Text></View>
                    <Text>{decoded[2]}</Text>
                    <Right>
                        <Icon onPress={() => { this.removeFavorite(element) }} name="ios-heart" style={{ color: 'red' }}  >
                        </Icon>
                        {/* hitSlop={{top: 50, bottom: 50, left: 80, right: 50}} */}
                    </Right>
                </CardItem>)
        }) : <CardItem bordered><Text>No Favorites</Text></CardItem>
        return favs;
    }

    display = () => {
        this.setState({
            hide: !this.state.hide
        })
        this.getFavorites();
    }

    componentDidMount() {
        this._isMounted = true;
        this.getFavorites();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return <View style={{ alignSelf: 'stretch', marginBottom: 20 }}>
            <Card>
                <CardItem header button onPress={() => { this.display() }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{fontSize: 20 }}>Favorites</Text>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </CardItem>
            </Card>
            {this.state.hide ? <View></View> : <Card>{this.seedFavorites()}</Card>}
        </View>
    }
}

const styles = StyleSheet.create({
    circle : {
        width :20,
        height :20,
        borderRadius : 10,
        display: 'flex',
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center",
    }
})