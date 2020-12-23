import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { connect } from 'react-redux';
import { sor } from "@service/mock";
import styles from "./style";
import { Icon ,Avatar } from "react-native-elements";
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
              <Icon size={25}name='arrow-back-outline'type='ionicon'color={colors.secondary}/>
              <View>
                    <Text style={styles.title}>ABC Systems</Text>
                    <View style={styles.underScrore} />
              </View>
              <View style={{ position: 'absolute', right: 0 }}>
<Avatar
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
/>

              </View>
            </View>


            <View style={styles.headerSelect}>
              {/* Project selector */}
              <View style={styles.leftSelector}>

                <Text style={styles.hselectort}> Project : </Text>
               <View style={styles.selector}>
                <Text style={styles.selectorBox}>Lorem Ipsum</Text>

               </View>
                <Icon style={{ padding: 3 }} size={10}name='down'type='antdesign'color={colors.secondary}/>
              </View>
    {/* Location selector */}
                
              <View style={styles.rightSelector} >

               <Text style={styles.hselectort}> Location : </Text>
               <View style={styles.selector}>
                <Text style={styles.selectorBox}>sds</Text>

               </View>
                <Icon style={{ padding: 3 }} size={10}name='down'type='antdesign'color={colors.secondary}/>
              </View>
              <View style={styles.slctContainer}>
                
              </View>
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
