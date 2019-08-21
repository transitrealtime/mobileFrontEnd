import React from 'react';
import Routes from './components/route';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default App = () => {
  const goHome = () => {
    Actions.landing()
  }
  const goMap = () => {
    Actions.allMaps()
  }

  const goTwitter = () => {
    Actions.twitterFeed()
  }
  
  const goDirections =()=>{
    Actions.directions()
  }

  return (
    <Container style = {{display : 'flex',flexDirection : 'column', justifyContent: 'center',alignContent:'center'}}>
      <Routes></Routes>
      <Footer>
        <FooterTab>
          <Button onPress={goHome}>
            <Icon name="subway" />
          </Button>
          <Button onPress={goMap}>
            <Icon active name="map" />
          </Button>
          <Button onPress={goTwitter}>
            <Icon name="logo-twitter" />
          </Button>
          <Button onPress={goDirections}>
            <Icon name="logo-twitter" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>

  );
}
