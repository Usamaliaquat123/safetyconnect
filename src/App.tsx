import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from 'store/store';
import {StackNavigator} from './navigation/index';
export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  render() {
    return (
      <Provider store={Store}>
        <StackNavigator />
      </Provider>
    );
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
