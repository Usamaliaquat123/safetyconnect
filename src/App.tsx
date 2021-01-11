import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from './store/store';
import {MainStackNavigator} from '@nav';
import * as Sentry from "@sentry/react-native";

export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  
  componentDidMount = () => {
    Sentry.init({
      dsn: "https://67f8a7e80a9c4b2a9579b6b2cf191312@o503166.ingest.sentry.io/5587869",
    });
  
  }
  render() {

    return (
      <Provider store={Store}>
        <MainStackNavigator />
      </Provider>
    );
  }
}
