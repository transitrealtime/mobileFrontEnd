import React, {Component} from 'react';
import Routes from './components/route';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text  } from 'native-base';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
class App extends Component {
  render() {
      return (
      <Container>
        <Routes></Routes>
      <Footer>
        <FooterTab>
          <Button onPress= {() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName:'App'})
              ],
            }))
          }}
          >
            <Icon name="home" />
          </Button>
          <Button>
            <Icon name="subway" />
          </Button>
          <Button>
            <Icon active name="map" />
          </Button>
          <Button>
            <Icon name="logo-twitter"/>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    
    );
  }
}

const AppNavigator = createStackNavigator({
  App: {
    screen: App,
    navigationOptions:{
      header: null ,
    }
  },
}, {
    initialRouteName: 'App',
});

export default createAppContainer(AppNavigator);