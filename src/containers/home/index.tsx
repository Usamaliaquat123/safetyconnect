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
import {colors, GlStyles, images, fonts, animation} from '@theme';
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
      user: {},
      name: '',
      image: '',
      newsorModal: false,
      totalObservations: 0,
      count: 0,
      projectId: '',
      orgSelection: false,
      notificationsData: [],
      currentorg: '',
      allOrganizations: [],
      allProjects: [],
      repeatedSors: [],
      selectedOrganization: {},
      projSelection: false,
      loading: false,
      selectedProject: {},
      refreshing: false,
      repeatedSorModal: false,
    };
  }

  componentDidMount = () => {
    // this.setState({loading: true});
    // getCurrentProject().then((currentProj: any) => {
    //   this.setState({projectId: currentProj});
    // });
    // getCurrentOrganization().then((currentorg: any) => {
    //   this.setState({currentorg});
    // });
    // // this.setState({name: 'sds'});
    // // if (this.state.currentorg == null && this.state.currentProj == null) {
    // this.setState({newsorModal: true});
    // // } else {
    // //   this.setState({newsorModal: false});
    // // }
    // AsyncStorage.getItem('email').then((email: any) => {
    //   createApi
    //     .createApi()
    //     .getAllNotifications(email, '[0,1]')
    //     .then((notify: any) => {
    //       console.log(notify.data.data.notifications);
    //       this.setState({
    //         notificationsData: notify.data.data.notifications,
    //         count: notify.data.data.notifications.filter(
    //           (n: any) => n.status == 0,
    //         ).length,
    //       });
    //     });
    //   createApi
    //     .createApi()
    //     .getUser(email)
    //     .then((res: any) => {
    //       this.setState({name: res.data.data.name});
    //       this.setState({image: res.data.data.img_url});
    //       this.setState({user: res.data.data});
    //       this.setState({allOrganizations: res.data.data.organizations});
    //       // var data = {
    //       //   bucket: 'hns-codist',
    //       //   report: [`profile/${res.data.data.img_url}`],
    //       // };
    //       // createApi
    //       //   .createApi()
    //       //   .getFileApi(data)
    //       //   .then((file: any) => {
    //       //     this.setState({image: file.data[0]});
    //       //   });
    //       if (
    //         res.data.data.organizations.filter(
    //           (d: any) => d._id == this.state.currentorg,
    //         )[0].projects.length != 0
    //       ) {
    //         this.setState({
    //           allProjects: res.data.data.organizations.filter(
    //             (d: any) => d._id == this.state.currentorg,
    //           )[0].projects,
    //         });
    //       } else {
    //         this.setState({allProjects: []});
    //       }
    //       this.setState({
    //         selectedOrganization: res.data.data.organizations.filter(
    //           (d: any) => d._id == this.state.currentorg,
    //         )[0],
    //       });
    //     });
    // });
    // // var data = {
    // //   bucket: 'hns-codist',
    // //   report: 'profile/1621937387877.jpeg',
    // // };
    // // createApi
    // //   .createApi()
    // //   .getFileApi(data)
    // //   .then((file: any) => {
    // //     // this.setState({image: file.data});
    // //   });
    // this.setState({loading: false});
  };

  _onRefresh = () => {
    this.setState({
      recentActivity: [],
    });
    this.componentDidMount();
  };
  getAllRepeatedSor = (e: any) => {
    console.log(e);
    console.log(this.state.projectId);
    this.setState({repeatedSors: []});
    for (let i = 0; i < e.length; i++) {
      createApi
        .createApi()
        .getSors(this.state.projectId, e[i])
        .then((res: any) => {
          console.log(res.data.data.report[0]);
          this.state.repeatedSors.push(res.data.data.report[0]);
          this.setState({});
        });
    }

    setTimeout(() => {
      this.setState({repeatedSorModal: true});
    }, 2000);
  };
  selectedOrg = async (d: any) => {
    this.setState({
      selectedOrganization: d,
      orgSelection: false,
    });

    savedCurrentOrganization(d._id);
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

    await savedCurrentProject(d.project_id);
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
            for (let i = 0; i < res.data.data.report.length; i++) {
              if (res.data.data.report[i].details != undefined) {
                this.setState({
                  recentActivity: res.data.data.report.slice(0, 3),
                });

                // this.recentActivity.push(res.data.data.report[])
              }
            }
          } else {
            for (let i = 0; i < res.data.data.report.length; i++) {
              if (res.data.data.report[i].details != undefined) {
                this.setState({recentActivity: res.data.data.report});
              }
            }
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
                  onPress={() =>
                    this.props.navigation.navigate('Notification', {
                      data: this.state.notificationsData,
                    })
                  }
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
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Settings', {
                      data: this.state.user,
                    });
                  }}>
                  <Avatar
                    rounded
                    source={{
                      uri:
                        this.state.image !== ''
                          ? `${this.state.image}`
                          : 'https://via.placeholder.com/150',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.menu}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CreateSOR')}
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
            {/* Tasks Assigned to you */}
            <View style={styles.recentActivity}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Your Recent Activities</Text>
                {this.state.recentActivity.length > 3 ? (
                  <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{marginTop: wp(3), paddingLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Tasks Assigned to you
                </Text>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
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
                        onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            {/* Tasks assigned by you */}
            <View
              style={{
                marginTop: wp(1.5),
                paddingBottom: wp(3),
                backgroundColor: colors.secondary,
              }}>
              <View style={{marginTop: wp(3), paddingLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Tasks Assigned by you
                </Text>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
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
                        onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            {/* Tasks that you are involved in */}
            <View
              style={{
                marginTop: wp(1.5),
                paddingBottom: wp(3),
                backgroundColor: colors.secondary,
              }}>
              <View style={{marginTop: wp(3), paddingLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Tasks you are involved in
                </Text>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
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
                        onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            {/*
             * Overall Summary
             *
             */}
            <View style={styles.recentActivity}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Overall Summary</Text>
                {this.state.recentActivity.length > 3 ? (
                  <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{marginTop: wp(3), paddingLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Recent Observation
                </Text>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
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
                        onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            {/* latest incidents */}
            <View
              style={{
                marginTop: wp(1.5),
                paddingBottom: wp(3),
                backgroundColor: colors.secondary,
              }}>
              <View style={{marginTop: wp(3), paddingLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  latest Incidents
                </Text>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
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
                        onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            {/* open audits  */}
            <View
              style={{
                marginTop: wp(1.5),
                paddingBottom: wp(3),
                backgroundColor: colors.secondary,
              }}>
              <View style={{marginTop: wp(3), paddingLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Open Audits
                </Text>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
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
                        onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            {/* upcomming trainings  */}
            <View
              style={{
                marginTop: wp(1.5),
                paddingBottom: wp(3),
                backgroundColor: colors.secondary,
              }}>
              <View style={{marginTop: wp(3), paddingLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Upcomming Trainings
                </Text>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View style={{marginTop: wp(3)}}>
                    {this.state.recentActivity.map((d: Isor, i: number) => (
                      <ListCard
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
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
                        onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                        date={d.occured_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>

            {/* Performace stats */}
            <View style={styles.perfStats}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Performance Statistics</Text>
                <Text style={styles.viewAll}>View All</Text>

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
            </View>
          </View>

          {/* Repeated sor modal */}

          <Modal
            animationInTiming={1000}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationOutTiming={1000}
            useNativeDriver={true}
            onBackdropPress={() => this.setState({repeatedSorModal: false})}
            isVisible={this.state.repeatedSorModal}>
            <View
              style={{
                padding: wp(5),
                backgroundColor: colors.secondary,
                borderRadius: wp(2),
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: wp(4),
                    fontFamily: fonts.SFuiDisplayBold,
                    marginBottom: wp(3),
                  }}>
                  Repeated SOR
                </Text>
                <Icon
                  onPress={() => this.setState({repeatedSorModal: false})}
                  name={'cross'}
                  size={wp(5)}
                  type={'entypo'}
                />
              </View>
              {this.state.repeatedSors.map((d: Isor, i: number) => (
                <Card
                  key={i}
                  // type={'all'}
                  data={d}
                  onPress={(d: Isor) =>
                    this.props.navigation.navigate('ViewSOR', {
                      data: d,
                    })
                  }
                  onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                  name={d.created_by}
                  date={d.occured_at}
                  risk={d.risk.severity * d.risk.likelihood}
                  viewPortWidth={80}
                  observation={d.details}
                  classify={d.sor_type}
                  iconConf={classifySor.find((e: any) => e.title == d.sor_type)}
                  location={d.location}
                  style={[
                    styles.draftCardContainer,
                    // {marginBottom: wp()},
                  ]}
                  user1={d.user1}
                  user2={d.user2}
                />
              ))}
            </View>
          </Modal>
        </ScrollView>
        {/* when you don't have any sors  */}
        {/* Modal Container */}

        {/* <Modal isVisible={this.state.newsorModal}>
          <View style={styles.modelContainer}>
            <View>
              <Text style={styles.errHeadPop}>
                Select your Organization and Project
              </Text>


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
                        backgroundColor: colors.secondary,
                        borderWidth: wp(0.2),
                        alignSelf: 'center',
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

              {this.state.allProjects.length == 0 ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
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
                        backgroundColor: colors.secondary,
                        borderWidth: wp(0.2),
                        alignSelf: 'center',
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
        </Modal> */}

        {/* validations error */}
        {/* Modal Container */}
        <Modal
          isVisible={this.state.loading}
          onBackdropPress={() => this.setState({loading: false})}>
          {this.state.loading == true ? (
            <View>
              <View style={{alignSelf: 'center'}}>
                {/* <Bars size={wp(5)} color={colors.primary} /> */}
                {/* <Bars size={wp(5)} color={colors.primary} /> */}
                <LottieView
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
              </View>
            </View>
          ) : null}
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
