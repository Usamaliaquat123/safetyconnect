import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {
  MainStackNavigator,
  BottomTabNavigator,
  AuthStackNavigator,
  route,
} from '@nav';
import {configSentry, AmlifyConfigure} from '@config';
import {NetworkProvider} from 'react-native-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi} from '@service';

export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      route: 'Login',
      authenticated: false,
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

    createApi
      .createApi()
      .getUser({email: 'usamaliaquat@outlook.com'})
      .then((res: any) => {
        AsyncStorage.setItem('user', JSON.stringify(res.data.data));
      });

    AsyncStorage.getItem('token').then((res) => {
      if (res !== null) {
        this.setState({authenticated: true});
      }
    });
  };
  render() {
    return (
      <Provider store={Store}>
        <NetworkProvider>
          {/* {this.state.authenticated == true ? ( */}
          <BottomTabNavigator />
          {/* ) */}
        </NetworkProvider>
      </Provider>
    );
  }
}
