import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  RefreshControl,
} from 'react-native';
import {colors, GlStyles, images, fonts} from '@theme';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import {classifySor} from '@utils';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, recentActivity} from '@service';
import {ListCard} from '@components';
import {route} from '@nav';
import {PieChart} from 'react-native-svg-charts';
import {createApi} from '@service';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Isor, orgnaization} from '@typings';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

class Home extends React.Component<HomeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedStats: 1,
      recentActivity: [],
      username: '',
      orgName: '',
      newsorModal: false,
    };
  }

  componentDidMount() {
    createApi
      .createApi()
      .filterSors({
        project: '6038cf8472762b29b1bed1f3',
        limit: 10,
        page: 0,
        query: {status: [1, 2, 3, 4, 5]},
      })
      .then((res: any) => {
        if (res.data.data.report.length > 3) {
          this.setState({recentActivity: res.data.data.report.slice(0, 3)});
        } else {
          this.setState({recentActivity: res.data.data.report});
        }
      });

    AsyncStorage.getItem('user').then((res: any) => {
      const arr = JSON.parse(res);
      this.setState({username: arr.name, orgName: arr.organizations[0].name});
    });
  }

  _onRefresh = () => {
    this.setState({
      recentActivity: [],
    });
    this.componentDidMount();
  };
  render() {
    const data = [
      {val: 40, color: '#8DCF7F'},
      {val: 20, color: '#FED888'},
      {val: 20, color: '#5BD8FC'},
    ];

    const pieData = data
      .filter((value) => value.val > 0)
      .map((value, index) => ({
        value: value.val,
        svg: {
          fill: value.color,
          onPress: () => {},
        },
        key: `pie-${index}`,
      }));
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View style={styles.orgLogo}>
                <Image
                  source={images.organizationLogo}
                  style={styles.orgLogoPng}
                />
              </View>
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.title}>Welcome {this.state.username}!</Text>
                <Text style={styles.orgTitle}>{this.state.orgName}</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: wp(0),
                  alignSelf: 'center',
                }}>
                <Avatar
                  rounded
                  source={{
                    uri: View_sor.user.profile,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.menu}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.observationfeedback}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>Observation & Feedback</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.incidentreporting}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>Incident</Text>
                <Text style={{fontSize: wp(3)}}>Report</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.auditAndReporting}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>Audit &</Text>
                <Text style={{fontSize: wp(3)}}>Inspection</Text>
              </View>
              <View style={{alignItems: 'center', marginTop: wp(3)}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.riskmanagement}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>Risk</Text>
                <Text style={{fontSize: wp(3)}}>Management</Text>
              </View>
              <View style={{alignItems: 'center', marginTop: wp(3)}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.lms}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>LMS</Text>
              </View>
              <View style={{alignItems: 'center', marginTop: wp(3)}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.dataanalytics}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>Data</Text>
                <Text style={{fontSize: wp(3)}}>Analytics</Text>
              </View>
            </View>
            <View style={styles.recentActivity}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Recently Activity</Text>
                {this.state.recentActivity.length > 3 ? (
                  <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {this.state.recentActivity.length == 0 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    paddingTop: wp(10),
                    paddingBottom: wp(10),
                  }}>
                  <Text style={styles.nonReportText}>
                    You don't have any reports yet...
                  </Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.noncreate}>
                      Would you like to create the
                    </Text>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate('CreateSOR')
                      }
                      style={styles.noneCreatetext}>
                      {' '}
                      new one
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        styles={
                          this.state.recentActivity.length == i + 1
                            ? {borderBottomWidth: wp(0)}
                            : null
                        }
                        user1={d.user1}
                        user2={d.user2}
                        observation={d.details}
                        username={d.created_by}
                        iconconf={classifySor.find(
                          (e: any) => e.title == d.sor_type,
                        )}
                        onPress={() =>
                          this.props.navigation.navigate('ViewSOR', {data: d})
                        }
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
            <View style={styles.perfStats}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Performance Statistics</Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => this.setState({selectedStats: 1})}
                  style={[
                    styles.tab,
                    {
                      borderRightWidth: wp(0),
                      borderTopLeftRadius: wp(2.2),
                      borderBottomLeftRadius: wp(2.2),
                    },
                    this.state.selectedStats == 1 && {
                      backgroundColor: colors.darkLightGrey,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      this.state.selectedStats == 1 && {
                        color: colors.green,
                        opacity: 1,
                        fontWeight: 'bold',
                      },
                    ]}>
                    SOR
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({selectedStats: 2})}
                  style={[
                    styles.tab,
                    this.state.selectedStats == 2 && {
                      backgroundColor: colors.darkLightGrey,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      this.state.selectedStats == 2 && {
                        color: colors.green,
                        opacity: 1,
                        fontWeight: 'bold',
                      },
                    ]}>
                    Accidents
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({selectedStats: 3})}
                  style={[
                    styles.tab,
                    {
                      borderLeftWidth: wp(0),
                      borderTopRightRadius: wp(2.2),
                      borderBottomRightRadius: wp(2.2),
                    },

                    this.state.selectedStats == 3 && {
                      backgroundColor: colors.darkLightGrey,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      this.state.selectedStats == 3 && {
                        color: colors.green,
                        opacity: 1,
                        fontWeight: 'bold',
                      },
                    ]}>
                    Incidents
                  </Text>
                </TouchableOpacity>
              </View>
              {/* colors guide */}
              <View style={styles.guideColors}>
                <View style={styles.guideitem}>
                  <View
                    style={[
                      styles.swatch,
                      {marginLeft: wp(4), backgroundColor: '#8DCF7F'},
                    ]}></View>
                  <Text style={styles.guideText}>Report Resolved</Text>
                </View>
                <View style={[styles.guideitem]}>
                  <View
                    style={[
                      styles.swatch,
                      {marginLeft: wp(3), backgroundColor: '#FED888'},
                    ]}></View>
                  <Text style={styles.guideText}>Reports Pending</Text>
                </View>
                <View style={styles.guideitem}>
                  <View
                    style={[
                      styles.swatch,
                      {marginLeft: wp(3), backgroundColor: '#5BD8FC'},
                    ]}></View>
                  <Text style={styles.guideText}>Dismissed</Text>
                </View>
              </View>
              {/* Tabs Content */}
              <Animated.View style={styles.tabsContent}>
                <PieChart
                  padAngle={0}
                  animate={true}
                  innerRadius={'80%'}
                  style={{height: wp(50), width: wp(50)}}
                  data={pieData}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.chartContent}>Total</Text>
                    <Text style={styles.chartContent}>Observation</Text>
                    <Text style={styles.chartContent}>103</Text>
                  </View>
                </PieChart>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
        {/* when you don't have any sors  */}
        {/* Modal Container */}
        <Modal
          isVisible={this.state.newsorModal}
          onBackdropPress={() => this.setState({newsorModal: false})}>
          <View style={styles.modelContainer}>
            <View>
              <Text style={styles.errHeadPop}>
                looks like you don't have any sors yet
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  padding: wp(3),
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.navigate('CreateSOR');

                  this.setState({newsorModal: false});
                }}>
                <Icon
                  size={wp(5)}
                  name="add-outline"
                  type="ionicon"
                  color={colors.primary}
                />
                <Text style={styles.errEmailPassDesc}>Create New SOR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  padding: wp(3),
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.navigate('createProject');

                  this.setState({newsorModal: false});
                }}>
                {/* <Image source={images.} /> */}
                <Icon
                  size={wp(5)}
                  name="add-outline"
                  type="ionicon"
                  color={colors.primary}
                />
                <Text style={styles.plzTryAgain}>Create New Project</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    reduxState: state.reducers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // reduxActions: bindActionCreators(reduxActions.default, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
