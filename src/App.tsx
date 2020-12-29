import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';

import {StackNavigator} from './navigation/index';
export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  render() {
    return <StackNavigator />;
  }
}

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
