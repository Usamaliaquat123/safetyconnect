import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux';

import styles from "./style";
export interface ViewSORProps {
}

export default class ViewSOR extends React.Component<ViewSORProps, any> {
  render() {
    return (
      <View>
         <Text>ViewSOR</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(ViewSOR);
