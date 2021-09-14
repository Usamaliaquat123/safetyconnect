import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  RefreshControl,
  PanResponder,
  Image,
  TextInput,
} from 'react-native';
import {createApi, Create_sor, submitted} from '@service';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts, animation, images, GlStyles} from '@theme';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {AllSorDTO} from '@dtos';
import {connect} from 'react-redux';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import OneSignal from 'react-native-onesignal';
import * as reduxActions from '../../../../store/actions/listSorActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {
  classifySor,
  filterAndMappingPersons,
  mapAllProjects,
  mapAllOrganizations,
  savedCurrentProject,
  getCurrentProject,
  getAllProjects,
  getCurrentOrganization,
} from '@utils';
import {Card, ListCard} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {createApi} from '@service';
// import {Storage} from 'aws-amplify';

// import jwtDecode from 'jwt-decode';
import {Isor, involved_persons, orgnaization} from '@typings';
// import {  } from "";
import {messages} from '../../../../services/messaging_mock';
type ViewAllSOrNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ViewAllSOr'
>;
type ViewAllSOrRouteProp = RouteProp<StackNavigatorProps, 'ViewAllSOr'>;
// Project Id
export interface ViewAllProps {
  route: ViewAllSOrRouteProp;
  navigation: ViewAllSOrNavigationProp;
  reduxActions: any;
  reduxState: AllSorDTO;
  // initial: AllSorDTO;
  initialList: any;
}
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function dp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = dp(80);
const itemHorizontalMargin = dp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const SLIDER_1_FIRST_ITEM = 1;
export class ViewAllSOr extends React.Component<ViewAllProps, any> {
  constructor(props: ViewAllProps) {
    super(props);
    this.state = {
      // animation of drafts
      AnimatedDownDraft: new Animated.Value(0),
      AnimatedOpacDraft: new Animated.Value(0),
      // animation of notified
      AnimatedDownNotify: new Animated.Value(0),
      AnimatedOpacNotify: new Animated.Value(0),
      // animation of submitted
      AnimatedDownSubmitted: new Animated.Value(0),
      AnimatedOpacSubmitted: new Animated.Value(0),
      currentlocation: Create_sor.Observation.locations[0],
      project: 'List View',
      isInProgress: false,
      isDraft: false,
      isSubmited: false,
      isExclated: false,
      isCompleted: false,
      selectP: false,
      draft: [],
      exclated: [],
      submitted: [],
      closed: [],
      inprogress: [],
      pendingClosure: [],
      repeatedSorModal: false,
      isAuthenticated: false,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      bottomWidth: wp(100),
      setUser: '',
      // New sor modal popup
      newsorModal: false,
      refreshing: false,
      involvedPerson: [],
      searchValue: '',
      repeatedSors: [],
      projectSelectors: false,
      loading: false,
      projects: [],
      projectId: '',
      projectName: '',
    };
  }

  componentDidMount = () => {
    console.log(this.props.reduxState.allSors);
    // console.log(this.props.reduxState.loading);

    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((user  :any) => {
          getCurrentProject().then((currentProj: any) => {
            this.setState({projectId: currentProj});

            // this.props.reduxActions.getAllSors(currentProj, [1, 2, 3, 4, 5]);

            createApi
              .createApi()
              .getProject(currentProj, user.data.data._id)
              .then((involvedPerson: any) => {
                console.log(involvedPerson);
                console.log('involvedPerson.data');
                this.setState({
                  projectName: involvedPerson.data.data.project_name,
                });
                var j = {};
                var arr = [];
                for (
                  let i = 0;
                  i < involvedPerson.data.data.involved_persons.length;
                  i++
                ) {
                  Object.defineProperty(
                    j,
                    involvedPerson.data.data.involved_persons[i].email,
                    {
                      value: involvedPerson.data.data.involved_persons[i],
                      writable: false,
                    },
                  );
                  this.state.involvedPerson.push(
                    involvedPerson.data.data.involved_persons[i],
                  );
                }

                AsyncStorage.setItem(
                  'involved_person',
                  JSON.stringify(this.state.involvedPerson),
                );
              });

            AsyncStorage.getItem('filters').then((filtersObj) => {
              console.log('filtersObj');
              console.log(JSON.parse(filtersObj));
              var dta = JSON.parse(filtersObj);
              var data = {
                project: currentProj,
                limit: 1000000,
                page: 0,
                query: {status: [1, 2, 3, 4, 5]},
              };
              if (dta != null) {
                if (Object.keys(dta).length !== 0) {
                  data['query'] = dta;
                }
                if (dta.rangeFrom == undefined || dta.risk == undefined) {
                  data['query']['status'] = [1, 2, 3, 4, 5];
                }
              }

              console.log('filtered data');
              console.log(data);
              createApi
                .createApi()
                .filterSors(data)
                .then((res: any) => {
                  if (res.data.message == 'no sor found') {
                    // console.log('gaye mutheda');
                    // console.log(dta);
                    // console.log(dta);
                    if (dta != null) {
                      showMessage({
                        message: 'No sor found',
                        type: 'danger',
                        position: 'bottom',
                      });
                      this.setState({
                        nosorOrSorMessage:
                          'try the different filter or create the',
                      });
                      // this.setState({loading: false});
                      this.props.reduxActions.setLoading(false);
                    } else {
                      this.setState({
                        nosorOrSorMessage: 'would you like to create the ',
                      });
                      this.props.reduxActions.setLoading(false);
                      // this.setState({loading: false});
                    }
                  }
                  // console.log('gaye mutheda');
                  // console.log(res.data);
                  if (res.data.data == undefined) {
                    this.setState({lovading: false});
                  } else {
                    res.data.data.report.reverse();
                    for (let i = 0; i < res.data.data.report.length; i++) {
                      if (res.data.data.report[i].status == 1) {
                        // var rep = filterAndMappingPersons(
                        //   res.data.data.report[i],
                        //   this.state.involvedPerson,
                        // );

                        if (res.data.data.report[i].details != undefined) {
                          this.state.draft.push(res.data.data.report[i]);
                        }
                      } else if (res.data.data.report[i].status == 2) {
                        // var rep = filterAndMappingPersons(
                        //   res.data.data.report[i],
                        //   this.state.involvedPerson,
                        // );

                        if (res.data.data.report[i].details != undefined) {
                          this.state.inprogress.push(res.data.data.report[i]);
                          // this.state.submitted.push(rep);
                        }
                      } else if (res.data.data.report[i].status == 3) {
                        // var rep = filterAndMappingPersons(
                        //   res.data.data.report[i],
                        //   this.state.involvedPerson,
                        // );

                        if (res.data.data.report[i].details != undefined) {
                          this.state.exclated.push(res.data.data.report[i]);
                        }
                      } else if (res.data.data.report[i].status == 4) {
                        // var rep = filterAndMappingPersons(
                        //   res.data.data.report[i],
                        //   this.state.involvedPerson,
                        // );

                        if (res.data.data.report[i].details != undefined) {
                          this.state.pendingClosure.push(
                            res.data.data.report[i],
                          );
                        }
                      } else if (res.data.data.report[i].status == 5) {
                        // var rep = filterAndMappingPersons(
                        //   res.data.data.report[i],
                        //   this.state.involvedPerson,
                        // );

                        if (res.data.data.report[i].details != undefined) {
                          this.state.closed.push(res.data.data.report[i]);
                        }
                      }
                    }
                  }

                  this.setState({loading: false});
                })
                .catch((err) => console.log(err));
            });
          });
        });
    });
    // this.props.

    // console.log(this.props.reduxActions.)
    getCurrentOrganization().then((orgId: any) => {
      console.log('orgId');
      console.log(orgId);
      createApi
        .createApi()
        .getOrganization(orgId)
        .then((org: any) => {
          this.setState({projects: org.data.data.projects});
        });
    });
  };
  selecteProj = async (d: any) => {
    this.setState({
      selectedProject: d,
      projectSelectors: false,
    });

    // console.log('d');
    // console.log(d);

    this.setState({
      draft: [],
      inprogress: [],
      exclated: [],
      pendingClosure: [],
      closed: [],
    });

    await savedCurrentProject(d.project_id._id);
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
  _onRefresh = () => {
    this.setState({
      involvedPerson: [],
      draft: [],
      inprogress: [],
      exclated: [],
      pendingClosure: [],
      closed: [],
    });
    this.componentDidMount();
  };

  render() {
    return (
      <View style={{backgroundColor: colors.secondary, flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this._onRefresh()}
              refreshing={this.state.refreshing}
            />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
              onPress={() => this.props.navigation.navigate("home")}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Observations and Feedback</Text>
              </View>
            </View>
            <View style={styles.headerSelect}>
              <TouchableOpacity
                onPress={() => this.setState({projectSelectors: true})}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: wp(3),
                    marginRight: wp(3),
                    color: colors.secondary,

                    fontFamily: fonts.SFuiDisplayMedium,
                  }}>
                  {this.state.projectName}
                </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.secondary}
                />
              </TouchableOpacity>

              {/* list viw and board view */}
              <View style={styles.leftSelector}>
                <TouchableOpacity
                  onPress={() => this.setState({project: 'List View'})}
                  style={{width: wp(5), height: wp(5)}}>
                  <Image
                    source={images.listview}
                    style={[
                      GlStyles.images,
                      this.state.project == 'List View'
                        ? {tintColor: colors.green}
                        : {tintColor: colors.lightGrey},
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({project: 'Board View'})}
                  style={{width: wp(5), height: wp(5), marginLeft: wp(5)}}>
                  <Image
                    source={images.boardView}
                    style={[
                      GlStyles.images,
                      this.state.project != 'List View'
                        ? {tintColor: colors.green}
                        : {tintColor: colors.lightGrey},
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            {/* Search bar  */}
            <View style={styles.searchbarContainer}>
              <View style={styles.searchContainer}>
                <TextInput
                  onFocus={() => this.setState({selectedInputIndex: 5})}
                  underlineColorAndroid="transparent"
                  onChangeText={(v: any) => {
                    this.setState({searchValue: v});
                  }}
                  placeholder={'Search'}
                  style={styles.optnselectorText}
                  value={this.state.searchValue}></TextInput>
                <Icon
                  onPress={() => {
                    AsyncStorage.setItem(
                      'filters',
                      JSON.stringify({details: this.state.searchValue}),
                    );

                    this.componentDidMount();
                  }}
                  style={{padding: 3, opacity: 0.5}}
                  size={wp(6)}
                  name="search1"
                  type="antdesign"
                  color={colors.text}
                />
              </View>
              <Icon
                style={{padding: 3}}
                size={wp(7)}
                name="filter-variant"
                type="material-community"
                color={colors.primary}
              />

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Filters')}>
                <Text style={styles.filerText}>Filters </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineheight}></View>
            {this.props.reduxState.loading == true ? (
              <View style={styles.lottiefilesLoading}>
                <LottieView
                  // ref={(animation) => {
                  //   this.photoAnim = animation;
                  // }}
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
                <Text style={styles.loadingtext}>loading...</Text>
              </View>
            ) : (
              <>
                {this.state.project == 'List View' ? (
                  <View>
                    <ScrollView
                      style={styles.scrollViewContainerList}
                      showsVerticalScrollIndicator={false}>
                      {/* when you have 0 reports */}
                      {this.state.draft.length == 0 &&
                      this.state.inprogress.length == 0 &&
                      this.state.exclated.length == 0 &&
                      this.state.closed.length == 0 &&
                      this.state.pendingClosure.length == 0 ? (
                        <View style={styles.nonReport}>
                          <Text style={styles.nonReportText}>
                            You don't have any reports yet...
                          </Text>
                          <View
                            style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <Text style={styles.noncreate}>
                              {this.state.nosorOrSorMessage}
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
                        <>
                          {/* List View */}
                          {/* {this.state.draft.length == 0 ? null : ( */}
                          <View
                            style={{
                              paddingBottom: wp(5),
                              paddingLeft: wp(3),
                              paddingRight: wp(3),
                            }}>
                            <View style={styles.listHeader}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (this.state.isDraft == true) {
                                    this.setState({isDraft: false});
                                    // this.closeDropDown(this.state.isDraft);
                                  } else {
                                    this.setState({isDraft: true});
                                    // this.dropdownAnimated(this.state.isDraft);
                                  }
                                }}
                                style={{flexDirection: 'row'}}>
                                <Icon
                                  size={wp(3.5)}
                                  color={colors.primary}
                                  name={
                                    this.state.isDraft == true ? 'down' : 'up'
                                  }
                                  type="antdesign"
                                />
                                <Text style={styles.listDraftText}>Drafts</Text>
                              </TouchableOpacity>
                            </View>

                            {this.state.isDraft == true ? (
                              <View style={[styles.listViewContent]}>
                                {this.state.draft
                                  .slice(0, 3)
                                  .map((d: Isor, i: number) => (
                                    <ListCard
                                      key={i}
                                      classify={d.sor_type}
                                      styles={
                                        this.state.draft.slice(0, 3).length ==
                                        i + 1
                                          ? {borderBottomWidth: wp(0)}
                                          : null
                                      }
                                      user1={undefined}
                                      user2={undefined}
                                      observation={d.details}
                                      repeated={d.repeatedSor}
                                      username={d.created_by}
                                      iconconf={classifySor.find(
                                        (e: any) =>
                                          e.title == d.sor_type.toString(),
                                      )}
                                      onPress={
                                        () =>
                                          this.props.navigation.navigate(
                                            'ViewSOR',
                                            {
                                              data: d,
                                            },
                                          )
                                        // this.props.navigation.navigate('home')
                                      }
                                      location={d.location}
                                      date={d.occurred_at}
                                      onPressRepeated={(e) =>
                                        this.getAllRepeatedSor(e)
                                      }
                                    />
                                  ))}
                                {this.state.draft.length > 3 && (
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.props.navigation.navigate(
                                        'ViewAll',
                                        {
                                          data: 1,
                                          title: 'Draft',
                                        },
                                      );
                                    }}
                                    style={{marginLeft: wp(4)}}>
                                    <Text
                                      style={{
                                        fontSize: wp(3),
                                        color: colors.primary,
                                      }}>
                                      See More
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                            ) : null}
                          </View>
                          {/* )} */}
                          {/* {this.state.inprogress.length == 0 ? null : ( */}
                          <View>
                            <View style={styles.lineheight}></View>
                            <View style={styles.inProgressTop}>
                              <View style={styles.listHeader}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({
                                      isInProgress: !this.state.isInProgress,
                                    });
                                  }}
                                  style={{flexDirection: 'row'}}>
                                  <Icon
                                    size={wp(3.5)}
                                    name={
                                      this.state.isInProgress == true
                                        ? 'down'
                                        : 'up'
                                    }
                                    type="antdesign"
                                    color={colors.primary}
                                  />
                                  <Text style={styles.listDraftText}>
                                    In Progress
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              {/* <View style={{width:120,height:125}, item.status==='1' ?{display: "block"}: {display:'none'}}> */}
                              {this.state.isInProgress == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.inprogress
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        onPressRepeated={(e) =>
                                          this.getAllRepeatedSor(e)
                                        }
                                        key={i}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.inprogress.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={undefined}
                                        user2={undefined}
                                        observation={d.details}
                                        username={d.created_by}
                                        repeated={d.repeatedSor}
                                        iconconf={classifySor.find(
                                          (e: any) => e.title == d.sor_type,
                                        )}
                                        onPress={() => {
                                          // d['stat'];

                                          this.props.navigation.navigate(
                                            'ViewSOR',
                                            {
                                              data: d,
                                            },
                                          );
                                        }}
                                        location={d.location}
                                        date={d.occurred_at}
                                      />
                                    ))}
                                  {this.state.inprogress.length > 3 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.props.navigation.navigate(
                                          'ViewAll',
                                          {
                                            data: 2,
                                            title: 'In Progress',
                                          },
                                        );
                                      }}
                                      style={{
                                        marginLeft: wp(4),
                                        marginTop: wp(3),
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: wp(3),
                                          color: colors.primary,
                                        }}>
                                        See More
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              ) : null}
                            </View>
                          </View>
                          {/* )} */}

                          {/* {this.state.submitted.length == 0 ? null : ( */}
                          <View>
                            <View style={styles.lineheight}></View>
                            <View
                              style={[
                                {
                                  paddingBottom: wp(3),
                                },
                                styles.closedTop,
                              ]}>
                              <View style={styles.listHeader}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({
                                      isSubmited: !this.state.isSubmited,
                                    });
                                    if (!this.state.isSubmited) {
                                      this.setState({bottomWidth: wp(40)});
                                    } else {
                                      this.setState({bottomWidth: wp(100)});
                                    }
                                  }}
                                  style={{flexDirection: 'row'}}>
                                  <Icon
                                    size={wp(3.5)}
                                    name={
                                      this.state.isSubmited == true
                                        ? 'down'
                                        : 'up'
                                    }
                                    color={colors.primary}
                                    type="antdesign"
                                  />
                                  <Text style={styles.listDraftText}>
                                    Escalated to
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              {this.state.isSubmited == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.exclated
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        onPressRepeated={(e) =>
                                          this.getAllRepeatedSor(e)
                                        }
                                        key={i}
                                        location={d.location}
                                        repeated={d.repeatedSor}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.exclated.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={undefined}
                                        user2={undefined}
                                        observation={d.details}
                                        username={d.created_by}
                                        iconconf={classifySor.find(
                                          (e: any) => e.title == d.sor_type,
                                        )}
                                        onPress={() =>
                                          //  console.log(d)

                                          {
                                            this.props.navigation.navigate(
                                              'ViewSOR',
                                              {
                                                data: d,
                                              },
                                            );
                                          }
                                        }
                                        date={d.occurred_at}
                                      />
                                    ))}
                                  {this.state.exclated.length > 3 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.props.navigation.navigate(
                                          'ViewAll',
                                          {
                                            data: 3,
                                            title: 'Notified To',
                                          },
                                        );
                                      }}
                                      style={{
                                        marginLeft: wp(4),
                                        marginTop: wp(3),
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: wp(3),
                                          color: colors.primary,
                                        }}>
                                        See More
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              ) : null}
                            </View>
                          </View>
                          {/* )} */}
                          {/* {this.state.exclated.length == 0 ? null : ( */}
                          <View>
                            <View style={styles.lineheight}></View>
                            <View style={styles.inProgressTop}>
                              <View style={styles.listHeader}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({
                                      isNotified: !this.state.isNotified,
                                    });
                                  }}
                                  style={{flexDirection: 'row'}}>
                                  <Icon
                                    size={wp(3.5)}
                                    name={
                                      this.state.isNotified == true
                                        ? 'down'
                                        : 'up'
                                    }
                                    color={colors.primary}
                                    type="antdesign"
                                  />
                                  <Text style={styles.listDraftText}>
                                    Pending Closure
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              {this.state.isNotified == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.pendingClosure
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        onPressRepeated={(e) =>
                                          this.getAllRepeatedSor(e)
                                        }
                                        key={i}
                                        location={d.location}
                                        repeated={d.repeatedSor}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.pendingClosure.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={undefined}
                                        user2={undefined}
                                        observation={d.details}
                                        username={d.created_by}
                                        iconconf={classifySor.find(
                                          (e: any) => e.title == d.sor_type,
                                        )}
                                        onPress={() =>
                                          this.props.navigation.navigate(
                                            'ViewSOR',
                                            {
                                              data: d,
                                            },
                                          )
                                        }
                                        date={d.occurred_at}
                                      />
                                    ))}
                                  {this.state.pendingClosure.length > 3 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.props.navigation.navigate(
                                          'ViewAll',
                                          {
                                            data: 4,
                                            title: 'Pending Closure',
                                          },
                                        );
                                      }}
                                      style={{
                                        marginLeft: wp(4),
                                        marginTop: wp(3),
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: wp(3),
                                          color: colors.primary,
                                        }}>
                                        See More
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              ) : null}
                            </View>
                          </View>
                          {/* )} */}

                          {/* {this.state.closed.length == 0 ? null : ( */}
                          <View>
                            <View style={styles.lineheight}></View>
                            <View style={styles.inProgressTop}>
                              <View style={styles.listHeader}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({
                                      isCompleted: !this.state.isCompleted,
                                    });
                                  }}
                                  style={{flexDirection: 'row'}}>
                                  <Icon
                                    size={wp(3.5)}
                                    color={colors.primary}
                                    name={
                                      this.state.isCompleted == true
                                        ? 'down'
                                        : 'up'
                                    }
                                    type="antdesign"
                                  />
                                  <Text style={styles.listDraftText}>
                                    Closed
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              {this.state.isCompleted == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.closed
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        onPressRepeated={(e) =>
                                          this.getAllRepeatedSor(e)
                                        }
                                        key={i}
                                        location={d.location}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.closed.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={undefined}
                                        user2={undefined}
                                        observation={d.details}
                                        username={d.created_by}
                                        iconconf={classifySor.find(
                                          (e: any) => e.title == d.sor_type,
                                        )}
                                        repeated={d.repeatedSor}
                                        onPress={() => {
                                          d['closed'] = true;
                                          this.props.navigation.navigate(
                                            'ViewSOR',
                                            {
                                              data: d,
                                            },
                                          );
                                        }}
                                        date={d.occurred_at}
                                      />
                                    ))}
                                  {this.state.closed.length > 5 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.props.navigation.navigate(
                                          'ViewAll',
                                          {
                                            data: 5,
                                            title: 'Closed',
                                          },
                                        );
                                      }}
                                      style={{
                                        marginLeft: wp(4),
                                        marginTop: wp(3),
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: wp(3),
                                          color: colors.primary,
                                        }}>
                                        See More
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              ) : null}
                            </View>
                          </View>
                          {/* )} */}
                        </>
                      )}
                    </ScrollView>
                  </View>
                ) : (
                  <ScrollView
                    style={styles.scrollViewBoardContainer}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={wp(83)}
                    decelerationRate="fast"
                    horizontal={true}>
                    {/* when you have 0 reports */}
                    {this.state.draft.length == 0 &&
                    this.state.inprogress.length == 0 &&
                    this.state.exclated.length == 0 &&
                    this.state.closed.length == 0 &&
                    this.state.pendingClosure.length == 0 ? (
                      <View style={[styles.nonReport, {padding: wp(25)}]}>
                        <Text style={styles.nonReportText}>
                          You don't have any reports yet...
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignSelf: 'center'}}>
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
                    ) : null}
                    {/* {this.state.draft.length == 0 ? null : ( */}
                    <View style={styles.boardContainer}>
                      <View>
                        <View style={styles.draftTextContainer}>
                          <Text style={styles.draftText}>Drafts</Text>
                        </View>
                      </View>

                      {this.state.draft
                        .slice(0, 3)
                        .map((d: Isor, i: number) => (
                          <Card
                            key={i}
                            type={'all'}
                            data={d}
                            onPress={(d: Isor) =>
                              this.props.navigation.navigate('ViewSOR', {
                                data: d,
                              })
                            }
                            name={d.created_by}
                            date={d.occured_at}
                            risk={d.risk.severity * d.risk.likelihood}
                            viewPortWidth={80}
                            observation={d.details}
                            classify={d.sor_type}
                            repeated={d.repeatedSor}
                            iconConf={classifySor.find(
                              (e: any) => e.title == d.sor_type,
                            )}
                            location={d.location}
                            style={[
                              styles.draftCardContainer,
                              // {marginBottom: wp()},
                            ]}
                            user1={d.user1}
                            user2={d.user2}
                            onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                          />
                        ))}
                      {this.state.draft.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('ViewAll', {
                              data: 1,
                              title: 'Draft',
                            });
                          }}
                          style={styles.draftSeeMorecontainer}>
                          <Text style={styles.seeMoretextDraft}>See More</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* )} */}
                    {/* {this.state.inprogress.length == 0 ? null : ( */}
                    <View style={styles.boardContainer}>
                      <View style={styles.draftTextContainer}>
                        <Text style={styles.draftText}>In Progress</Text>
                      </View>
                      {this.state.inprogress
                        .slice(0, 3)
                        .map((d: Isor, i: number) => (
                          <Card
                            repeated={d.repeatedSor}
                            key={i}
                            type={'all'}
                            name={d.created_by}
                            data={d}
                            onPress={(d: Isor) =>
                              this.props.navigation.navigate('ViewSOR', {
                                data: d,
                              })
                            }
                            date={d.occured_at}
                            risk={d.risk.severity * d.risk.likelihood}
                            viewPortWidth={80}
                            observation={d.details}
                            classify={d.sor_type}
                            iconConf={classifySor.find(
                              (e: any) => e.title == d.sor_type,
                            )}
                            location={d.location}
                            style={[styles.draftCardContainer]}
                            user1={d.user1}
                            user2={d.user2}
                            onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                          />
                        ))}
                      {this.state.inprogress.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.reduxActions.getAllSors(
                            //   '6038cf8472762b29b1bed1f3',
                            //   [this.props.route.params.data],
                            // );
                            this.props.navigation.navigate('ViewAll', {
                              data: 2,
                              title: 'In Progress',
                            });
                          }}
                          style={styles.seeMoreContainerInProgress}>
                          <Text
                            style={{
                              fontSize: wp(3),
                              color: colors.secondary,
                            }}>
                            See More
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* {this.state.submitted.length == 0 ? null : ( */}
                    <View style={styles.boardContainer}>
                      <View style={styles.submitTextContaienr}>
                        <Text style={styles.submitText}> Notified To</Text>
                      </View>
                      {this.state.submitted
                        .slice(0, 3)
                        .map((d: Isor, i: number) => (
                          <Card
                            key={i}
                            repeated={d.repeatedSor}
                            type={'all'}
                            data={d}
                            name={d.created_by}
                            onPress={(d: Isor) =>
                              this.props.navigation.navigate('ViewSOR', {
                                data: d,
                              })
                            }
                            date={d.occurred_at}
                            risk={d.risk.severity * d.risk.likelihood}
                            viewPortWidth={80}
                            user1={d.user1}
                            user2={d.user2}
                            observation={d.details}
                            classify={d.sor_type}
                            iconConf={classifySor.find(
                              (e: any) => e.title == d.sor_type,
                            )}
                            location={d.location}
                            style={[styles.submitCardContainer]}
                            onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                          />
                        ))}
                      {this.state.submitted.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.reduxActions.clearAllSor();
                            this.props.navigation.navigate('ViewAll', {
                              data: 3,
                              title: 'Notified To',
                            });
                          }}
                          style={{
                            alignSelf: 'center',
                            padding: wp(3),
                            paddingLeft: wp(10),
                            paddingRight: wp(10),
                            borderRadius: wp(3),
                            backgroundColor: colors.primary,
                          }}>
                          <Text
                            style={{
                              fontSize: wp(3),
                              color: colors.secondary,
                            }}>
                            See More
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {/* )} */}

                    {/* )} */}
                    {/* {this.state.exclated.length == 0 ? null : ( */}
                    <View style={styles.boardContainer}>
                      <View style={styles.draftTextContainer}>
                        <Text style={styles.draftText}> Pending Closure</Text>
                      </View>
                      {this.state.exclated
                        .slice(0, 3)
                        .map((d: Isor, i: number) => (
                          <Card
                            key={i}
                            repeated={d.repeatedSor}
                            type={'all'}
                            name={d.created_by}
                            data={d}
                            onPress={(d: Isor) =>
                              this.props.navigation.navigate('ViewSOR', {
                                data: d,
                              })
                            }
                            date={d.occurred_at}
                            risk={d.risk.severity * d.risk.likelihood}
                            viewPortWidth={80}
                            observation={d.details}
                            classify={d.sor_type}
                            onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                            iconConf={classifySor.find(
                              (e: any) => e.title == d.sor_type,
                            )}
                            location={d.location}
                            style={[styles.draftCardContainer]}
                            user1={d.user1}
                            user2={d.user2}
                          />
                        ))}
                      {this.state.exclated.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.reduxActions.clearAllSor();
                            this.props.navigation.navigate('ViewAll', {
                              data: 4,
                              title: 'Pending Closure',
                            });
                          }}
                          style={{
                            alignSelf: 'center',
                            padding: wp(3),
                            paddingLeft: wp(10),
                            paddingRight: wp(10),
                            borderRadius: wp(3),
                            backgroundColor: colors.primary,
                          }}>
                          <Text
                            style={{
                              fontSize: wp(3),
                              color: colors.secondary,
                            }}>
                            See More
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {/* )} */}
                    {/* {this.state.closed.length == 0 ? null : ( */}
                    <View style={styles.boardContainer}>
                      <View style={styles.draftTextContainer}>
                        <Text style={styles.draftText}>Closed</Text>
                      </View>
                      {this.state.closed
                        .slice(0, 3)
                        .map((d: Isor, i: number) => (
                          <Card
                            key={i}
                            type={'all'}
                            repeated={d.repeatedSor}
                            data={d}
                            name={d.created_by}
                            onPress={(d: Isor) =>
                              this.props.navigation.navigate('ViewSOR', {
                                data: d,
                              })
                            }
                            date={d.occurred_at}
                            risk={d.risk.severity * d.risk.likelihood}
                            viewPortWidth={80}
                            observation={d.details}
                            classify={d.sor_type}
                            iconConf={classifySor.find(
                              (e: any) => e.title == d.sor_type,
                            )}
                            location={d.location}
                            style={[styles.draftCardContainer]}
                            user1={d.user1}
                            user2={d.user2}
                            onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                          />
                        ))}
                      {this.state.closed.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.reduxActions.clearAllSor();
                            this.props.navigation.navigate('ViewAll', {
                              data: 5,
                              title: 'Closed',
                            });
                          }}
                          style={{
                            alignSelf: 'center',
                            padding: wp(3),
                            paddingLeft: wp(10),
                            paddingRight: wp(10),
                            borderRadius: wp(3),
                            backgroundColor: colors.primary,
                          }}>
                          <Text
                            style={{
                              fontSize: wp(3),
                              color: colors.secondary,
                            }}>
                            See More
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {/* )} */}
                  </ScrollView>
                )}
              </>
            )}
          </View>

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
        </ScrollView>

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
                onPress={(d: Isor) => {
                  this.props.navigation.navigate('ViewSOR', {
                    data: d,
                  });
                  this.setState({repeatedSorModal: false});
                }}
                onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                name={d.created_by}
                date={d.occurred_at}
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
        <FlashMessage ref="myLocalFlashMessage" />

        <Modal
          onBackdropPress={() => {
            this.setState({projectSelectors: !this.state.projectSelectors});
          }}
          isVisible={this.state.projectSelectors}>
          <View style={styles.modelContainer}>
            <View>
              <Text style={styles.errHeadPop}>Select your Project</Text>

              <>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    backgroundColor: colors.secondary,
                    borderWidth: wp(0.2),
                    alignSelf: 'center',
                    width: wp(50),
                    borderRadius: wp(2),
                    borderColor: colors.textOpa,
                  }}>
                  <>
                    {this.state.projects.map((d: any) => (
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
              </>
            </View>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewAllSOr);
