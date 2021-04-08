import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux';

export interface SplashProps {
}

export default class Splash extends React.Component<SplashProps, any> {
  render() {
    return (
      <View>
         <Text>Splash</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Splash);
