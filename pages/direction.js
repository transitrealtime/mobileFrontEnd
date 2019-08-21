import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import { Card, CardItem, Container, Button, Content, Right, Icon, Body } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

class Directions extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      currLoc: [],
      stations: [],
      destination: "",
      route: []
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
              pathView.push(<Icon key={i} name="md-walk" />);
              pathView.push(<Icon key={i + 1 * 100} name="ios-arrow-forward" />);
            }
            else {
              pathView.push(
                <View key={i} style = {[styles.circle,{backgroundColor :step.trainInfo.trainColor}]}>
                  <Text style={[{color: 'white', fontSize: 12 }]}>{step.trainInfo.train}</Text>
                </View>);
              pathView.push(<Icon key={i + 1 * 100} name="ios-arrow-forward" />);
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
      <Container style={{ display: 'flex' }}>
        <Card>
          <CardItem>
            <Autocomplete
              containerStyle={styles.autocompleteContainer}
              data={data.length === 1 ? [] : data}
              defaultValue={destination}
              onChangeText={text => this.setState({ destination: text })}
              placeholder="Destination"
              renderItem={({ item, i }) => (
                <TouchableOpacity onPress={() => this.setState({ destination: item })}>
                  <Text key={i} >{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </CardItem>
          <TouchableOpacity onPress={this.query}>
            <CardItem>
              <Text>Search</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>
        <ScrollView>
          {this.state.route.length > 0 ?
            (<View>{this.state.route}</View>) : (<CardItem><Text>Nothing</Text></CardItem>)}
        </ScrollView>
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
  // circle: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 10,
  //   borderWidth : .5,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: "center",
  //   alignItems: "center",
  // }
  circle : {
    borderRadius : 10, 
    width :20, 
    height : 20,
    justifyContent : 'center',
    alignItems : 'center'
  }
});
export default Directions