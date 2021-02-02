import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {MainStackNavigator, BottomTabNavigator} from '@nav';
import {configSentry} from '@config';
import {NetworkProvider} from 'react-native-offline';

export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  componentDidMount = () => {
    configSentry().catch(
      (err) => new Error(`Error when configure sentry ${err}`),
    );
  };
  render() {
    return (
      <Provider store={Store}>
        <NetworkProvider>
          <BottomTabNavigator />
        </NetworkProvider>
      </Provider>
    );
  }
}
