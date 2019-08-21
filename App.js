import React from 'react';
import Routes from './components/route';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

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
  render() {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
        <Routes></Routes>
        <Footer>
          <FooterTab>
            <Button active={this.state.activePage === 1} onPress={async()=> {await this.setState({activePage:1});this.goHome()}}>
              <Icon name="subway" />
            </Button>
            <Button active={this.state.activePage === 2} onPress={async()=> {await this.setState({activePage:2});this.goMap()}}>
              <Icon active name="map" />
            </Button>
            <Button active={this.state.activePage === 3} onPress={async()=> {await this.setState({activePage:3});this.goTwitter()}}>
              <Icon name="logo-twitter" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  };

}
