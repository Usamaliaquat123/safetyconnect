import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import {connect} from 'react-redux';
import styles from './styles';
export interface ViewAllProps {}

class ViewAll extends React.Component<ViewAllProps, any> {
  render() {
    return (
      <View>
        <Text>ViewAll</Text>
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);
