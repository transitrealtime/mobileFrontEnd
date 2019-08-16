import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import TrainsView from '../components/trainView';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stations: [],
            train: ""
        }
    }

    goToAbout = () => {
        Actions.about()
    }
    goToTrain = () => {
        Actions.train()
    }

    async componentDidMount() {
        try {
            let { data } = await axios.get(`https://mta-real-time.herokuapp.com/trains/${this.props.trains}`);
            this.setState({
                stations: data,
                train: this.props.trains
            })
        } catch (err) {
            console.log(err)
        }
    }

    display = () => (
        this.state.stations.map(item => {
            return (
                // <TouchableOpacity style={{ color: this.state.trainColors[this.state.train] }} to={`/train/${this.state.train}/${item.stationId}`}><Text>{item.stationName}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} key={item.stationId}><Text>{item.stationName}</Text></TouchableOpacity>
            )
        }
        )
    )

    render() {
        return (
            <ScrollView >
                <TrainsView></TrainsView>
                <Text style = {styles.header}>{this.props.trains}</Text>
                <View style={styles.text}>{this.display()}</View>
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
    button: {
        borderRadius: 15,
        margin: 2,
        // borderWidth : 1,
    },
    header : {
        fontSize : 150,
        textAlign :'center'
    }
}) 
export default Home