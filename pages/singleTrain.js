import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import TrainsView from '../components/trainView';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stations: [],
            train: "",
            trainColors : {
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
                "Z": "#996633"
            }
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
            let color2 = this.state.trainColors[this.props.trains];
            const circle = StyleSheet.create({
                button: {
                    padding : 5,
                    borderRadius: 15,
                    margin: 2,
                    borderWidth: 0.5,
                    borderColor: color2
                },
            })
            return (
                // <TouchableOpacity style={{ color: this.state.trainColors[this.state.train] }} to={`/train/${this.state.train}/${item.stationId}`}><Text>{item.stationName}</Text></TouchableOpacity>
                <TouchableOpacity style={circle.button} key={item.stationId}><Text style={{color : color2}}>{item.stationName}</Text></TouchableOpacity>
            )
        }
        )
    )

    render() {
        return (
            <ScrollView >
                <TrainsView></TrainsView>
                <Text style={styles.header}>{this.props.trains}</Text>
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
    header: {
        fontSize: 150,
        textAlign: 'center'
    }
})
export default Home