import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {Create_sor, View_sor, all_sor, viewas} from '@service';
import {connect} from 'react-redux';
import * as reduxActions from '../../store/Actions/AppActions';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {Chart} from '@components';
import {bindActionCreators} from 'redux';
// import {connect} from '../../decorators/index';
type HomeScreenNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Home'
>;
type HomeRouteProp = RouteProp<StackNavigatorProps, 'Home'>;

export interface HomeProps {
  route: HomeRouteProp;
  navigation: HomeScreenNavigationProp;
  reduxActions: any;
  reduxState: any;
}

const mapStateToProps = (state: any) => {
  return {
    reduxState: state.reducers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxActions: bindActionCreators(reduxActions.default, dispatch),
  };
};

class Home extends React.Component<HomeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentlocation: Create_sor.Observation.locations[0],
      project: viewas[0],
      selectP: false,
    };
    // console.log(this.props.reduxState);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView>
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
                  // onPress={() => {
                  //   this.setState({selectP: !this.state.selectP});
                  // }}>
                >
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
              padding: wp(10),
              height: wp(150),
            }}>
            <Icon
              onPress={() => this.props.navigation.navigate('CreateSOR')}
              style={{padding: 3}}
              size={wp(15)}
              name="file-certificate-outline"
              type="material-community"
              color={colors.primary}
            />
            {/* <Chart
              style={{alignSelf: 'center', marginTop: wp(3)}}
              onPress={(v: number) => console.log(v)}
            /> */}
            {/* <ScrollView horizontal={true}>
              <ScrollView>
                <Text>sdsds</Text>
              </ScrollView>
              <ScrollView style={{marginRight: wp(10), marginLeft: wp(10)}}>
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardtime}>123</Text>
                    <TouchableOpacity style={styles.cardbadge}>
                      <Text style={styles.cardBadgeText}>4</Text>
                    </TouchableOpacity>
                    <Text style={styles.cardDate}>22/10/2020</Text>
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>
                      Consequat Lorem qui excepteur pariatur laborum amet
                      officia incididunt dolore.
                    </Text>
                  </View>
                  <View style={styles.cardBottom}>
                    <View style={styles.cardRisk}>
                      <Icon
                        style={{padding: 3}}
                        size={wp(3)}
                        name="warning"
                        type="antdesign"
                        color={colors.riskIcons.red}
                      />
                      <Text
                        style={[
                          styles.cardBorderText,
                          {color: colors.riskIcons.red},
                        ]}>
                        Concern
                      </Text>
                    </View>
                    <View style={styles.cardLocation}>
                      <Icon
                        style={{padding: 3}}
                        size={15}
                        name="location"
                        type="evilicon"
                        color={colors.primary}
                      />
                      <Text style={styles.cardBorderText}>Lorem ipsum </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <ScrollView>
                <Text>sdsd</Text>
                <Text>sdsd</Text>
                <Text>sdsd</Text>
                <Text>sdsd</Text>
                <Text>sdsd</Text>
              </ScrollView> */}
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect()(Home);
