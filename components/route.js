import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/home.js'
import Train from './trainView'
import Single from '../pages/singleTrain'
import SingleTrainStation from '../pages/singleTrainStation';
import map from './map.js';

const Routes = () => (
   <Router {...sceneConfig}>
      <ScrollView>
         <Scene key="landing" component={Landing} title="Home" initial={true} />
         <Scene key="train" component={Train} title="Trains" />
         <Scene key="singleTrain" component={Single} title="Single" />
         <Scene key="singleTrainStation" component={SingleTrainStation} title="Station" />
         <Scene key="map" component={map} title="Station" />
      </ScrollView>
   </Router>
)
export default Routes