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
import moment from 'moment';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts, animation, images, GlStyles} from '@theme';
import {AllSorDTO} from '@dtos';
import {connect} from 'react-redux';
import styles from './styles';
import {bindActionCreators} from 'redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {RouteProp} from '@react-navigation/native';
import {getCurrentProject} from '@utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Tags} from '@components';
import {createApi} from '@service';
type ViewAllSOrNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Filters'
>;
type ViewAllSOrRouteProp = RouteProp<StackNavigatorProps, 'Filters'>;
// Project Id
export interface FiltersProps {
  route: ViewAllSOrRouteProp;
  navigation: ViewAllSOrNavigationProp;
  reduxActions: any;
  reduxState: AllSorDTO;
  // initial: AllSorDTO;
  initialList: any;
}

export class Filters extends React.Component<FiltersProps, any> {
  constructor(props: FiltersProps) {
    super(props);
    this.state = {
      obsType: ['lsr', 'concern', 'positive', 'nearmiss'],
      selectedObsType: '',

      selectedObserver: '',
      status: ['Draft', 'In Progress', 'Esclated', 'Pending Closure', 'Closed'],
      selectedStatus: '',
      locations: [],
      submittedSelected: '',

      selectedLocations: '',
      risk: ['low ', 'medium', 'high'],
      // Selectors
      allUsers: [],
      marked: {
        [moment().format('YYYY-MM-DD')]: {marked: true, color: 'green'},
      },
      isRiskSelector: false,
      isSubmittedToSelected: false,
      isStatusSelected: false,
      isObservationSelected: false,
      isObserverSelected: false,
      setDateModal: true,

      todayDateCallender: moment().format('YYYY-MM-DD'),
      filterObject: {},
    };
  }

  componentDidMount = () => {
    this.getAllUsers();
  };
  // submiti filters
  submitFilters = (filterObject: any) => {
    AsyncStorage.setItem('filters', JSON.stringify(filterObject));
    this.props.navigation.navigate('Main');
  };

  //   get All userst
  getAllUsers = () => {
    // AsyncStorage.setItem(
    //   'involved_person',
    //   JSON.stringify(this.state.involvedPerson),
    // );
    AsyncStorage.getItem('involved_person').then((users: any) => {
      this.setState({allUsers: JSON.parse(users)});
    });
  };

  //   get All locations
  getAllLocations = () => {};
  render() {
    return (
      <View style={{backgroundColor: colors.secondary, flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Filters</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            {/* select the observation type */}
            <View style={styles.observationType}>
              <Text style={styles.htitle}>Observation Type</Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isObservationSelected: !this.state.isObservationSelected,
                  })
                }
                style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>
                  {this.state.selectedObsType !== ''
                    ? this.state.selectedObsType
                    : 'Select Type'}
                </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </TouchableOpacity>
              {this.state.isObservationSelected && (
                <View style={styles.dataContainer}>
                  {this.state.obsType.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectedObsType: d,
                          isObservationSelected: false,
                        });
                        this.state.filterObject['sor_type'] = [d];
                      }}>
                      <Text style={styles.datacontainerText}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {/* created by selection container */}
            <View style={styles.initiator}>
              <Text style={styles.htitle}>Observer</Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isObserverSelected: !this.state.isObserverSelected,
                  })
                }
                style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>
                  {' '}
                  {this.state.selectedObserver !== ''
                    ? this.state.selectedObserver.email
                    : 'Select Type'}{' '}
                </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </TouchableOpacity>
              {this.state.isObserverSelected && (
                <View style={styles.dataContainer}>
                  {this.state.allUsers.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          isObserverSelected: false,
                          selectedObserver: d,
                        });
                        this.state.filterObject['created_by'] = [d.email];
                      }}>
                      <Text style={styles.datacontainerText}>{d.email}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {/* Status selection container
            <View style={styles.status}>
              <Text style={styles.htitle}>Status</Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isStatusSelected: !this.state.isStatusSelected,
                  })
                }
                style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>
                  {' '}
                  {this.state.selectedStatus !== ''
                    ? this.state.selectedStatus
                    : 'Select Type'}{' '}
                </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </TouchableOpacity>
              {this.state.isStatusSelected && (
                <View style={styles.dataContainer}>
                  {this.state.status.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectedStatus: d,
                          isStatusSelected: false,
                        });
                        this.state.filterObject['created_by'] = [d.email];
                        
                      }}>
                      <Text style={styles.datacontainerText}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
           */}

            {/* submitted selection container */}
            <View style={styles.location}>
              <Text style={styles.htitle}>Submitted To</Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isSubmittedToSelected: !this.state.isSubmittedToSelected,
                  })
                }
                style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>
                  {' '}
                  {this.state.submittedSelected !== ''
                    ? this.state.submittedSelected.email
                    : 'Select Type'}{' '}
                </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </TouchableOpacity>

              {this.state.isSubmittedToSelected && (
                <View style={styles.dataContainer}>
                  {this.state.allUsers.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          isSubmittedToSelected: false,
                          submittedSelected: d,
                        });
                        this.state.filterObject['submit_to'] = [d.email];
                      }}>
                      <Text style={styles.datacontainerText}>{d.email}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {/* Risk sekection container */}
            <View style={styles.risk}>
              <Text style={styles.htitle}>Risk</Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({isRiskSelector: !this.state.isRiskSelector})
                }
                style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </TouchableOpacity>
              {this.state.isRiskSelector && (
                <View style={styles.dataContainer}>
                  {this.state.risk.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({isRiskSelector: false});
                        this.state.filterObject['risk'] = [d];
                      }}>
                      <Text style={styles.datacontainerText}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <Text style={[styles.htitle, {marginTop: wp(3)}]}> Date </Text>
            <View style={styles.dateContainer}>
              {/* Date  container  */}
              <View style={styles.fromDate}>
                <TouchableOpacity
                  onPress={() => console.log('from')}
                  style={[styles.selectionContainer, {width: wp(45)}]}>
                  <Text style={styles.selectedContent}>From</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.toDate}>
                <TouchableOpacity
                  onPress={() => console.log('to')}
                  style={[styles.selectionContainer, {width: wp(45)}]}>
                  <Text style={styles.selectedContent}>to</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: wp(3),
              }}>
              <Tags
                onClose={(e: any) => console.log(e)}
                tags={[{name: 'Today'}]}
              />
              <Tags
                onClose={(e: any) => console.log(e)}
                tags={[{name: 'this week'}]}
              />
              <Tags
                onClose={(e) => console.log(e)}
                tags={[{name: 'this month'}]}
              />
              <Tags
                onClose={(e) => console.log(e)}
                tags={[{name: 'this year'}]}
              />
            </View>

            {/* close and apply */}

            <View style={styles.btnsContainer}>
              {/* Close button */}
              <View style={styles.closebtnContainer}>
                <Text style={styles.closeFilterText}>Close</Text>
              </View>
              {/* Apply button */}
              <TouchableOpacity
                onPress={() => this.submitFilters(this.state.filterObject)}
                style={styles.applybtnContainer}>
                <Text style={styles.applyfilterText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  submittedSelected: '',
                  selectedObserver: '',
                  selectedObsType: '',
                  filterObject: {},
                });
                AsyncStorage.setItem('filters', JSON.stringify({}));
                this.props.navigation.navigate('Main');
              }}>
              <Text
                style={{
                  marginTop: wp(10),
                  textAlign: 'center',
                  fontFamily: fonts.SFuiDisplaySemiBold,
                  color: colors.primary,
                }}>
                Reset All filters{' '}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Callender */}

          <Modal
            animationInTiming={1000}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationOutTiming={1000}
            useNativeDriver={true}
            isVisible={this.state.setDateModal}
            onBackdropPress={() => {
              this.setState({setDateModal: false, loading: false});
            }}>
            <View
              style={{
                padding: wp(5),
                borderRadius: wp(3),
                backgroundColor: colors.secondary,
              }}>
              <Text
                style={{
                  fontSize: wp(3.5),
                  fontFamily: fonts.SFuiDisplayBold,
                  textAlign: 'center',
                }}>
                Select Your Date
              </Text>
              <Icon
                onPress={() => this.setState({setDateModal: false})}
                containerStyle={{
                  position: 'absolute',
                  right: wp(2),
                  top: wp(2),
                }}
                name={'cross'}
                type={'entypo'}
                size={wp(4)}
                color={colors.text}
              />
              <Calendar
                theme={{
                  textDayFontSize: wp(3),
                  textDayFontFamily: fonts.SFuiDisplayMedium,
                  dotColor: colors.primary,
                  // textSectionTitleColor: colors.primary,

                  selectedDayTextColor: colors.primary,
                }}
                onDayPress={(day) => {
                  let data = {
                    [day.dateString]: {marked: true, color: 'green'},
                  };
                  this.setState({
                    //   currentDate: day.dateString,
                    marked: data,
                    selectedDay: day.dateString,
                  });

                  var date = `${day.dateString}`;

                  this.setState({todayDateCallender: day.dateString});
                  this.setState({setDateModal: false});
                }}
                markedDates={this.state.marked}
                // markedDates={{}}
                markingType={'custom'}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {}}
                // Hide month navigation arrows. Default = false
                hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={(direction) => <Arrow />}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={true}
                // Show week numbers to the left. Default = false
                showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={(addMonth) => addMonth()}
                // Disable left arrow. Default = false
                disableArrowLeft={true}
                // Disable right arrow. Default = false
                disableArrowRight={true}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Replace default month and year title with custom one. the function receive a date as parameter.
                renderHeader={(date) => {
                  /*Return JSX*/
                }}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
              />
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: AllSorDTO) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
