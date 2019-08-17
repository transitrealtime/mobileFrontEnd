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
                    <TrainsView></TrainsView>
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
        justifyContent: "center",
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
    }
})
export default Home