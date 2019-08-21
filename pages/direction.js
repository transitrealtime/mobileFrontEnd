import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import { Card, CardItem, Container, Button, Content, Right, Icon } from 'native-base'

class Directions extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      currLoc: [],
      stations: [],
      destination: "",
      routes: []
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
        }
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
      let view = [];
      data.forEach(route => {
        let path = [];
        <Card>
          {route.path.map(step => {
            path.push(
              <CardItem>
                {step}
              </CardItem>
            )
          })}
        </Card>
        view.push(path)
      })
      this.setState({
        route: view
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
        <Card>
          {this.state.routes.length > 0 ?
            <Card>{this.state.routes}</Card> : (<CardItem><Text>Nothing</Text></CardItem>)}
        </Card>
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
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
export default Directions