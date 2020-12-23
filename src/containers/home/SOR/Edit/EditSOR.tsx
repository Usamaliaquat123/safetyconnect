import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux';
import styles from "./style";
export interface EditSORProps {
}

export default class EditSOR extends React.Component<EditSORProps, any> {
  render() {
    return (
      <View>
         <Text>EditSOR</Text>
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

// export default connect(mapStateToProps, mapDispatchToProps)(EditSOR);
