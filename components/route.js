import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Landing from '../pages/home.js'
import About from './about.js'
import Train from './trainView'
import Single from '../pages/singleTrain'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "landing" component = {Landing} title = "Home" />
         <Scene key = "about" component = {About} title = "About" />
         <Scene key = "train" component = {Train} title = "Trains"initial = {true} />
         <Scene key = "singleTrain" component = {Single} title = "Single"/>
      </Scene>
   </Router>
)
export default Routes