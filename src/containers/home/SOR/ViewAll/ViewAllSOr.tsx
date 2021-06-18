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
  getCurrentProject,
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
      completed: [],
      inprogress: [],
      isAuthenticated: false,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      bottomWidth: wp(100),
      setUser: '',
      // New sor modal popup
      newsorModal: false,
      refreshing: false,
      involvedPerson: [],
      loading: false,
      projectId: '',
    };
  }

  componentDidMount = () => {
    getCurrentProject().then((currentProj: any) => {
      this.setState({projectId: currentProj});
      createApi
        .createApi()
        .getProject({projectid: currentProj})
        .then((involvedPerson: any) => {
          console.log(involvedPerson.data);
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

      var data = {
        project: currentProj,
        limit: 1000000,
        page: 0,
        query: {status: [1, 2, 3, 4, 5]},
      };
      // this.setState({loading: true});

      createApi
        .createApi()
        .filterSors(data)
        .then((res: any) => {
          console.log('reports  are not available');
          console.log(res.data.data.report);
          if (res.data.data.report == undefined) {
            this.setState({loading: false});
          } else {
            res.data.data.report.sort(
              (a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt),
            );
            for (let i = 0; i < res.data.data.report.length; i++) {
              if (res.data.data.report[i].status == 1) {
                var rep = filterAndMappingPersons(
                  res.data.data.report[i],
                  this.state.involvedPerson,
                );
                if (res.data.data.report[i].details != undefined) {
                  this.state.draft.push(rep);
                }
              } else if (res.data.data.report[i].status == 2) {
                var rep = filterAndMappingPersons(
                  res.data.data.report[i],
                  this.state.involvedPerson,
                );
                if (res.data.data.report[i].details != undefined) {
                  this.state.submitted.push(rep);
                }
              } else if (res.data.data.report[i].status == 3) {
                var rep = filterAndMappingPersons(
                  res.data.data.report[i],
                  this.state.involvedPerson,
                );
                if (res.data.data.report[i].details != undefined) {
                  this.state.exclated.push(rep);
                }
              } else if (res.data.data.report[i].status == 4) {
                var rep = filterAndMappingPersons(
                  res.data.data.report[i],
                  this.state.involvedPerson,
                );
                if (res.data.data.report[i].details != undefined) {
                  this.state.inprogress.push(rep);
                }
              } else if (res.data.data.report[i].status == 5) {
                var rep = filterAndMappingPersons(
                  res.data.data.report[i],
                  this.state.involvedPerson,
                );
                if (res.data.data.report[i].details != undefined) {
                  this.state.completed.push(rep);
                }
              }
            }
          }

          this.setState({loading: false});
        })
        .catch((err) => console.log(err));

      
    });
  };
  _onRefresh = () => {
    this.setState({
      involvedPerson: [],
      draft: [],
      submitted: [],
      exclated: [],
      inprogress: [],
      completed: [],
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
              {/* Project selector */}
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
                  onChange={(v: any) => console.log(v)}
                  placeholder={'Search'}
                  style={styles.optnselectorText}
                  value={this.state.esclateTo}></TextInput>
                <Icon
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
              <Text style={styles.filerText}>Filters </Text>
            </View>
            <View style={styles.lineheight}></View>
            {this.state.loading == true ? (
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
                      this.state.completed.length == 0 &&
                      this.state.submitted.length == 0 ? (
                        <View style={styles.nonReport}>
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
                              <TouchableOpacity
                                onPress={() => {
                                  if (this.state.draftSorted == true) {
                                    this.state.draft.sort(
                                      (a: any, b: any) =>
                                        new Date(a.createdAt) -
                                        new Date(b.createdAt),
                                    );
                                    this.setState({draftSorted: false});
                                  } else {
                                    this.state.draft.sort(
                                      (a: any, b: any) =>
                                        new Date(b.createdAt) -
                                        new Date(a.createdAt),
                                    );
                                    this.setState({draftSorted: true});
                                  }

                                  // this.setState({});
                                }}
                                style={{
                                  position: 'absolute',
                                  right: wp(4),
                                  flexDirection: 'row',
                                }}>
                                <Icon
                                  color={colors.primary}
                                  containerStyle={{marginTop: wp(-0.6)}}
                                  size={wp(5)}
                                  name="filter"
                                  type="ionicon"
                                />
                                <Text style={styles.filterText}>Filter</Text>
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
                                      user1={
                                        d.involved_persons.length == 0
                                          ? ''
                                          : d.involved_persons[0].img_url
                                      }
                                      user2={
                                        d.submit_to.length == 0
                                          ? ''
                                          : d.submit_to[0].img_url
                                      }
                                      observation={d.details}
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
                                      date={d.occured_at}
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
                                <TouchableOpacity
                                  onPress={() => {
                                    if (this.state.inProgressSorted == true) {
                                      this.state.inprogress.sort(
                                        (a: any, b: any) =>
                                          new Date(a.createdAt) -
                                          new Date(b.createdAt),
                                      );
                                      this.setState({inProgressSorted: false});
                                    } else {
                                      this.state.inprogress.sort(
                                        (a: any, b: any) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt),
                                      );
                                      this.setState({inProgressSorted: true});
                                    }
                                  }}
                                  style={styles.filterHeader}>
                                  <Icon
                                    color={colors.primary}
                                    size={wp(5)}
                                    name="filter"
                                    type="ionicon"
                                  />
                                  <Text style={styles.filterText}>Filter</Text>
                                </TouchableOpacity>
                              </View>
                              {this.state.isInProgress == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.inprogress
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        key={i}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.inprogress.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={
                                          d.involved_persons.length == 0
                                            ? ''
                                            : d.involved_persons[0].img_url
                                        }
                                        user2={
                                          d.submit_to.length == 0
                                            ? ''
                                            : d.submit_to[0].img_url
                                        }
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
                                        date={d.occured_at}
                                      />
                                    ))}
                                  {this.state.inprogress.length > 3 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.props.navigation.navigate(
                                          'ViewAll',
                                          {
                                            data: 4,
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
                                    Notified to
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (this.state.notifiedToSorted == true) {
                                      this.state.submitted.sort(
                                        (a: any, b: any) =>
                                          new Date(a.createdAt) -
                                          new Date(b.createdAt),
                                      );
                                      this.setState({notifiedToSorted: false});
                                    } else {
                                      this.state.submitted.sort(
                                        (a: any, b: any) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt),
                                      );
                                      this.setState({notifiedToSorted: true});
                                    }
                                  }}
                                  style={{
                                    position: 'absolute',
                                    right: wp(4),
                                    flexDirection: 'row',
                                    marginTop: wp(-1),
                                  }}>
                                  <Icon
                                    color={colors.primary}
                                    size={wp(5)}
                                    name="filter"
                                    type="ionicon"
                                  />

                                  <Text style={styles.filterText}>Filter</Text>
                                </TouchableOpacity>
                              </View>
                              {this.state.isSubmited == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.submitted
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        key={i}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.submitted.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={
                                          d.involved_persons.length == 0
                                            ? ''
                                            : d.involved_persons[0].img_url
                                        }
                                        user2={
                                          d.submit_to.length == 0
                                            ? ''
                                            : d.submit_to[0].img_url
                                        }
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
                                        date={d.occured_at}
                                      />
                                    ))}
                                  {this.state.submitted.length > 3 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.props.navigation.navigate(
                                          'ViewAll',
                                          {
                                            data: 2,
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
                                <TouchableOpacity
                                  onPress={() => {
                                    if (
                                      this.state.pendingClosureSorted == true
                                    ) {
                                      this.state.exclated.sort(
                                        (a: any, b: any) =>
                                          new Date(a.createdAt) -
                                          new Date(b.createdAt),
                                      );
                                      this.setState({
                                        pendingClosureSorted: false,
                                      });
                                    } else {
                                      this.state.exclated.sort(
                                        (a: any, b: any) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt),
                                      );
                                      this.setState({
                                        pendingClosureSorted: true,
                                      });
                                    }
                                  }}
                                  style={styles.filterHeader}>
                                  <Icon
                                    color={colors.primary}
                                    size={wp(5)}
                                    name="filter"
                                    type="ionicon"
                                  />
                                  <Text style={styles.filterText}>Filter</Text>
                                </TouchableOpacity>
                              </View>
                              {this.state.isNotified == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.exclated
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        key={i}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.exclated.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={
                                          d.involved_persons.length == 0
                                            ? ''
                                            : d.involved_persons[0].img_url
                                        }
                                        user2={
                                          d.submit_to.length == 0
                                            ? ''
                                            : d.submit_to[0].img_url
                                        }
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
                                        date={d.occured_at}
                                      />
                                    ))}
                                  {this.state.exclated.length > 3 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.props.navigation.navigate(
                                          'ViewAll',
                                          {
                                            data: 3,
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

                          {/* {this.state.completed.length == 0 ? null : ( */}
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
                                <TouchableOpacity
                                  onPress={() => {
                                    if (this.state.closedSorted == true) {
                                      this.state.completed.sort(
                                        (a: any, b: any) =>
                                          new Date(a.createdAt) -
                                          new Date(b.createdAt),
                                      );
                                      this.setState({closedSorted: false});
                                    } else {
                                      this.state.completed.sort(
                                        (a: any, b: any) =>
                                          new Date(b.createdAt) -
                                          new Date(a.createdAt),
                                      );
                                      this.setState({closedSorted: true});
                                    }
                                  }}
                                  style={styles.filterHeader}>
                                  <Icon
                                    color={colors.primary}
                                    size={wp(5)}
                                    name="filter"
                                    type="ionicon"
                                  />
                                  <Text style={styles.filterText}>Filter</Text>
                                </TouchableOpacity>
                              </View>
                              {this.state.isCompleted == true ? (
                                <View style={styles.listViewContent}>
                                  {this.state.completed
                                    .slice(0, 3)
                                    .map((d: Isor, i: number) => (
                                      <ListCard
                                        key={i}
                                        classify={d.sor_type}
                                        styles={
                                          this.state.completed.slice(0, 3)
                                            .length ==
                                          i + 1
                                            ? {borderBottomWidth: wp(0)}
                                            : null
                                        }
                                        user1={
                                          d.involved_persons.length == 0
                                            ? ''
                                            : d.involved_persons[0].img_url
                                        }
                                        user2={
                                          d.submit_to.length == 0
                                            ? ''
                                            : d.submit_to[0].img_url
                                        }
                                        observation={d.details}
                                        username={d.created_by}
                                        iconconf={classifySor.find(
                                          (e: any) => e.title == d.sor_type,
                                        )}
                                        onPress={() => {
                                          this.props.navigation.navigate(
                                            'ViewSOR',
                                            {
                                              data: d,
                                            },
                                          );
                                        }}
                                        date={d.occured_at}
                                      />
                                    ))}
                                  {this.state.completed.length > 5 && (
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
                    this.state.completed.length == 0 &&
                    this.state.submitted.length == 0 ? (
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
                              data: this.state.inprogress,
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
                            type={'all'}
                            data={d}
                            name={d.created_by}
                            onPress={(d: Isor) =>
                              this.props.navigation.navigate('ViewSOR', {
                                data: d,
                              })
                            }
                            date={d.occured_at}
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
                          />
                        ))}
                      {this.state.submitted.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.reduxActions.clearAllSor();
                            this.props.navigation.navigate('ViewAll', {
                              data: this.state.submitted,
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
                          />
                        ))}
                      {this.state.exclated.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.reduxActions.clearAllSor();
                            this.props.navigation.navigate('ViewAll', {
                              data: this.state.exclated,
                              title: 'Exclated',
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
                    {/* {this.state.completed.length == 0 ? null : ( */}
                    <View style={styles.boardContainer}>
                      <View style={styles.draftTextContainer}>
                        <Text style={styles.draftText}>Closed</Text>
                      </View>
                      {this.state.completed
                        .slice(0, 3)
                        .map((d: Isor, i: number) => (
                          <Card
                            key={i}
                            type={'all'}
                            data={d}
                            name={d.created_by}
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
                          />
                        ))}
                      {this.state.completed.length > 3 && (
                        <TouchableOpacity
                          onPress={() => {
                            // this.props.reduxActions.clearAllSor();
                            this.props.navigation.navigate('ViewAll', {
                              data: this.state.completed,
                              title: 'Completed',
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
