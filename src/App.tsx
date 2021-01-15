import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {MainStackNavigator} from '@nav';
import {configSentry} from '@config';

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
        <MainStackNavigator />
      </Provider>
    );
  }
}
