import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import {connect} from 'react-redux';

export interface ForgotProps {}

export default class Forgot extends React.Component<ForgotProps, any> {
  render() {
    return (
      <View>
        <Text>Forgot</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
