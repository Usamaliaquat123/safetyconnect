import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import {connect} from 'react-redux';

export interface SignupProps {}

export default class Signup extends React.Component<SignupProps, any> {
  render() {
    return (
      <View>
        <Text>Signup</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
