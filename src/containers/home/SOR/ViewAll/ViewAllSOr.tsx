import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import {
  allDraft,
  allRecentActivity,
  allSubmitted,
  allNotified,
  draft,
  Create_sor,
} from '@service';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts} from '@theme';
import {initialList} from '@store';
import {RootState} from '../../../../store/store';
import {InitialAppStateDTO, ListStateDTO} from '@dtos';
import {connect} from 'react-redux';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
// import * as initialApp from '@store';
// import { Create_sor, viewas, notified, submitted, draft, profileSetupSelections } from '@service';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {classifySor} from '@utils';
import {Card, ListCard} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createApi} from '@service';
import {Storage} from 'aws-amplify';
import jwtDecode from 'jwt-decode';
import {Isor, classifySorBtn} from '@typings';
// import {  } from "";
type ViewAllSOrNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ViewAll'
>;
type ViewAllSOrRouteProp = RouteProp<StackNavigatorProps, 'ViewAll'>;

export interface ViewAllProps {
  route: ViewAllSOrRouteProp;
  navigation: ViewAllSOrNavigationProp;
  reduxActions: any;
  reduxState: RootState;
  initial: ListStateDTO;
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
    };
  }

  componentDidMount = async () => {
    // aws s3 storage
    // Storage.get('Screen Shot 2021-02-25 at 1.40.56 AM.png').then((res) => {
    //   console.log(res);
    // });

    const session: any = await Auth.currentSession();

    const tempUser = await Auth.currentAuthenticatedUser(); // returns a promise if user then object else error
    if ((await session) && tempUser.attributes) {
      await this.setState({isAuthenticated: true});
    }
    if (await !tempUser.attributes) {
      if (await session.idToken) {
        const token = await session.idToken.jwtToken;
        const decoded: any = await jwtDecode(token);
        tempUser.attributes = await {email: decoded.email};
      }
    }

    console.log(tempUser);

    createApi
      .createApi()
      .filterSors({
        project: '6038cf8472762b29b1bed1f3',
        limit: 10,
        page: 0,
        query: {status: [1, 2, 3, 4, 5]},
      })
      .then((res: any) => {
        AsyncStorage.setItem(
          'involved_persons',
          JSON.stringify(res.data.data.involved_persons),
        ).then(() => {
          for (let i = 0; i < res.data.data.report.length; i++) {
            if (res.data.data.report[i].status == 1) {
              this.state.draft.push(res.data.data.report[i]);
            } else if (res.data.data.report[i].status == 2) {
              this.state.submitted.push(res.data.data.report[i]);
            } else if (res.data.data.report[i].status == 3) {
              this.state.exclated.push(res.data.data.report[i]);
            } else if (res.data.data.report[i].status == 4) {
              this.state.inprogress.push(res.data.data.report[i]);
            } else if (res.data.data.report[i].status == 5) {
              this.state.completed.push(res.data.data.report[i]);
            }
          }
        });

        console.log(res.data.data.report);
        this.setState({draft: res.data.data.report});
      });
    // initialList.initialList();
    // this.props.initialList.addList('602e54a3fbfaf078abab8466');
    // console.log(RootState);
    // console.log(this.props.initial);
    // initialList.addList('602e54a3fbfaf078abab8466');
  };

  dropdownAnimated = (d: string) => {
    // Animated.timing(this.state.AnimatedDown, {
    //   toValue: wp(20),
    //   duration: 1500,
    //   easing: Easing.elastic(3),
    //   useNativeDriver: false,
    // }).start();
    // Animated.timing(this.state.AnimatedOpac, {
    //   toValue: 1,
    //   duration: 1500,
    //   easing: Easing.elastic(3),
    //   useNativeDriver: false,
    // }).start();
  };
  closeDropDown = (d: string) => {
    // Animated.timing(d, {
    //   toValue: wp(0),
    //   duration: 1500,
    //   easing: Easing.elastic(3),
    //   useNativeDriver: false,
    // }).start();
    // Animated.timing(this.state.AnimatedOpac, {
    //   toValue: 0,
    //   duration: 1500,
    //   easing: Easing.elastic(3),
    //   useNativeDriver: false,
    // }).start();
  };

  render() {
    // console.log(this.props.initial.list);
    // console.log();
    return (
      <View style={{backgroundColor: colors.primary}}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({project: 'Board View', selectP: false})
                      }>
                      <Text style={styles.itemH}>Board View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({project: 'List View', selectP: false})
                      }>
                      <Text style={styles.itemH}>List View</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <View style={styles.content}>
            {this.state.project == 'List View' ? (
              <View>
                <ScrollView
                  style={{
                    marginTop: wp(5),
                    paddingTop: wp(3),
                  }}
                  showsVerticalScrollIndicator={false}>
                  {/* when you have 0 reports */}
                  {this.state.draft.length == 0 ||
                  this.state.inprogress.length == 0 ||
                  this.state.exclated.length == 0 ||
                  this.state.completed.length == 0 ||
                  this.state.submitted == 0 ? (
                    <View style={styles.nonReport}>
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
                  ) : null}

                  {/* List View */}
                  {this.state.draft.length == 0 ? null : (
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
                              this.closeDropDown(this.state.isDraft);
                            } else {
                              this.setState({isDraft: true});
                              this.dropdownAnimated(this.state.isDraft);
                            }
                          }}
                          style={{flexDirection: 'row'}}>
                          <Icon
                            size={wp(3.5)}
                            name={this.state.isDraft == true ? 'down' : 'up'}
                            type="antdesign"
                          />
                          <Text style={styles.listDraftText}>Drafts</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            position: 'absolute',
                            right: wp(4),
                            flexDirection: 'row',
                          }}>
                          <Icon
                            containerStyle={{marginTop: wp(-0.6)}}
                            size={wp(5)}
                            name="filter"
                            type="ionicon"
                          />
                          <Text
                            style={{
                              paddingLeft: wp(1),
                              fontSize: wp(3),
                              fontFamily: 'SFuiDisplayBold',
                            }}>
                            Filter
                          </Text>
                        </View>
                      </View>

                      {this.state.isDraft == true ? (
                        <View style={[styles.listViewContent]}>
                          {this.state.draft
                            .slice(0, 5)
                            .map((d: Isor, i: number) => (
                              <ListCard
                                classify={d.sor_type}
                                styles={
                                  this.state.draft.slice(0, 5).length == i + 1
                                    ? {borderBottomWidth: wp(0)}
                                    : null
                                }
                                user1={d.user1}
                                user2={d.user2}
                                observation={d.details}
                                username={d.created_by}
                                iconconf={classifySor.find(
                                  (e: any) => e.title == d.sor_type.toString(),
                                )}
                                onPress={
                                  () =>
                                    this.props.navigation.navigate('ViewSOR', {
                                      data: d,
                                    })
                                  // this.props.navigation.navigate('home')
                                }
                                date={d.occured_at}
                              />
                            ))}
                          {this.state.draft.length > 5 && (
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate('ViewAll', {
                                  data: this.state.draft,
                                  title: 'Draft',
                                })
                              }
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
                  )}
                  {this.state.inprogress.length == 0 ? null : (
                    <View>
                      <View style={styles.lineheight}></View>
                      <View style={styles.inProgressTop}>
                        <View style={styles.listHeader}>
                          <TouchableOpacity
                            onPress={() => {
                              this.dropdownAnimated(this.state.isInProgress);
                              this.setState({
                                isInProgress: !this.state.isInProgress,
                              });
                            }}
                            style={{flexDirection: 'row'}}>
                            <Icon
                              size={wp(3.5)}
                              name={
                                this.state.isInProgress == true ? 'down' : 'up'
                              }
                              type="antdesign"
                            />
                            <Text style={styles.listDraftText}>
                              In Progress
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.filterHeader}>
                            <Icon size={wp(5)} name="filter" type="ionicon" />
                            <Text style={styles.filterText}>Filter</Text>
                          </View>
                        </View>
                        {this.state.isInProgress == true ? (
                          <View style={styles.listViewContent}>
                            {this.state.inprogress
                              .slice(0, 5)
                              .map((d: Isor, i: number) => (
                                <ListCard
                                  classify={d.sor_type}
                                  styles={
                                    this.state.inprogress.slice(0, 5).length ==
                                    i + 1
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
                                    this.props.navigation.navigate('ViewSOR', {
                                      data: d,
                                    })
                                  }
                                  date={d.occured_at}
                                />
                              ))}
                            {this.state.inprogress.length > 5 && (
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate('ViewAll', {
                                    data: this.state.inprogress,
                                    title: 'In Progress',
                                  })
                                }
                                style={{marginLeft: wp(4), marginTop: wp(3)}}>
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
                  )}
                  {this.state.exclated.length == 0 ? null : (
                    <View>
                      <View style={styles.lineheight}></View>
                      <View style={styles.inProgressTop}>
                        <View style={styles.listHeader}>
                          <TouchableOpacity
                            onPress={() => {
                              this.dropdownAnimated(this.state.isExclated);
                              this.setState({
                                isExclated: !this.state.isExclated,
                              });
                            }}
                            style={{flexDirection: 'row'}}>
                            <Icon
                              size={wp(3.5)}
                              name={
                                this.state.isNotified == true ? 'down' : 'up'
                              }
                              type="antdesign"
                            />
                            <Text style={styles.listDraftText}>Exclated</Text>
                          </TouchableOpacity>
                          <View style={styles.filterHeader}>
                            <Icon size={wp(5)} name="filter" type="ionicon" />
                            <Text style={styles.filterText}>Filter</Text>
                          </View>
                        </View>
                        {this.state.isExclated == true ? (
                          <View style={styles.listViewContent}>
                            {this.state.exclated
                              .slice(0, 5)
                              .map((d: Isor, i: number) => (
                                <ListCard
                                  classify={d.sor_type}
                                  styles={
                                    this.state.exclated.length == i + 1
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
                                    this.props.navigation.navigate('ViewSOR', {
                                      data: d,
                                    })
                                  }
                                  date={d.occured_at}
                                />
                              ))}
                            {this.state.exclated.length > 5 && (
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate('ViewAll', {
                                    data: this.state.notified,
                                    title: 'In Progress',
                                  })
                                }
                                style={{marginLeft: wp(4), marginTop: wp(3)}}>
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
                  )}

                  {this.state.completed.length == 0 ? null : (
                    <View>
                      <View style={styles.lineheight}></View>
                      <View style={styles.inProgressTop}>
                        <View style={styles.listHeader}>
                          <TouchableOpacity
                            onPress={() => {
                              this.dropdownAnimated(this.state.isCompleted);
                              this.setState({
                                isCompleted: !this.state.isCompleted,
                              });
                            }}
                            style={{flexDirection: 'row'}}>
                            <Icon
                              size={wp(3.5)}
                              name={
                                this.state.isCompleted == true ? 'down' : 'up'
                              }
                              type="antdesign"
                            />
                            <Text style={styles.listDraftText}>Completed</Text>
                          </TouchableOpacity>
                          <View style={styles.filterHeader}>
                            <Icon size={wp(5)} name="filter" type="ionicon" />
                            <Text style={styles.filterText}>Filter</Text>
                          </View>
                        </View>
                        {this.state.isCompleted == true ? (
                          <View style={styles.listViewContent}>
                            {this.state.completed
                              .slice(0, 5)
                              .map((d: Isor, i: number) => (
                                <ListCard
                                  classify={d.sor_type}
                                  styles={
                                    this.state.completed.slice(0, 5).length ==
                                    i + 1
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
                                    this.props.navigation.navigate('ViewSOR', {
                                      data: d,
                                    })
                                  }
                                  date={d.occured_at}
                                />
                              ))}
                            {this.state.completed.length > 5 && (
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate('ViewAll', {
                                    data: this.state.completed,
                                    title: 'Completed',
                                  })
                                }
                                style={{marginLeft: wp(4), marginTop: wp(3)}}>
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
                  )}
                  {this.state.submitted.length == 0 ? null : (
                    <View>
                      <View style={styles.lineheight}></View>
                      <View
                        style={[
                          {
                            paddingBottom: this.state.bottomWidth,
                          },
                          styles.closedTop,
                        ]}>
                        <View style={styles.listHeader}>
                          <TouchableOpacity
                            onPress={() => {
                              this.dropdownAnimated(this.state.isSubmited);
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
                                this.state.isSubmited == true ? 'down' : 'up'
                              }
                              type="antdesign"
                            />
                            <Text style={styles.listDraftText}>Submitted</Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              position: 'absolute',
                              right: wp(4),
                              flexDirection: 'row',
                              marginTop: wp(-1),
                            }}>
                            <Icon size={wp(5)} name="filter" type="ionicon" />

                            <Text
                              style={{
                                paddingLeft: wp(1),
                                fontSize: wp(3),
                                marginTop: wp(0.6),
                                // fontWeight: 'bold',
                                fontFamily: 'SFuiDisplayBold',
                              }}>
                              Filter
                            </Text>
                          </View>
                        </View>
                        {this.state.isSubmited == true ? (
                          <View style={styles.listViewContent}>
                            {this.state.submitted
                              .slice(0, 5)
                              .map((d: Isor, i: number) => (
                                <ListCard
                                  classify={d.sor_type}
                                  styles={
                                    this.state.submitted.slice(0, 5).length ==
                                    i + 1
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
                                    this.props.navigation.navigate('ViewSOR', {
                                      data: d,
                                    })
                                  }
                                  date={d.occured_at}
                                />
                              ))}
                            {this.state.submitted.length > 5 && (
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate('ViewAll', {
                                    data: this.state.submitted,
                                    title: 'Closed',
                                  })
                                }
                                style={{marginLeft: wp(4), marginTop: wp(3)}}>
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
                  )}
                </ScrollView>
              </View>
            ) : (
              <ScrollView
                style={{
                  marginTop: wp(15),
                  height: Dimensions.get('screen').height,
                }}
                showsHorizontalScrollIndicator={false}
                snapToInterval={wp(83)}
                decelerationRate="fast"
                horizontal={true}>
                {/* when you have 0 reports */}
                {this.state.draft.length == 0 ||
                this.state.inprogress.length == 0 ||
                this.state.exclated.length == 0 ||
                this.state.completed.length == 0 ||
                this.state.submitted == 0 ? (
                  <View style={[styles.nonReport, {padding: wp(25)}]}>
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
                ) : null}
                {this.state.draft.length == 0 ? null : (
                  <View>
                    <View style={styles.draftTextContainer}>
                      <Text style={styles.draftText}>Draft</Text>
                      <Icon
                        size={22}
                        name="filter"
                        type="ionicon"
                        color={colors.primary}
                      />
                    </View>
                    {this.state.draft.map((d: Isor, i: number) => (
                      <Card
                        data={d}
                        onPress={(d: Isor) =>
                          this.props.navigation.navigate('ViewSOR', {data: d})
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
                        style={[
                          styles.draftCardContainer,
                          {marginBottom: wp(10)},
                        ]}
                        user1={d.user1}
                        user2={d.user2}
                      />
                    ))}
                  </View>
                )}
                {this.state.inprogress.length == 0 ? null : (
                  <View>
                    <View style={styles.draftTextContainer}>
                      <Text style={styles.draftText}>In Progress</Text>
                      <Icon
                        size={22}
                        name="filter"
                        type="ionicon"
                        color={colors.primary}
                      />
                    </View>
                    {this.state.inprogress.map((d: Isor, i: number) => (
                      <Card
                        data={d}
                        onPress={(d: Isor) =>
                          this.props.navigation.navigate('ViewSOR', {data: d})
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
                        style={[
                          styles.draftCardContainer,
                          {marginBottom: wp(10)},
                        ]}
                        user1={d.user1}
                        user2={d.user2}
                      />
                    ))}
                  </View>
                )}
                {this.state.exclated.length == 0 ? null : (
                  <View>
                    <View style={styles.draftTextContainer}>
                      <Text style={styles.draftText}>In Progress</Text>
                      <Icon
                        size={22}
                        name="filter"
                        type="ionicon"
                        color={colors.primary}
                      />
                    </View>
                    {this.state.exclated.map((d: Isor, i: number) => (
                      <Card
                        data={d}
                        onPress={(d: Isor) =>
                          this.props.navigation.navigate('ViewSOR', {data: d})
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
                        style={[
                          styles.draftCardContainer,
                          {marginBottom: wp(10)},
                        ]}
                        user1={d.user1}
                        user2={d.user2}
                      />
                    ))}
                  </View>
                )}
                {this.state.completed.length == 0 ? null : (
                  <View>
                    <View style={styles.draftTextContainer}>
                      <Text style={styles.draftText}>In Progress</Text>
                      <Icon
                        size={22}
                        name="filter"
                        type="ionicon"
                        color={colors.primary}
                      />
                    </View>
                    {this.state.completed.map((d: Isor, i: number) => (
                      <Card
                        data={d}
                        onPress={(d: Isor) =>
                          this.props.navigation.navigate('ViewSOR', {data: d})
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
                        style={[
                          styles.draftCardContainer,
                          {marginBottom: wp(10)},
                        ]}
                        user1={d.user1}
                        user2={d.user2}
                      />
                    ))}
                  </View>
                )}
                {this.state.submitted.length == 0 ? null : (
                  <View>
                    <View style={styles.submitTextContaienr}>
                      <Text style={styles.submitText}>Closed</Text>
                      <Icon
                        size={22}
                        name="filter"
                        type="ionicon"
                        color={colors.primary}
                      />
                    </View>
                    {this.state.submitted.map((d: Isor, i: number) => (
                      <Card
                        data={d}
                        onPress={(d: Isor) =>
                          this.props.navigation.navigate('ViewSOR', {data: d})
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
                        style={[
                          styles.submitCardContainer,
                          {marginBottom: wp(10)},
                        ]}
                      />
                    ))}
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  initial: state.list,
});

const mapDispatchToProps = (dispatch: unknown) => {
  return {
    initialList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllSOr);
