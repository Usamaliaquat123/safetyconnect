import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

export interface AppProps {
}

export default class App extends React.Component<AppProps, any> {
  render() {
    return (
      <View>
         <Text>App</Text>
      </View>
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
