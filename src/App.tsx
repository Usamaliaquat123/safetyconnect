import * as React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {
  MainStackNavigator,
  BottomTabNavigator,
  AuthStackNavigator,
  route,
  Navigator,
} from '@nav';
import {getLinkParam} from '@utils';
import {configSentry, AmlifyConfigure} from '@config';
import {NetworkProvider} from 'react-native-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi} from '@service';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import jwtDecode from 'jwt-decode';
import {Auth} from 'aws-amplify';

export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      route: 'Login',
      authenticated: false,
      email: '',
      code: '',
    };
  }

  componentDidMount = async () => {
    configSentry().catch(
      (err) => new Error(`Error when configure sentry ${err}`),
    );

    AmlifyConfigure()
      .then((res) => {})
      .catch((err) => {});

    // dynamicLinks().onLink(this.handleDynamicLink);
  };

  render() {
    return (
      <Provider store={Store}>
        <NetworkProvider>
          {/* {this.state.authenticated == true ? ( */}
          {/* <AuthStackNavigator /> */}
          {/* <BottomTabNavigator /> */}

          <Navigator />
          {/* ) */}
        </NetworkProvider>
      </Provider>
    );
  }
}
