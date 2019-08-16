import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
        console.log(train);
        Actions.singleTrain({trains:`${train}`});
    }
    let train = ["7", "J", "Z", "L", "S", "G", "1", "2", "3", "4", "5", "6", "A", "C", "E", "B", "D", "F", "M", "N", "Q", "R", "W"];
    let display = train.map(item => {
        let circles = StyleSheet.create({
            circles: {
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: 'black',
                width: 30,
                height: 30,
                borderColor: trainColors[item]
            }
        })
        return (
            <TouchableOpacity onPress={()=>goToSingleTrain(item)} style={circles.circles} key={item}><Text style={{ color: trainColors[item] }}>{item}</Text></TouchableOpacity>
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
        marginTop: 10,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "space-around",
    }
});


export default trainsView;