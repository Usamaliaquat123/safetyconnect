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
import LottieView from 'lottie-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {PrivateValueStore, RouteProp} from '@react-navigation/native';
import styles from './styles';
import * as reduxActions from '../../store/actions/listSorActions';
import {bindActionCreators} from 'redux';
import {
  classifySor,
  getCurrentOrganization,
  getCurrentProject,
  savedCurrentProject,
  filterAndMappingPersons,
  savedCurrentOrganization,
} from '@utils';
import {copilot, CopilotStep, walkthroughable} from 'react-native-copilot';

import {Avatar, Icon} from 'react-native-elements';
import {ListCard, Card} from '@components';
import {route} from '@nav';
import {PieChart, ProgressCircle} from 'react-native-svg-charts';
import {createApi} from '@service';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionsDashboard, Isor, orgnaization} from '@typings';
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
// const CopilotText = walkthroughable(Text);
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
const WalkthroughableView = walkthroughable(View);

class Home extends React.Component<HomeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedStats: 1,
      recentActivity: [],

      taskAssignedToYou: [],
      taskAssignedByYou: [],
      taskYouAreInvolvedIn: [],
      user: {},
      name: '',
      image: '',
      newsorModal: false,
      totalObservations: 0,
      count: 0,
      projectId: '',
      orgSelection: false,
      notificationsData: [],
      pendingActionTotal: 0,
      completedActionTotal: 0,
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
      // main data
      orgImage: '',
      latestIncidents: [],
      openAudits: [],
      upCommingTrainings: [],

      totalObs: 0,
      noOfCompleted: 0,
      noOfDrafts: 0,
      noOfPublished: 0,
      mediumRisk: 0,
      highRisk: 0,
      lowRisk: 0,
    };
  }
  handleStartButtonPress() {
    // this.props.start();
  }
  componentWillUnmount = () => {};
  componentDidMount = () => {
    // this.setState({loading: true});
    getCurrentProject().then((currentProj: any) => {
      // console.log(currentProj)
      getCurrentOrganization().then((currentorg: any) => {
        createApi
          .createApi()
          .getOrganization(currentorg)
          .then((org: any) => {
            console.log('org.data');
            // console.log(org.data.);
            this.setState({orgImage: org.data.data.img_url});

            AsyncStorage.getItem('email').then((email: any) => {
              console.log(org.data.data._id);
              console.log(email);
              console.log(this.state.project);

              createApi
                .createApi()
                .actionTableUrl(currentorg, currentProj)
                .then((res: any) => {
                  this.setState({completedActionTotal: res.data.data.total});
                });

              createApi
                .createApi()
                .taskAssignedBy(org.data.data._id, email, currentProj)
                .then((assignBy: any) => {
                  console.log('assignBy');
                  console.log(assignBy);
                  var taskAssignedBy = [];
                  assignBy.data.data[0].projects.forEach((assignBye: any) => {
                    const element = assignBye.reports.action_required;
                    const row = {
                      data: assignBye.reports,
                      sorType: assignBye.reports.sor_type,
                      projectId: assignBye._id,
                      reportId: assignBye.reports._id,
                      details: element.content,
                      assignedTo: element.assignTo,
                      createdBy: element.createdBy,
                      location: assignBye.reports.location,
                      createdAt: assignBye.reports.action_required.dueDate,
                    };

                    taskAssignedBy.push(row);
                    // this.state.taskAssignedByYou.push(row);
                    // this.setState({
                    // pendingActionTotal: this.state.taskAssignedByYou.length,
                    // completedActionTotal: 2,
                    // });
                    // this.setState({taskAssignedByYou: row});
                  });
                  this.setState({taskAssignedByYou: taskAssignedBy});
                });

              createApi
                .createApi()
                .tableData(org.data.data._id, email, currentProj)
                .then((assignTo: any) => {
                  console.log('assignTo');
                  console.log(assignTo);

                  var taskAssignedTo = [];
                  assignTo.data.data[0].projects.forEach((assigndTot: any) => {
                    const element = assigndTot.reports.action_required;
                    const row = {
                      // projectId: assigndTot._id,
                      data: assigndTot.reports,
                      sorType: assigndTot.reports.sor_type,
                      projectId: assigndTot._id,
                      reportId: assigndTot.reports._id,
                      details: element.content,
                      assignedTo: element.assignTo,
                      createdBy: element.createdBy,
                      location: assigndTot.reports.location,
                      createdAt: assigndTot.reports.action_required.dueDate,
                    };

                    taskAssignedTo.push(row);
                    // this.setState({
                    //   completedActionTotal: this.state.taskAssignedToYou.map(
                    //     (d) => d.data.reports.action_required,
                    //   ),
                    // });
                  });
                  this.setState({
                    taskYouAreInvolvedIn: taskAssignedTo,
                  });
                });

              createApi
                .createApi()
                .taskAssignedTo(org.data.data._id, email, currentProj)
                .then((tblData: any) => {
                  var taskAssignedToYou = [];
                  tblData.data.data[0].projects.forEach((tblDataa: any) => {
                    const element = tblDataa.reports.action_required;
                    const row = {
                      // projectId: assigndTot._id,
                      data: tblDataa.reports,
                      sorType: tblDataa.reports.sor_type,
                      projectId: tblDataa._id,
                      reportId: tblDataa.reports._id,
                      details: element.content,
                      assignedTo: element.assignTo,
                      createdBy: element.createdBy,
                      location: tblDataa.reports.location,
                      createdAt: tblDataa.reports.action_required.dueDate,
                    };
                    taskAssignedToYou.push(row);
                  });

                  console.log('taskAssignedToYou');
                  // console.log(taskAssignedToYou)
                  this.setState({taskAssignedToYou: taskAssignedToYou});
                });
            });

            // console.log('this.state.taskAssignedToYou');
            // console.log(this.state.taskAssignedToYou);
          });

        // // Filter sors
        createApi
          .createApi()
          .filterSors({
            project: currentProj,
            limit: 10,
            page: 0,
            query: {status: [1, 2, 3, 4, 5]},
          })
          .then((res: any) => {
            createApi
              .createApi()
              .dashboardApi(currentProj, currentorg)
              .then((dash: any) => {
                console.log('dash=================');
                console.log(dash);
                //  console.log)
                this.setState({
                  totalObs:
                    dash.data.Completed +
                    dash.data.Drafts +
                    dash.data.Published,
                });
                this.setState({
                  mediumRisk: dash.data.Medium,
                  highRisk: dash.data.High,
                  lowRisk: dash.data.Low,
                });
                this.setState({
                  noOfCompleted: dash.data.Completed,
                  noOfDrafts: dash.data.Drafts,
                  noOfPublished: dash.data.Published,
                });
                this.setState({});
              });

            if (res.data.data.report.length > 3) {
              res.data.data.report.reverse();

              for (let i = 0; i < res.data.data.report.length; i++) {
                if (res.data.data.report[i].details != undefined) {
                  AsyncStorage.getItem('email').then((email) => {
                    this.setState({
                      recentActivity: res.data.data.report,
                    });
                  });

                  this.setState({});
                }
              }
            } else {
              for (let i = 0; i < res.data.data.report.length; i++) {
                if (res.data.data.report[i].details != undefined) {
                  AsyncStorage.getItem('email').then((email) => {
                    this.setState({
                      recentActivity: res.data.data.report,
                    });
                  });

                  this.setState({});
                }
              }
            }
          });

        this.setState({projectId: currentProj});
        this.setState({currentorg: currentorg});

        createApi
          .createApi()
          .dashboardApi(currentProj, currentorg)
          .then((dash: any) => {
            this.setState({
              totalObs:
                dash.data.noOfCompleted +
                dash.data.noOfDrafts +
                dash.data.noOfPublished,
            });

            this.setState({
              noOfCompleted: dash.data.noOfCompleted,
              noOfDrafts: dash.data.noOfDrafts,
              noOfPublished: dash.data.noOfPublished,
            });
          });
      });
    });
    // this.setState({name: 'sds'});
    // if (this.state.currentorg == null && this.state.currentProj == null) {
    this.setState({newsorModal: true});
    // } else {
    //   this.setState({newsorModal: false});
    // }
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getAllNotifications(email, '[0,1]')
        .then((notify: any) => {
          console.log(notify.data.data.notifications);
          this.setState({
            notificationsData: notify.data.data.notifications,
            count: notify.data.data.notifications.filter(
              (n: any) => n.status == 0,
            ).length,
          });
        });
      createApi
        .createApi()
        .getUser(email)
        .then((res: any) => {
          this.setState({name: res.data.data.name});
          this.setState({image: res.data.data.img_url});
          this.setState({user: res.data.data});
          this.setState({allOrganizations: res.data.data.organizations});
          // var data = {
          //   bucket: 'hns-codist',
          //   report: [`profile/${res.data.data.img_url}`],
          // };
          // createApi
          //   .createApi()
          //   .getFileApi(data)
          //   .then((file: any) => {
          //     this.setState({image: file.data[0]});
          //   });
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
    // var data = {
    //   bucket: 'hns-codist',
    //   report: 'profile/1621937387877.jpeg',
    // };
    // createApi
    //   .createApi()
    //   .getFileApi(data)
    //   .then((file: any) => {
    //     // this.setState({image: file.data});
    //   });
    this.setState({loading: false});

    if (this.state.projectId == '') {
    } else {
    }
  };

  _onRefresh = () => {
    this.setState({
      loading: false,
      recentActivity: [],
    });
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getAllNotifications(email, '[0,1]')
        .then((notify: any) => {
          console.log(notify.data.data.notifications);
          this.setState({
            notificationsData: notify.data.data.notifications,
            count: notify.data.data.notifications.filter(
              (n: any) => n.status == 0,
            ).length,
          });
        });
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
    const data = [
      {val: this.state.noOfCompleted, color: '#3867D6'},
      {val: this.state.noOfDrafts, color: '#3498DB'},
      {val: this.state.noOfPublished, color: '#55D8FE'},
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

    // const inspectionData = data.filter((value) => )

    // Inspection data
    const inspectionD = [
      {val: 28, color: '#F14031'},
      {val: 25, color: '#FED330'},
      {val: 20, color: '#FA8231'},
      {val: 80, color: '#FD9644'},
    ];
    const inspectionData = inspectionD
      .filter((value) => value.val > 0)
      .map((value, index) => ({
        value: value.val,
        svg: {
          fill: value.color,
          onPress: () => {},
        },
        key: `pie-${index}`,
      }));
    // Risk Assesments data
    const riskAssesmentsD = [
      {val: this.state.mediumRisk, color: '#778CA3'},
      {val: this.state.highRisk, color: '#A5B1C2'},
      {val: this.state.lowRisk, color: '#C3C9DB'},
    ];
    const riskAssesments = riskAssesmentsD
      .filter((value) => value.val > 0)
      .map((value, index) => ({
        value: value.val,
        svg: {
          fill: value.color,
          onPress: () => {},
        },
        key: `pie-${index}`,
      }));
    // Learning management data
    const learningManagementD = [
      {val: 28, color: '#0B8F88'},
      {val: 25, color: '#04BDA9'},
      {val: 20, color: '#35E2D0'},
    ];
    const learnigManagement = learningManagementD
      .filter((value) => value.val > 0)
      .map((value, index) => ({
        value: value.val,
        svg: {
          fill: value.color,
          onPress: () => {},
        },
        key: `pie-${index}`,
      }));
    // Audits data
    const auditData = [
      {val: 28, color: '#F14031'},
      {val: 25, color: '#FED330'},
    ];
    const AuditManagement = auditData
      .filter((value) => value.val > 0)
      .map((value, index) => ({
        value: value.val,
        svg: {
          fill: value.color,
          onPress: () => {},
        },
        key: `pie-${index}`,
      }));

    // ACtions data
    const actionD = [
      {val: this.state.pendingActionTotal, color: '#715DDF'},
      {val: this.state.completedActionTotal, color: '#A998FC'},
    ];
    const actionData = actionD
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
                  source={{uri: this.state.orgImage}}
                  style={styles.orgLogoPng}
                />
              </View>

              <View style={{alignSelf: 'center'}}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.orgTitle}>{this.state.name}</Text>
              </View>
              {/* <CopilotStep
                text="This is a hello world example!"
                order={5}
                name="hello">
                <CopilotText>Hello world!</CopilotText>
              </CopilotStep> */}
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
                onPress={() => this.props.navigation.navigate('MyTasks')}
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
            {/* your recent activities */}
            <View style={styles.recentActivity}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Your Recent Activities</Text>
              </View>
              <View
                style={{
                  marginTop: wp(3),
                  paddingLeft: wp(3),
                  flexDirection: 'row',
                  paddingRight: wp(3),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Tasks Assigned to you
                </Text>
                {this.state.taskAssignedToYou.length > 3 ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ViewAll', {
                        data: this.state.taskAssignedToYou,
                        title: 'Tasks Assigned to you',
                      })
                    }>
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {this.state.taskAssignedToYou.length == 0 ? (
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
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(3),
                      marginRight: wp(3),
                    }}>
                    {this.state.taskAssignedToYou
                      .slice(0, 3)
                      .map((d: actionsDashboard, i: number) => (
                        <ListCard
                          key={i}
                          classify={d.sorType}
                          repeated={[]}
                          location={d.location}
                          styles={
                            this.state.taskAssignedToYou.slice(0, 3).length ==
                            i + 1
                              ? {borderBottomWidth: wp(0)}
                              : null
                          }
                          user1={undefined}
                          user2={undefined}
                          observation={d.details}
                          username={d.createdBy}
                          iconconf={classifySor.find(
                            (e: any) => e.title == d.sorType,
                          )}
                          onPress={() => {
                            createApi
                              .createApi()
                              .getSors(d.projectId, d.data._id)
                              .then((rep) => {
                                console.log(rep);
                                this.props.navigation.navigate('ViewSOR', {
                                  data: rep.data.data.report[0],
                                });
                              });
                          }}
                          onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                          date={d.createdAt}
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
              <View
                style={{
                  marginTop: wp(3),
                  paddingLeft: wp(3),
                  flexDirection: 'row',
                  paddingRight: wp(3),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Tasks Assigned by you
                </Text>
                {this.state.taskAssignedByYou.length > 3 ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ViewAll', {
                        data: this.state.taskAssignedByYou,
                        title: 'Tasks Assigned by you',
                      })
                    }>
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              {this.state.taskAssignedByYou.length == 0 ? (
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
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(3),
                      marginRight: wp(3),
                    }}>
                    {this.state.taskAssignedByYou
                      .slice(0, 3)
                      .map((d: actionsDashboard, i: number) => (
                        // <Text>{d.details}</Text>
                        <ListCard
                          classify={d.sorType}
                          key={i}
                          repeated={[]}
                          location={d.location}
                          styles={
                            this.state.taskAssignedByYou.slice(0, 3).length ==
                            i + 1
                              ? {borderBottomWidth: wp(0)}
                              : null
                          }
                          user1={undefined}
                          user2={undefined}
                          observation={d.details}
                          username={d.createdBy}
                          iconconf={classifySor.find(
                            (e: any) => e.title == d.sorType,
                          )}
                          onPress={() => {
                            createApi
                              .createApi()
                              .getSors(d.projectId, d.data._id)
                              .then((rep) => {
                                console.log(rep);
                                this.props.navigation.navigate('ViewSOR', {
                                  data: rep.data.data.report[0],
                                });
                              });
                          }}
                          onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                          date={d.createdAt}
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
              <View
                style={{
                  marginTop: wp(3),
                  paddingLeft: wp(3),
                  flexDirection: 'row',
                  paddingRight: wp(3),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Tasks you are involved in
                </Text>
                {this.state.taskYouAreInvolvedIn.length > 3 ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ViewAll', {
                        data: this.state.taskAssignedByYou,
                        title: 'Tasks you are involved in',
                      })
                    }>
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              {this.state.taskYouAreInvolvedIn.length == 0 ? (
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
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(3),
                      marginRight: wp(3),
                    }}>
                    {this.state.taskYouAreInvolvedIn
                      .slice(0, 3)
                      .map((d: actionsDashboard, i: number) => (
                        <ListCard
                          classify={d.sorType}
                          key={i}
                          repeated={[]}
                          location={d.location}
                          styles={
                            this.state.taskYouAreInvolvedIn.slice(0, 3)
                              .length ==
                            i + 1
                              ? {borderBottomWidth: wp(0)}
                              : null
                          }
                          user1={undefined}
                          user2={undefined}
                          observation={d.details}
                          username={d.createdBy}
                          iconconf={classifySor.find(
                            (e: any) => e.title == d.sorType,
                          )}
                          onPress={() => {
                            createApi
                              .createApi()
                              .getSors(d.projectId, d.data._id)
                              .then((rep) => {
                                console.log(rep);
                                this.props.navigation.navigate('ViewSOR', {
                                  data: rep.data.data.report[0],
                                });
                              });
                          }}
                          onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                          date={d.createdAt}
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
            {/*              
            <View style={styles.recentActivity}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Overall Summary</Text>
              </View>
              <View
                style={{
                  marginTop: wp(3),
                  paddingLeft: wp(3),
                  flexDirection: 'row',
                  paddingRight: wp(3),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplayBold,
                    color: colors.primary,
                  }}>
                  {' '}
                  Recent Observations
                </Text>
                {this.state.recentActivity.length > 3 ? (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('MyTasks')}>
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
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={() => this._onRefresh()}
                      refreshing={this.state.refreshing}
                    />
                  }>
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(3),
                      marginRight: wp(3),
                    }}>
                    {this.state.recentActivity
                      .slice(0, 3)
                      .map((d: Isor, i: number) => (
                        <ListCard
                          key={i}
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
                          date={d.occurred_at}
                        />
                      ))}
                  </View>
                </ScrollView>
              )}
            </View>
           */}
            {/* latest incidents */}
            {/* 
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
              {this.state.latestIncidents.length == 0 ? (
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
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(3),
                      marginRight: wp(3),
                    }}>
                    {this.state.latestIncidents.map((d: Isor, i: number) => (
                      <ListCard
                        key={i}
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
                        styles={
                          this.state.latestIncidents.length == i + 1
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
                        date={d.occurred_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
             */}
            {/* open audits  */}
            {/*             
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
              {this.state.openAudits.length == 0 ? (
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
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(3),
                      marginRight: wp(3),
                    }}>
                    {this.state.openAudits.map((d: Isor, i: number) => (
                      <ListCard
                        key={i}
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
                        styles={
                          this.state.openAudits.length == i + 1
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
                        date={d.occurred_at}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
            */}
            {/* upcomming trainings  */}

            {/* 

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
              {this.state.upCommingTrainings.length == 0 ? (
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
                  <View
                    style={{
                      marginTop: wp(3),
                      marginLeft: wp(3),
                      marginRight: wp(3),
                    }}>
                    {this.state.upCommingTrainings.map((d: Isor, i: number) => (
                      <ListCard
                        key={i}
                        classify={d.sor_type}
                        repeated={d.repeatedSor}
                        location={d.location}
                        styles={
                          this.state.upCommingTrainings.length == i + 1
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
            </View> */}

            {/* Performace stats */}
            <View style={styles.perfStats}>
              <View
                style={{
                  // alignItems: 'center',
                  // padding: wp(3),
                  paddingLeft: wp(3),
                  paddingBottom: wp(1),
                  backgroundColor: '#F6F6F6',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.actHeading}>Performance Statistics</Text>
                  {/* <Text style={[styles.viewAll, {right: wp(3)}]}>View All</Text> */}
                </View>
                <View style={[styles.tabs, {alignSelf: 'center'}]}>
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
                        backgroundColor: '#E6E6E6',
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
                        backgroundColor: '#E6E6E6',
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
                        backgroundColor: '#E6E6E6',
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

              {/* ACtions Chart */}
              {/* Tabs Content */}
              <View style={{marginBottom: wp(3), padding: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: 'black',
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Actions
                </Text>
                <Animated.View style={styles.tabsContent}>
                  <PieChart
                    padAngle={0}
                    animate={true}
                    innerRadius={'90%'}
                    style={{height: wp(50), width: wp(50)}}
                    data={actionData}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.chartContent}>Total</Text>
                      <Text style={styles.chartContent}>Actions</Text>
                      <Text style={styles.chartContent}>
                        {this.state.completedActionTotal}
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
                        {marginLeft: wp(4), backgroundColor: '#715DDF'},
                      ]}></View>
                    <Text style={styles.guideText}>In Progress</Text>
                  </View>
                  <View style={[styles.guideitem]}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#A998FC'},
                      ]}></View>
                    <Text style={styles.guideText}>Completed</Text>
                  </View>
                </View>
              </View>
              {/* line height */}
              <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} />
              {/* observation and feedback */}
              <View style={{marginBottom: wp(3), padding: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: 'black',
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Observation and Feedback
                </Text>
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
                        {this.state.totalObs}
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
                        {marginLeft: wp(4), backgroundColor: '#3867D6'},
                      ]}></View>
                    <Text style={styles.guideText}>Completed</Text>
                  </View>
                  <View style={[styles.guideitem]}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#3498DB'},
                      ]}></View>
                    <Text style={styles.guideText}>Drafts</Text>
                  </View>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#55D8FE'},
                      ]}></View>

                    <Text style={styles.guideText}>Published</Text>
                  </View>
                </View>
              </View>

              {/* line height */}
              <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} />
              {/* incidents */}
              {/* <View style={{marginBottom: wp(3), padding: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: 'black',
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Incidents
                </Text>

                <Animated.View style={styles.tabsContent}>
                 
                  <ProgressCircle
                    backgroundColor={'#C080FF'}
                    style={{height: wp(50), width: wp(50)}}
                    progress={0.7}
                    strokeWidth={wp(3)}
                    progressColor={'rgb(134, 65, 244)'}
                  />
                </Animated.View>
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
              </View> */}
              {/* line height */}
              {/* <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} /> */}
              {/* inspection */}
              {/* <View style={{marginBottom: wp(3), padding: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: 'black',
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Inspections
                </Text>
                <Animated.View style={styles.tabsContent}>
                  <PieChart
                    padAngle={0.1}
                    animate={true}
                    innerRadius={'2%'}
                    style={{height: wp(50), width: wp(50)}}
                    data={inspectionData}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      {/* <Text style={styles.chartContent}>Total</Text> */}
              {/* <Text style={styles.chartContent}>Observations</Text> */}
              {/* <Text style={styles.chartContent}>
                        {this.state.totalObservations}
                      </Text> */}
              {/* </View>
                  </PieChart>
                </Animated.View> */}
              {/* colors guide */}
              {/* <View style={styles.guideColors}>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(4), backgroundColor: '#FA8231'},
                      ]}></View>
                    <Text style={styles.guideText}>Completed</Text>
                  </View>
                  <View style={[styles.guideitem]}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#FD9644'},
                      ]}></View>
                    <Text style={styles.guideText}>In Progress</Text>
                  </View>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#F14031'},
                      ]}></View>

                    <Text style={styles.guideText}>Scheduled</Text>
                  </View>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#FED330'},
                      ]}></View>

                    <Text style={styles.guideText}>Draft</Text>
                  </View>
                </View> */}
              {/* </View> */}

              {/* line height */}
              {/* <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} /> */}
              {/* risk assessments */}
              <View style={{marginBottom: wp(3), padding: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: 'black',
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Risk Assessments
                </Text>
                <Animated.View style={styles.tabsContent}>
                  <PieChart
                    padAngle={0.2}
                    animate={true}
                    innerRadius={'0%'}
                    style={{height: wp(50), width: wp(50)}}
                    data={riskAssesments}></PieChart>
                </Animated.View>
                {/* colors guide */}
                <View style={styles.guideColors}>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(4), backgroundColor: '#4B6584'},
                      ]}></View>
                    <Text style={styles.guideText}>Medium</Text>
                  </View>
                  <View style={[styles.guideitem]}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#778CA3'},
                      ]}></View>
                    <Text style={styles.guideText}>High</Text>
                  </View>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#A5B1C2'},
                      ]}></View>
                    <Text style={styles.guideText}>Low</Text>
                  </View>
                </View>
              </View>
              {/* line height */}
              {/* <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} /> */}
              {/* learning management */}
              {/* <View style={{marginBottom: wp(3), padding: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: 'black',
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Learning Management
                </Text>
                <Animated.View style={styles.tabsContent}>
                  <PieChart
                    padAngle={0}
                    animate={true}
                    innerRadius={'70%'}
                    style={{height: wp(50), width: wp(50)}}
                    data={learnigManagement}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.chartContent}>Total</Text>
                      <Text style={styles.chartContent}>Trainings</Text>
                      <Text style={styles.chartContent}>
                        {this.state.totalObservations}
                      </Text>
                    </View>
                  </PieChart>
                </Animated.View>
                <View style={styles.guideColors}>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(4), backgroundColor: '#0B8F88'},
                      ]}></View>
                    <Text style={styles.guideText}>Closed</Text>
                  </View>
                  <View style={[styles.guideitem]}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#04BDA9'},
                      ]}></View>
                    <Text style={styles.guideText}>In Progress</Text>
                  </View>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#35E2D0'},
                      ]}></View>

                    <Text style={styles.guideText}>Inverted</Text>
                  </View>
                </View>
              </View> */}

              {/* line height */}
              {/* <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} /> */}
              {/* Audits */}
              {/* <View style={{marginBottom: wp(3), padding: wp(3)}}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    color: 'black',
                    fontFamily: fonts.SFuiDisplayBold,
                  }}>
                  Audits
                </Text>
                <Animated.View style={styles.tabsContent}>
                  <ProgressCircle
                    style={{height: wp(50), width: wp(50)}}
                    progress={0.7}
                    backgroundColor={'#A995FF'}
                    strokeWidth={wp(3)}
                    progressColor={'rgb(134, 65, 244)'}
                  />
                </Animated.View>
                <View style={styles.guideColors}>
                  <View style={styles.guideitem}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(4), backgroundColor: '#A995FF'},
                      ]}></View>
                    <Text style={styles.guideText}>In Progress</Text>
                  </View>
                  <View style={[styles.guideitem]}>
                    <View
                      style={[
                        styles.swatch,
                        {marginLeft: wp(3), backgroundColor: '#7158E2'},
                      ]}></View>
                    <Text style={styles.guideText}>Closed</Text>
                  </View>
                </View>
              </View> */}
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
                  style={{
                    // styles.draftCardContainer,
                    marginBottom: wp(5),
                  }}
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
const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});
var copHome = copilot({
  // style: {}
  verticalOffset: 24,
  animated: true,
  overlay: 'svg',
})(Home);
export default connect(mapStateToProps, mapDispatchToProps)(copHome);
