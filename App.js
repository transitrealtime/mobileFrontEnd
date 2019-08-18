import React from 'react';
import Routes from './components/route';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default App = () => {
  const goHome = () => {
    Actions.landing()
  }
  const goMap = () => {
    Actions.map()
  }

  return (
    <Container>
      <Routes></Routes>
      <Footer>
        <FooterTab>
          <Button onPress={goHome}
          >
            <Icon name="home" />
          </Button>
          <Button>
            <Icon name="subway" />
          </Button>
          <Button onPress={goMap}>
            <Icon active name="map" />
          </Button>
          <Button>
            <Icon name="logo-twitter" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>

  );
}
