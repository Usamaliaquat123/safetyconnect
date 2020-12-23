import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux';
import { sor } from "@service/mock";
import styles from "./style";
import { Icon } from "react-native-elements";
import { colors } from "@theme/colors";
export interface EditSORProps {
}

export default class EditSOR extends React.Component<EditSORProps, any> {
  constructor(props:any){
    super(props)
    this.state = {

    }
  }


  filterLocation = async (str : any) => {
    return str.match(/@\S+/)[0].slice(1)
  }

  componentDidMount = () => {

  };
  

  componentWillUnmount = () => {

  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headertle}>
            <Icon
  name='arrow-back-outline'
  type='ionicon'
  color={colors.primary}
/>
            <Text style={styles.title}>asdsa</Text>

            </View>
          </View>
          <View style={styles.content}></View>
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
