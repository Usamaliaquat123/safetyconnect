import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { connect } from 'react-redux';
import { sor } from "@service/mock";
import styles from "./style";
import { Icon ,Avatar } from "react-native-elements";
import { colors } from "@theme/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface EditSORProps {
}

export default class EditSOR extends React.Component<EditSORProps, any> {
  constructor(props:any){
    super(props)
    this.state = {
      selectP : false,
      selectL : false,
      location: sor.Observation.locations[0],
      project: sor.Observation.projects[0]
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
                      'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                  }}
                />
              </View>
            </View>


            <View style={styles.headerSelect}>
              {/* Project selector */}
              <View style={styles.leftSelector}>

                <Text style={styles.hselectort}> Project : </Text>
               <TouchableOpacity style={styles.selector}>
                <Text style={styles.selectorBox}>{this.state.project}</Text>

               </TouchableOpacity>
                <Icon  onPress={() => {this.setState({ selectP: !this.state.selectP }) 
                console.log('sdsd')}} style={{ padding: 3 }} size={10}name='down'type='antdesign'color={colors.secondary}/>
                {this.state.selectP == true ? 
              <View style={styles.slctContainer}>
                  {sor.Observation.projects.map((d) => <Text  onPress={() => this.setState({project: d})}style={ styles.itemH}>{  d.length > 7 ? 
                    d.substring(0, 8) + "..." : d }</Text>    )}
              </View> : null}
              </View>
    {/* Location selector */}
                
              <TouchableOpacity onPress={() => console.log('sds')}  style={styles.rightSelector} >

               <Text style={styles.hselectort}> Location : </Text>
               <TouchableOpacity style={styles.selector} >
                <Text style={styles.selectorBox}>{this.state.location}</Text>
               </TouchableOpacity>
                <Icon style={{ padding: 3 }} size={10}name='down'type='antdesign'color={colors.secondary}/>
                {this.state.selectL == true ? 
              <View style={[styles.slctContainer, {left: wp(15) }]}>
                  {sor.Observation.locations.map((d) => <Text onPress={() => this.setState({location: d})} style={ styles.itemH}>{  d.length > 7 ? 
                    d.substring(0, 7) + "..." : d }</Text>    )}
              </View> : null}
              </TouchableOpacity>
           
            
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
