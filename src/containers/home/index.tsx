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
import {
  classifySor,
  getCurrentOrganization,
  getCurrentProject,
  savedCurrentProject,
  savedCurrentOrganization,
} from '@utils';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, recentActivity} from '@service';
import {ListCard} from '@components';
import {route} from '@nav';
import {PieChart} from 'react-native-svg-charts';
import {createApi} from '@service';
import Modal from 'react-native-modal';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

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
const PROJECT_ID: string = '';
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
      user: {},
      name: '',
      image: '',
      newsorModal: false,
      totalObservations: 0,
      count: 0,
      projectId: '',
      orgSelection: false,
      currentorg: '',
      allOrganizations: [],
      allProjects: [],
      selectedOrganization: {},
      projSelection: false,
      selectedProject: {},
    };
  }

  componentDidMount = () => {
    var data = {
      bucket: 'hns-codist',
      report: 'profile/1622449429163.jpeg',
    };
    createApi
      .createApi()
      .getFileApi(data)
      .then((file: any) => {
        console.log(file.data);

        this.setState({image: file.data});
      });

    getCurrentProject().then((currentProj: any) => {
      console.log('current organization');
      console.log(currentProj);
      if (this.state.currentorg !== '') {
      } else {
      }
      this.setState({projectId: currentProj});
    });

    getCurrentOrganization().then((currentorg) => {
      console.log(currentorg);
      console.log('current project');
      if (this.state.currentorg !== '') {
      } else {
      }
      this.setState({currentorg});
    });
    // this.setState({name: 'sds'});
    if (this.state.currentorg === '' && this.state.currentProj === '') {
      this.setState({newsorModal: true});
    } else {
      this.setState({newsorModal: false});
    }

    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((res: any) => {
          console.log(res.data.data.img_url);

          this.setState({name: res.data.data.name});
          this.setState({image: res.data.data.img_url});
          this.setState({user: res.data.data});
          this.setState({allOrganizations: res.data.data.organizations});

          // console.log(
          //   res.data.data.organizations.filter(
          //     (d: any) => d._id == this.state.currentorg,
          //   )[0].projects,
          // );

          if (
            res.data.data.organizations.filter(
              (d: any) => d._id == this.state.currentorg,
            )[0].projects.length != 0
          ) {
            this.setState({
              allProjects: res.data.data.organizations.filter(
                (d: any) => d._id == this.state.currentorg,
              )[0].projects,
            });
          } else {
            this.setState({allProjects: []});
          }
          this.setState({
            selectedOrganization: res.data.data.organizations.filter(
              (d: any) => d._id == this.state.currentorg,
            )[0],
          });
        });
    });

    var data = {
      bucket: 'hns-codist',
      report: 'profile/1621937387877.jpeg',
    };
    createApi
      .createApi()
      .getFileApi(data)
      .then((file: any) => {
        console.log(`data:image/jpeg;base64,${file.data}`);

        this.setState({image: file.data});
      });
  };

  _onRefresh = () => {
    this.setState({
      recentActivity: [],
    });
    // this.componentDidMount();
  };

  selectedOrg = async (d: any) => {
    this.setState({
      selectedOrganization: d,
      orgSelection: false,
    });

    savedCurrentOrganization(d._id);
    console.log(d);
    if (d.projects.length != 0) {
      this.setState({allProjects: d.projects});
    } else {
      this.setState({allProjects: []});
    }
  };
  selecteProj = async (d: any) => {
    this.setState({
      selectedProject: d,
      projSelection: false,
      newsorModal: false,
    });

    savedCurrentProject(d.project_id);
  };

  render() {
    if (this.state.projectId == '') {
    } else {
      createApi
        .createApi()
        .filterSors({
          project: this.state.projectId,
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
    }

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
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.loading}
          //     onRefresh={this._onRefresh}
          //   />
          // }
        >
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View style={styles.orgLogo}>
                <Image
                  source={images.organizationLogo}
                  style={styles.orgLogoPng}
                />
              </View>
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.orgTitle}>{this.state.name}</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: wp(0),
                  alignSelf: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Notification')}
                  style={{marginRight: wp(1)}}>
                  {this.state.count != 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{this.state.count}</Text>
                    </View>
                  )}
                  <Icon
                    containerStyle={{marginRight: wp(3)}}
                    size={wp(6)}
                    name="notifications-outline"
                    type="ionicon"
                    color={colors.secondary}
                  />
                </TouchableOpacity>
                <Avatar
                  rounded
                  source={{
                    uri:
                      this.state.image !== ''
                        ? `${this.state.image}`
                        : 'https://via.placeholder.com/150',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.menu}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ViewAllSOr')}
                style={{alignItems: 'center'}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.observationfeedback}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>Observation & Feedback</Text>
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <View style={styles.item}>
                  <Image
                    source={images.homeIcon.incidentreporting}
                    style={styles.iconImages}
                  />
                </View>
                <Text style={styles.itemText}>Incident</Text>
                <Text
                  style={{
                    fontSize: wp(3),
                    fontFamily: fonts.SFuiDisplayMedium,
                  }}>
                  Report
                </Text>
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
                    <Text style={styles.chartContent}>Observations</Text>
                    <Text style={styles.chartContent}>
                      {this.state.totalObservations}
                    </Text>
                  </View>
                </PieChart>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
        {/* when you don't have any sors  */}
        {/* Modal Container */}

        <Modal isVisible={this.state.newsorModal}>
          <View style={styles.modelContainer}>
            <View>
              <Text style={styles.errHeadPop}>
                Select your Organization and Project
              </Text>

              {/* Select Organization  */}

              {this.state.allOrganizations.length == 0 ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // padding: wp(2),
                    marginTop: wp(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('CreateOrg');

                    this.setState({newsorModal: false});
                  }}>
                  {/* <Image source={images.} /> */}
                  <Icon
                    size={wp(5)}
                    name="add-outline"
                    type="ionicon"
                    color={colors.primary}
                  />
                  <Text style={styles.plzTryAgain}>
                    Create New Organization
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayMedium,
                      marginTop: wp(3),
                      opacity: 0.6,
                    }}>
                    Select your Organization :
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: wp(2),
                      flexDirection: 'row',
                      padding: wp(3),
                      alignSelf: 'center',
                      borderRadius: wp(2),
                      width: wp(42),
                      borderWidth: wp(0.2),
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      this.setState({orgSelection: !this.state.orgSelection});
                      // this.setState({newsorModal: false});
                    }}>
                    <Text style={styles.errEmailPassDesc}>
                      {this.state.selectedOrganization.name}
                    </Text>
                    <Icon
                      size={wp(3)}
                      name="down"
                      type="antdesign"
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                  {this.state.orgSelection ? (
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      style={{
                        height: wp(50),
                        // position: 'absolute',
                        backgroundColor: colors.secondary,
                        // top: wp(10),
                        // zIndex: wp(2),
                        borderWidth: wp(0.2),
                        alignSelf: 'center',
                        // justifyContent: 'center',
                        width: wp(42),
                        borderRadius: wp(2),
                        borderColor: colors.textOpa,
                      }}>
                      <>
                        {this.state.allOrganizations.map((d: any) => (
                          <TouchableOpacity
                            onPress={() => this.selectedOrg(d)}
                            style={{padding: wp(3), flexDirection: 'row'}}>
                            <Icon
                              name={'stats-chart-sharp'}
                              type={'ionicon'}
                              size={wp(3)}
                              color={colors.text}
                            />
                            <Text style={{fontSize: wp(3), marginLeft: wp(3)}}>
                              {d.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </>
                    </ScrollView>
                  ) : null}
                </>
              )}

              {/* Select Project  */}
              {this.state.allProjects.length == 0 ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // padding: wp(2),
                    marginTop: wp(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('createProject', {
                      organization: this.state.projectId,
                    });

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
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: wp(3),
                      fontFamily: fonts.SFuiDisplayMedium,
                      marginTop: wp(3),
                      opacity: 0.6,
                    }}>
                    Select your Project :
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: wp(3),
                      flexDirection: 'row',
                      padding: wp(3),
                      alignSelf: 'center',
                      borderRadius: wp(2),
                      width: wp(42),
                      borderWidth: wp(0.2),
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      this.setState({projSelection: !this.state.projSelection});
                      // this.setState({newsorModal: false});
                    }}>
                    <Text
                      style={[
                        styles.errEmailPassDesc,
                        this.state.selectedProject.name == undefined
                          ? {opacity: 0.5}
                          : {color: colors.text},
                      ]}>
                      {this.state.selectedProject.project_name == undefined
                        ? 'Select your project'
                        : this.state.selectedProject.project_name}
                    </Text>
                    <Icon
                      size={wp(3)}
                      name="down"
                      type="antdesign"
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                  {this.state.projSelection ? (
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      style={{
                        // height: wp(50),
                        // position: 'absolute',
                        backgroundColor: colors.secondary,
                        // top: wp(10),
                        // zIndex: wp(2),
                        borderWidth: wp(0.2),
                        alignSelf: 'center',
                        // justifyContent: 'center',
                        width: wp(42),
                        borderRadius: wp(2),
                        borderColor: colors.textOpa,
                      }}>
                      <>
                        {this.state.allProjects.map((d: any) => (
                          <TouchableOpacity
                            onPress={() => this.selecteProj(d)}
                            style={{padding: wp(3), flexDirection: 'row'}}>
                            <Icon
                              name={'stats-chart-sharp'}
                              type={'ionicon'}
                              size={wp(3)}
                              color={colors.text}
                            />
                            <Text style={{fontSize: wp(3), marginLeft: wp(3)}}>
                              {d.project_name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </>
                    </ScrollView>
                  ) : null}
                </>
              )}
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
