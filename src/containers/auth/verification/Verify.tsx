import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import {connect} from 'react-redux';

export interface VerifyProps {}

export default class Verify extends React.Component<VerifyProps, any> {
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
