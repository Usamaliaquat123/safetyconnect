import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {Create_sor, View_sor, all_sor, viewas} from '@service';
// import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
export interface HomeProps {}

export default class Home extends React.Component<HomeProps, any> {
  constructor(props: Object) {
    super(props);
    this.state = {
      currentlocation: Create_sor.Observation.locations[0],
      project: viewas[0],
      selectP: true,
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <View style={styles.header}>
          <View style={styles.headertle}>
            <Icon
              size={25}
              name="arrow-back-outline"
              type="ionicon"
              color={colors.secondary}
            />
            <View>
              <Text style={styles.title}>View SOR Reports</Text>
              <View style={styles.underScrore} />
            </View>
            <View style={styles.avatarView}>
              <Avatar
                rounded
                source={{
                  uri: Create_sor.user.profile,
                }}
              />
            </View>
          </View>
          <View style={styles.headerSelect}>
            {/* Project selector */}
            <View style={styles.leftSelector}>
              {/* <Text style={styles.hselectort}> Board View</Text> */}
              <TouchableOpacity
                style={styles.selector}
                onPress={() => {
                  this.setState({selectP: !this.state.selectP});
                }}>
                <Text style={styles.selectorBox}>{this.state.project}</Text>
              </TouchableOpacity>
              <Icon
                style={{padding: 3}}
                size={10}
                name="down"
                type="antdesign"
                color={colors.secondary}
              />
              {this.state.selectP == true ? (
                <View style={styles.slctContainer}>
                  {Create_sor.Observation.projects.map((d, i) => (
                    <Text
                      key={i}
                      onPress={() => this.setState({project: d})}
                      style={styles.itemH}>
                      {d.length > 7 ? d.substring(0, 8) + '...' : d}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: colors.secondary,
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
          }}></View>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
