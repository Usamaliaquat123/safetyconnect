import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
export interface SettingsProps {}

class Settings extends React.Component<SettingsProps, any> {
  render() {
    return <View></View>;
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
