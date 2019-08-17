import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView , PixelRatio} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import TrainsView from '../components/trainView';

let FONT_BACK_LABEL   = 18;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 14;
}

class Home extends React.Component {
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
            return (
                <TouchableOpacity style={[styles.button, { borderColor: color2 }]} key={item.stationId}><Text style={[styles.stationText,{ color: color2}]}>{item.stationName}</Text></TouchableOpacity>
            )
        }
        )
    )

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style = {styles.circles}>{this.props.trains}</Text>
                    {/* <Text style={styles.header}>{this.props.trains}</Text> */}
                    <View >{this.display()}</View>
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
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    button: {
        padding: 5,
        borderRadius: 15,
        margin: 2,
    },
    stationText : {
        fontSize : FONT_BACK_LABEL,
        display : 'flex',
        flexWrap : 'wrap'
    },
    circles: {
        margin: 5,
        textAlign: 'center',
        fontSize: 60,
        borderRadius: 30,
        borderWidth: 1,
        width: 60,
        height: 60,
    }
})
export default Home