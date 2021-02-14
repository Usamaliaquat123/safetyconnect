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
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {connect} from 'react-redux';
import styles from './styles';
import {Create_sor, viewas, notified, submitted, draft} from '@service';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {classifySor} from '@utils';
import {Card, ListCard} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Isor, classifySorBtn} from '@typings';

type ViewAllNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ViewAll'
>;
type ViewAllRouteProp = RouteProp<StackNavigatorProps, 'ViewAll'>;

export interface ViewAllProps {
  route: ViewAllRouteProp;
  navigation: ViewAllNavigationProp;
  reduxActions: any;
  reduxState: any;
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
class ViewAll extends React.Component<ViewAllProps, any> {
  constructor(props: any) {
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
      isNotified: false,
      isDraft: true,
      isSubmited: false,
      selectP: true,
      draft: draft,
      notified: notified,
      submitted: submitted,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      bottomWidth: wp(100),
    };
  }

  componentDidMount = () => {};

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
              {/* <View style={styles.leftSelector}>
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
              </View> */}
            </View>
          </View>
          <View style={styles.content}>
            {this.state.project == 'List View' ? (
              <View>
                <ScrollView
                  style={{
                    marginTop: wp(15),
                    padding: wp(3),
                  }}
                  showsVerticalScrollIndicator={false}>
                  <View style={{paddingBottom: wp(9)}}>
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
                          marginTop: wp(-1),
                        }}>
                        <Icon size={wp(5)} name="filter" type="ionicon" />
                        <Text
                          style={{
                            paddingLeft: wp(1),
                            fontSize: wp(3.5),
                            marginTop: wp(0.6),
                            fontWeight: 'bold',
                          }}>
                          Filter
                        </Text>
                      </View>
                    </View>
                    {this.state.isDraft == true ? (
                      <View style={styles.listViewContent}>
                        {this.state.draft.map((d: Isor, i: number) => (
                          <ListCard
                            classify={d.classify}
                            styles={
                              this.state.draft.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null
                            }
                            user1={d.user1}
                            user2={d.user2}
                            observation={d.observation}
                            username={d.username}
                            iconconf={classifySor.find(
                              (e: any) => e.title == d.classify,
                            )}
                            onPress={
                              () =>
                                this.props.navigation.navigate('ViewSOR', {
                                  data: d,
                                })
                              // this.props.navigation.navigate('home')
                            }
                            date={d.date}
                          />
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <View style={{paddingBottom: wp(10)}}>
                    <View style={styles.listHeader}>
                      <TouchableOpacity
                        onPress={() => {
                          this.dropdownAnimated(this.state.isNotified);
                          this.setState({isNotified: !this.state.isNotified});
                        }}
                        style={{flexDirection: 'row'}}>
                        <Icon
                          size={wp(3.5)}
                          name={this.state.isNotified == true ? 'down' : 'up'}
                          type="antdesign"
                        />
                        <Text style={styles.listDraftText}>Notified</Text>
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
                            fontSize: wp(3.5),
                            marginTop: wp(0.6),
                            fontWeight: 'bold',
                          }}>
                          Filter
                        </Text>
                      </View>
                    </View>
                    {this.state.isNotified == true ? (
                      <View style={styles.listViewContent}>
                        {this.state.notified.map((d: Isor, i: number) => (
                          <ListCard
                            classify={d.classify}
                            styles={
                              this.state.draft.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null
                            }
                            user1={d.user1}
                            user2={d.user2}
                            observation={d.observation}
                            username={d.username}
                            iconconf={classifySor.find(
                              (e: any) => e.title == d.classify,
                            )}
                            onPress={
                              () =>
                                this.props.navigation.navigate('ViewSOR', {
                                  data: d,
                                })
                              // this.props.navigation.navigate('home')
                            }
                            date={d.date}
                          />
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <View style={{paddingBottom: this.state.bottomWidth}}>
                    <View style={styles.listHeader}>
                      <TouchableOpacity
                        onPress={() => {
                          this.dropdownAnimated(this.state.isSubmited);
                          this.setState({isSubmited: !this.state.isSubmited});
                          if (!this.state.isSubmited) {
                            this.setState({bottomWidth: wp(40)});
                          } else {
                            this.setState({bottomWidth: wp(100)});
                          }
                        }}
                        style={{flexDirection: 'row'}}>
                        <Icon
                          size={wp(3.5)}
                          name={this.state.isSubmited == true ? 'down' : 'up'}
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
                            fontSize: wp(3.5),
                            marginTop: wp(0.6),
                            fontWeight: 'bold',
                          }}>
                          Filter
                        </Text>
                      </View>
                    </View>
                    {this.state.isSubmited == true ? (
                      <View style={styles.listViewContent}>
                        {this.state.submitted.map((d: Isor, i: number) => (
                          <ListCard
                            classify={d.classify}
                            styles={
                              this.state.draft.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null
                            }
                            user1={d.user1}
                            user2={d.user2}
                            observation={d.observation}
                            username={d.username}
                            iconconf={classifySor.find(
                              (e: any) => e.title == d.classify,
                            )}
                            onPress={
                              () =>
                                this.props.navigation.navigate('ViewSOR', {
                                  data: d,
                                })
                              // this.props.navigation.navigate('View')
                            }
                            date={d.date}
                          />
                        ))}
                      </View>
                    ) : null}
                  </View>
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
                horizontal>
                <View style={{paddingBottom: wp(10)}}>
                  <View style={styles.notifiedTextContaienr}>
                    <Text style={styles.notifiedText}>Notified</Text>
                    <Icon
                      size={22}
                      name="filter"
                      type="ionicon"
                      color={colors.primary}
                    />
                  </View>
                  {this.state.notified.map((d: Isor, i: number) => (
                    <Card
                      data={d}
                      onPress={(d: Isor) =>
                        this.props.navigation.navigate('ViewSOR', {data: d})
                      }
                      date={d.date}
                      risk={d.risk}
                      observation={d.observation}
                      classify={d.classify}
                      iconConf={classifySor.find(
                        (e: any) => e.title == d.classify,
                      )}
                      viewPortWidth={80}
                      location={d.location}
                      user1={d.user1}
                      user2={d.user2}
                      style={[styles.cardConatiner, {marginBottom: wp(10)}]}
                    />
                  ))}
                </View>
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
                      date={d.date}
                      risk={d.risk}
                      viewPortWidth={80}
                      observation={d.observation}
                      classify={d.classify}
                      iconConf={classifySor.find(
                        (e: any) => e.title == d.classify,
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
                <View>
                  <View style={styles.submitTextContaienr}>
                    <Text style={styles.submitText}>Submitted</Text>
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
                      date={d.date}
                      risk={d.risk}
                      viewPortWidth={80}
                      user1={d.user1}
                      user2={d.user2}
                      observation={d.observation}
                      classify={d.classify}
                      iconConf={classifySor.find(
                        (e: any) => e.title == d.classify,
                      )}
                      location={d.location}
                      style={[
                        styles.submitCardContainer,
                        {marginBottom: wp(10)},
                      ]}
                    />
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: unknown) => {
  return {};
};

const mapDispatchToProps = (dispatch: unknown) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);
