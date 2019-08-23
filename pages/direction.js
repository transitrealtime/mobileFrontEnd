import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Card, CardItem, Container, Button, Content, Right, Icon, Body } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import SearchBar from 'react-native-searchbar';
import { storeRouteThunk } from '../store/utilities/directionRoute';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

class Directions extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      currLoc: [],
      stations: [],
      destination: "",
      route: [],
      showSearch: false
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      await navigator.geolocation.getCurrentPosition(
        position => {
          const obj = JSON.stringify(position);
          const location = JSON.parse(obj)
          const currLoc = { latitude: location[`coords`][`latitude`], longitude: location[`coords`][`longitude`] };
          if (this._isMounted) {
            this.setState({
              currLoc: currLoc
            })
          }
          console.log(currLoc)
        },
        error => Alert.alert(error.message),
        { timeout: 20000, maximumAge: 1000 }
      )
    } catch (err) {
      console.log(err)
    }
    try {
      let { data } = await axios.get('http://mta-real-time.herokuapp.com/stations');
      let trains = [];
      Object.entries(data).forEach(element => {
        trains.push(element[1]["Stop Name"]);
      });
      if (this._isMounted) {
        this.setState({
          stations: trains
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  filterData = (query) => {
    if (query === '') {
      return [];
    }

    const { stations } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return stations.filter(item => item.search(regex) >= 0);
  }

  goToDirections = async (route) => {
    this.props.storeRoute(route);
    Actions.directionsMap({ path: `${route}` })
  }


  query = async () => {
    try {
      let currLoc = await this.state.currLoc;
      let { data } = await axios.get(`http://mta-real-time.herokuapp.com/direction/${currLoc.latitude + `,` + currLoc.longitude}/${this.state.destination}`)
      let route = [];
      let i = 0;
      data.forEach(routes => {
        let path = [];
        let pathView = [];
        {
          routes.steps.map((step, i) => {
            if (step.transitType === "WALKING") {
              pathView.push(<Icon key={i} name="md-walk" style={{ fontSize: 20 }} />);
              pathView.push(<Icon key={i + 1 * 100} name="ios-arrow-forward" style={{ fontSize: 20 }} />);
            }
            else {
              pathView.push(
                <View key={i} style={[styles.circle, { backgroundColor: step.trainInfo.trainColor }]}>
                  <Text style={[{ color: 'white', fontSize: 12 }]}>{step.trainInfo.train}</Text>
                </View>);
              pathView.push(<Icon key={i + 1 * 100} name="ios-arrow-forward" style={{ fontSize: 20 }} />);
            }
            path.push
              (<CardItem key={i + 1 * 33} >
                {step.transitType === "WALKING" ?
                  <Body style={styles.leftRight}>
                    <Text>{step.instructions}</Text>
                    <Text>{step.duration}</Text>
                  </Body>
                  :
                  <Body style={styles.leftRight}>
                    <Text>{"Take "}{step.instructions.replace("Subway", `${step.trainInfo.train} train`)}{" to"}{"\n"}{step.trainInfo.arrivalStop}</Text>
                    <Text>{step.duration}</Text>
                  </Body>
                }
              </CardItem>)
          })
        }
        route.push(
          <Card key={i++}>
            <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {pathView}<Text>{routes.tripDuration}</Text>
            </Card>
            <CardItem style={styles.leftRight}>
              <Text>Departure Time:{routes.departure}</Text>
              <Text>Estimated Arrival:{routes.arrival}</Text>
            </CardItem>
            {path}
            <MaterialCommunityIcons style={{ textAlign: 'right', fontSize: 35 }} onPress={() => this.goToDirections(routes)} name="google-maps" />
          </Card>
        );
      })
      this.setState({
        route: route
      })
    } catch (err) {
      console.log(err)
    }

  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { destination } = this.state;
    const data = this.filterData(destination);
    return (
      <Container>
        {this.state.showSearch ? (
          <SearchBar
            showOnLoad
            textColor='black'
            data={data.length === 1 ? [] : data}
            handleChangeText={text => this.setState({ destination: text })}
            onSubmitEditing={this.query}
            onBack={() => this.setState({ showSearch: !this.state.showSearch })}
          >
          </SearchBar>
        ) :
          (<TouchableOpacity onPress={() => this.setState({ showSearch: !this.state.showSearch })} style={{
            alignSelf: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center', shadowColor: "#000000",
            shadowOpacity: 0.4, shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }, backgroundColor: 'white', zIndex: 1, margin: 10, marginTop: 20, width: 55, height: 55, borderRadius: 30
          }}><Icon
              style={{ zIndex: 1, color: '#6A6A6A', fontSize: 27.5 }} name="md-search" /></TouchableOpacity>)
        }
        <MapView provider={PROVIDER_GOOGLE}
          style={[styles.map, { flex: 1, marginBottom: this.state.marginBottom }]}
          initialRegion={{
            latitude: 40.7549,
            longitude: -73.9840,
            latitudeDelta: 0,
            longitudeDelta: 0.08983111749910169,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={false}
          loadingEnabled={true}>
        </MapView>
        {this.state.showSearch ?
          (<ScrollView>
            {this.state.route.length > 0 ?
              (<View style={{ marginTop: 70 }}>{this.state.route}</View>) : (<View></View>)}
          </ScrollView>) : (<View></View>)}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    zIndex: 1
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  leftRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  search: {
    top: 20,
    left: 20,
    bottom: 20,
    right: 20
  },
  circle: {
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


const mapState = (state) => {
  return {
    routes: state.routes
  }
}

const mapDispatch = (dispatch) => {
  return {
    storeRoute: (route) => dispatch(storeRouteThunk(route))
  }
}

export default connect(mapState, mapDispatch)(Directions);