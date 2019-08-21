import React from 'react';
import axios from 'axios';
import { ScrollView, RefreshControl, TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native';
import { Container, Card, CardItem, Thumbnail, Left, Body, Right, Icon } from 'native-base';
import moment from 'moment';

export default class Feed extends React.Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
        };
    };

    async componentDidMount() {
        this._isMounted = true;
        this.getTwitterFeed();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.updateTwitterFeed().then(() => {
            this.setState({ refreshing: false });
        });
    }

    getTwitterFeed = async () => {
        try {
            const { data } = await axios.get(`https://mta-real-time.herokuapp.com/tweets`);
            if (this._isMounted) {
                this.setState({
                    data: data,
                    date: data.date
                })
            }

        } catch (err) {
            console.log(err)
        }
    }

    updateTwitterFeed = async () => {
        try {
            await axios.post(`https://mta-real-time.herokuapp.com/tweets/update`)
            this.getTwitterFeed();
        } catch (err) {
            console.log(err)
        }
    }

    displayFeed = () => {
        let map = this.state.data.reverse().map((item, i) => {
            return (
                <Card style={{ flex: 0 }} key={i}>
                    <CardItem>
                        <Left>
                            <Thumbnail large source={{ uri: 'https://pbs.twimg.com/profile_images/1145800410386632705/rTXd0t2C.png' }} />
                            <Body>
                                <Text style={{fontWeight:'bold'}}>@NYCTSubway · {moment(new Date(item.timestamp)).startOf('hh:mm').fromNow()}</Text>
                                <Text note>
                                    {moment(new Date(item.timestamp)).format('dddd MMMM D, YYYY')}
                                </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem >
                        <Body>
                            <Text style={{ fontSize: 15 }}>
                                {item.text}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            )
        })
        return (
            <View>{map}</View>
        )
    }

    render() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
                
            }>
                {this.displayFeed()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

});