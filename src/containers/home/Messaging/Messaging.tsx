import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux';
import styles from "./styles";
export interface MessagingProps {
}

export default class Messaging extends React.Component<MessagingProps, any> {
  render() {
    return (
      <View>
         <Text>Messaging</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
