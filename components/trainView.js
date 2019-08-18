import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import { Actions } from 'react-native-router-flux'


let FONT_BACK_LABEL = 40;

if (PixelRatio.get() <= 2) {
    FONT_BACK_LABEL = 30;
}

const trainsView = () => {
    const trainColors = {
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

    const goToSingleTrain = (train) => {
        Actions.singleTrain({ trains: `${train}`, title: `${train} Train` });
    }
    let redTrains = ["1", "2", "3"];
    let greenTrains = ["4", "5", "6"];
    let blueTrains = ["A", "C", "E"];
    let orangeTrains = ["B", "D", "F", "M"];
    let yellowTrains = ["N", "Q", "R", "W"];
    let grayTrains = ["L","S"];
    let brownTrains = ["J", "Z"];
    let purpleTrains = ["7","G"];
    //let lightGreenTrains = ["G"];
    let allTrains = [redTrains, greenTrains, blueTrains, orangeTrains, yellowTrains, grayTrains, brownTrains, purpleTrains];
    //let train = ["1", "2", "3", "4", "5", "6", "A", "C", "E", "B", "D", "F", "M", "N", "Q", "R", "W", "L" ,"J","Z", "S", "G","7"];
    let x = 0;
    let display = allTrains.map(trains => {
        let innerDisplay = trains.map(item => {
            return (
                <TouchableOpacity onPress={() => goToSingleTrain(item)} style={[style.circles, { borderColor: trainColors[item] }]} key={item}><Text style={{ color: trainColors[item], fontSize: FONT_BACK_LABEL }}>{item}</Text></TouchableOpacity>
            )
        })
        return (
            <View key = {x++} style = {{flexDirection :'row'}}>
                {innerDisplay}
            </View>
        )
    })
    // let display = train.map(item => {
    //     return (
    //         <TouchableOpacity onPress={() => goToSingleTrain(item)} style={[style.circles, { borderColor: trainColors[item] }]} key={item}><Text style={{ color: trainColors[item], fontSize: FONT_BACK_LABEL }}>{item}</Text></TouchableOpacity>
    //     )
    // })
    return (
        //<ScrollView>
        <View style={style.container}>
            {display}
        </View>
        //</ScrollView>
    )
}

let style = StyleSheet.create({
    container: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        // alignContent : 'center',
        justifyContent: "center",
    },
    circles: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        width: 60,
        height: 60,
    }
});


export default trainsView;