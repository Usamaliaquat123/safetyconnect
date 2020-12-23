import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux';
import styles from "./style";
export interface SettingsProps {
}

export default class Settings extends React.Component<SettingsProps, any> {
  render() {
    return (
      <View>
         <Text>Settings</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Settings);
