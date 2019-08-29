import React from 'react';
import Routes from './components/route';
import { Container, Footer, FooterTab, Button} from 'native-base';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import { Provider } from "react-redux";
import store from './store';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1
    };
  }
  goHome = () => {
    Actions.landing()
  }
  goMap = () => {
    Actions.allMaps()
  }

  goTwitter = () => {
    Actions.twitterFeed()
  }
  goDirections = () => {
    Actions.directions()
  }

  render() {
    return (
      <Provider store={store}>
        <Container>
          <Routes></Routes>
          <Footer>
            <FooterTab>
              <Button onPress={async () => { await this.setState({ activePage: 1 }); this.goHome() }}>
                <Icon style={this.state.activePage === 1 ? { color: '#1E90FF', fontSize : 20} : {fontSize : 20}} name="ios-subway"/>
                {/* <Ionicons style={this.state.activePage === 1 ? { color: '#1E90FF' } : {}} name="subway"></Ionicons> */}
              </Button>
              {/* <Button onPress={async () => { await this.setState({ activePage: 2 }); this.goDirections() }}>
                <Icon style={this.state.activePage === 2 ? {color: '#1E90FF' } : {}} name="ios-walk" />
              </Button> */}
              <Button onPress={async () => { await this.setState({ activePage: 3 }); this.goMap() }}>
                <Icon style={this.state.activePage === 3 ? { color: '#1E90FF',fontSize : 20} : {fontSize : 20}} active name="ios-map" />
              </Button>
              <Button onPress={async () => { await this.setState({ activePage: 4 }); this.goTwitter() }}>
                <Icon style={this.state.activePage === 4 ? { color: '#1E90FF',fontSize : 20} : {fontSize : 20}} name="logo-twitter" type="Ionicons" />
              </Button>

            </FooterTab>
          </Footer>
        </Container>
      </Provider >
    );
  };
}