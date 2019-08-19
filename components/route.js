import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/home.js'
import Train from './trainView'
import Single from '../pages/singleTrain'
import SingleTrainStation from '../pages/singleTrainStation';
import AllMaps from '../pages/allMaps.js';
import PinMap from './pinMap';
import LocationMap from './locationMap';
import TwitterFeed from './twitterFeed';

const Routes = () => (
      <Router cardStyle = {{backgroundColor : 'white'}}>
         <ScrollView>
            <Scene type = "reset" key="landing" component={Landing} title="Home" initial={true} />
            <Scene key="train" component={Train} title="Trains" />
            <Scene key="singleTrain" component={Single} title="Single" />
            <Scene key="singleTrainStation" component={SingleTrainStation} title="Station" />
            <Scene key="allMaps" component={AllMaps} title="All Maps" />
            <Scene key="pinMap" component={PinMap} title="All Stations" />
            <Scene key="locationMap" component={LocationMap} title="Where Am I" />
            <Scene key = "twitterFeed" component={TwitterFeed} title="@NYCT Subway"/>
         </ScrollView>
      </Router>
)
export default Routes