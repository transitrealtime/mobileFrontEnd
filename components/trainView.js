import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux'

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
        Actions.singleTrain({ trains: `${train}` });
    }
    let train = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "B", "D", "F", "M", "N", "Q", "R", "W", "J", "Z", "L", "S", "G"];
    let display = train.map(item => {
        return (
            <TouchableOpacity onPress={() => goToSingleTrain(item)} style={[style.circles, { borderColor: trainColors[item] }]} key={item}><Text style={{ color: trainColors[item], fontSize: 60 }}>{item}</Text></TouchableOpacity>
        )
    })
    return (
        <ScrollView>
            <View style={style.container}>
                {display}
            </View>
        </ScrollView>
    )
}

let style = StyleSheet.create({
    container: {
        marginTop: 10,
        display : 'flex',
        flexDirection : 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        alignContent : 'center',
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