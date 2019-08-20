import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, PixelRatio } from 'react-native';
import { Actions } from 'react-native-router-flux'


let FONT_BACK_LABEL = 40;

if (PixelRatio.get() <= 2) {
    FONT_BACK_LABEL = 30;
}

const trainsView = () => {
    const trainColors = require('./trainColors');

    const goToSingleTrain = (train) => {
        Actions.singleTrain({ trains: `${train}`, title: `${train} Train` });
    }
    let redTrains = ["1", "2", "3"];
    let greenTrains = ["4", "5", "6"];
    let blueTrains = ["A", "C", "E"];
    let orangeTrains = ["B", "D", "F", "M"];
    let yellowTrains = ["N", "Q", "R", "W"];
    let grayTrains = ["L","S","7"];
    let brownTrains = ["J", "Z","G"];
    let allTrains = [redTrains, greenTrains, blueTrains, orangeTrains, yellowTrains, grayTrains, brownTrains];
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
    return (
        <View style={style.container}>
            {display}
        </View>
    )
}

let style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: "center",
    },
    circles: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        width: 50,
        height: 50,
    }
});


export default trainsView;