import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {MainStackNavigator, BottomTabNavigator, AuthStackNavigator} from '@nav';
import {configSentry, AmlifyConfigure} from '@config';
import {NetworkProvider} from 'react-native-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      route: 'Login',
    };
  }
  componentDidMount = () => {
    configSentry().catch(
      (err) => new Error(`Error when configure sentry ${err}`),
    );

    AmlifyConfigure()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    AsyncStorage.getItem('email').then((e) => {
      if (e !== null) {
        this.setState({route: 'CreatePass'});
      }
    });
  };
  render() {
    return (
      <Provider store={Store}>
        <NetworkProvider>
          <AuthStackNavigator route="Signup" />
        </NetworkProvider>
      </Provider>
    );
  }
}
