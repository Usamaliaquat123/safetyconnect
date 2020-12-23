import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import {connect} from 'react-redux';

export interface LoginProps {}

export default class Login extends React.Component<LoginProps, any> {
  render() {
    return (
      <View>
        <Text>Login</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
