import React, { Fragment } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/home.js'
import Train from './trainView'
import Single from '../pages/singleTrain'
import SingleTrainStation from '../pages/singleTrainStation';
import AllMaps from '../pages/allMaps.js';
import PinMap from './pinMap';
import LocationMap from './locationMap';
import PulseMap from './pulseMap';
import TwitterFeed from '../pages/twitterFeed';
import DirectionsMap from './directionsMap';
import Directions from '../pages/direction';

const Routes = (props) => (
   <Router cardStyle={{ backgroundColor: 'white' }}>
      <ScrollView>
         <Scene type="reset" key="landing" component={Landing} title="Home" initial={true} />
         <Scene key="train" component={Train} title="Trains" />
         <Scene key="singleTrain" component={Single} title="Single" />
         {/* <Scene key="singleTrainStation" component={SingleTrainStation} title="Station" hideNavBar={true} /> */}
         <Scene key="singleTrainStation" component={SingleTrainStation} title="Station" />

         <Scene type="reset" key="allMaps" component={AllMaps} title="All Maps" />
         <Scene key="pinMap" component={PinMap} title="All Stations" />
         <Scene key="locationMap" component={LocationMap} title="Where Am I" />
         <Scene key="pulseMap" component={PulseMap} title="NYC Pulse" />
         <Scene type="reset" key="twitterFeed" component={TwitterFeed} title="@NYCT Subway" />
         {/* <Scene type="reset" key="directions" component={Directions} title="Directions" hideNavBar={true} /> */}
         <Scene key="singleTrainStation" component={SingleTrainStation} title="Station" />

         <Scene type="reset" key="twitterFeed" component={TwitterFeed} title="@NYCT Subway" />
         <Scene key="directionsMap" component={DirectionsMap} title="Directions" path={props.path} />
      </ScrollView>
   </Router>
)
export default Routes