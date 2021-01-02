import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {MainStackNavigator} from '@nav';
export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  render() {
    return (
      <Provider store={Store}>
        <MainStackNavigator />
      </Provider>
    );
  }
}
