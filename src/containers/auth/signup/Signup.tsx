import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
export interface SignupProps {}

class Signup extends React.Component<SignupProps, any> {
  render() {
    return (
      <View>
        <Text>Signup</Text>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
