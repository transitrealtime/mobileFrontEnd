import React from 'react'
import { Card, CardItem, Header, Container, Title, Icon, Body, Right, Left } from 'native-base'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';

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

    seedFavorites = () => {
        let favs = this.state.favorites.length !== 0 ? this.state.favorites.map((element, i) => {
            return (<CardItem bordered key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>{element}</Text>
                <Right><Icon name="star" style={{ color: '#CCCC00' }}></Icon></Right>
            </CardItem>)
        }) : <CardItem bordered><Text>No Favorites</Text></CardItem>
        return favs;
    }

    display = () => {
        
        this.setState({
            hide: !this.state.hide
        })
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
                    <Text style={{ fontSize: 20 }}>Favorites</Text>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </CardItem>
            </Card>
            {this.state.hide ? <View></View> : <Card>{this.seedFavorites()}</Card>}
        </View>
    }
}