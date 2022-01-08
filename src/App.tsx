import * as React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {MainStackNavigator, BottomTabNavigator, route, Navigator} from '@nav';
import {getLinkParam} from '@utils';
import {configSentry, AmlifyConfigure, oneSignalConfig} from '@config';
import {NetworkProvider} from 'react-native-offline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi} from '@service';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import jwtDecode from 'jwt-decode';
import firebase from '@react-native-firebase/app';
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
    var firebaseConfig = {
      apiKey: 'AIzaSyByLzKmGd-Z7S6gr96LmjwHuJSbediE6UQ',
      authDomain:
        '360928388770-eigc5j7mvi9spsr59kljb52m3s1l0689.apps.googleusercontent.com',
      projectId: 'safetyconnect-4dbd6',
      messagingSenderId: '360928388770',
      appId: '1:360928388770:android:f909083c6e96684c4919fb',
    };

    firebase.initializeApp(firebaseConfig);
    configSentry().catch(
      (err) => new Error(`Error when configure sentry ${err}`),
    );

    AmlifyConfigure()
      .then((res) => {})
      .catch((err) => {});

    oneSignalConfig();
    // dynamicLinks().onLink(this.handleDynamicLink);
  };

  render() {
    return (
      <Provider store={Store}>
        {/* <NetworkProvider> */}
        {/* {this.state.authenticated == true ? ( */}
        {/* <AuthStackNavigator /> */}
        {/* <BottomTabNavigator /> */}

        <Navigator />
        {/* ) */}
        {/* </NetworkProvider> */}
      </Provider>
    );
  }
}
