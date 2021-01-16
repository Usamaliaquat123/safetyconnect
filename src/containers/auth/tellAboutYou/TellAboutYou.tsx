import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
export interface TellAboutYouProps {}

class TellAboutYou extends React.Component<TellAboutYouProps, any> {
  render() {
    return (
      <View>
        <Text>TellAboutYou</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TellAboutYou);
