import React, {useState, useEffect} from 'react';
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
import {getCurrentProject, capitalizeFirstLetter} from '@utils';
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

const Filters = (props: FiltersProps) => {
  const [FiltersProps, setFiltersProps] = useState([
    'lsr',
    'concern',
    'positive',
    'near miss',
  ]);
  const [selectedObsType, setselectedObsType] = useState('');
  const [selectedObserver, setselectedObserver] = useState('');
  const [status, setstatus] = useState([
    'Draft',
    'In Progress',
    'Esclated',
    'Pending Closure',
    'Closed',
  ]);
  const [selectedStatus, setselectedStatus] = useState('');
  const [locations, setlocations] = useState([]);
  const [submittedSelected, setsubmittedSelected] = useState('');
  const [risk, setrisk] = useState(['low', 'medium', 'high']);
  const [allUsers, setallUsers] = useState([]);
  const [marked, setmarked] = useState({
    [moment().format('YYYY-MM-DD')]: {marked: true, color: 'green'},
  });
  const [selectedLocations, setselectedLocations] = useState('');
  const [isRiskSelector, setisRiskSelector] = useState(false);
  const [isSubmittedToSelected, setisSubmittedToSelected] = useState(false);
  const [isStatusSelected, setisStatusSelected] = useState(false);
  const [selectedDayFrom, setselectedDayFrom] = useState('');
  const [selectedDayTo, setselectedDayTo] = useState('');
  const [isObservationSelected, setisObservationSelected] = useState(false);
  const [isObserverSelected, setisObserverSelected] = useState(false);
  const [setDateModal, setsetDateModal] = useState(false);
  const [datePickerOfFromOrTo, setdatePickerOfFromOrTo] = useState('');
  const [todayDateCallender, settodayDateCallender] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [filterObject, setfilterObject] = useState({});
  const [riskSelected, setriskSelected] = useState('');
  const [currMonth, setcurrMonth] = useState('');

  //   get All userst
  const getAllUsers = () => {
    // AsyncStorage.setItem(
    //   'involved_person',
    //   JSON.stringify(this.state.involvedPerson),
    // );
    AsyncStorage.getItem('involved_person').then((users: any) => {
      setallUsers(JSON.parse(users));
    });
  };

  // submiti filters
  const submitFilters = (filterObject: any) => {
    if (filterObject['ranges'].length == 1) {
      filterObject['ranges'].push(`${moment().format('YYYY-MM-DD')}`);
    }
    AsyncStorage.setItem('filters', JSON.stringify(filterObject));
    props.navigation.navigate('Main');
  };
  useEffect(() => {
    getAllUsers();
    filterObject['ranges'] = [];
  }, []);

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
              onPress={() => {
                setisObservationSelected(!isObservationSelected);
              }}
              style={styles.selectionContainer}>
              <Text style={styles.selectedContent}>
                {selectedObsType !== '' ? selectedObsType : 'Select Type'}
              </Text>
              <Icon
                name={'down'}
                type={'antdesign'}
                size={wp(3)}
                color={colors.text}
              />
            </TouchableOpacity>
            {isObservationSelected && (
              <View style={styles.dataContainer}>
                {obsType.map((d: any, i: number) => (
                  <TouchableOpacity
                    onPress={() => {
                      setselectedObsType(d);
                      setisObservationSelected(false);

                      filterObject['sor_type'] = [d];
                    }}>
                    <Text style={styles.datacontainerText}>
                      {capitalizeFirstLetter(d)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {/* created by selection container */}
          <View style={styles.initiator}>
            <Text style={styles.htitle}>Observer</Text>
            <TouchableOpacity
              onPress={() => setisObserverSelected(!isObserverSelected)}
              style={styles.selectionContainer}>
              <Text style={styles.selectedContent}>
                {' '}
                {selectedObserver !== ''
                  ? selectedObserver.name
                  : 'Select Type'}{' '}
              </Text>
              <Icon
                name={'down'}
                type={'antdesign'}
                size={wp(3)}
                color={colors.text}
              />
            </TouchableOpacity>
            {isObserverSelected && (
              <View style={styles.dataContainer}>
                {allUsers.map((d: any, i: number) => (
                  <TouchableOpacity
                    onPress={() => {
                      setisObserverSelected(false);
                      setselectedObserver(d);
                      // this.setState({
                      //   isObserverSelected: false,
                      //   selectedObserver: d,
                      // });
                      filterObject['created_by'] = [d.email];
                    }}>
                    <Text style={styles.datacontainerText}>{d.name}</Text>
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
              onPress={() => setisSubmittedToSelected(!isSubmittedToSelected)}
              style={styles.selectionContainer}>
              <Text style={styles.selectedContent}>
                {' '}
                {submittedSelected !== ''
                  ? submittedSelected.name
                  : 'Select Type'}{' '}
              </Text>
              <Icon
                name={'down'}
                type={'antdesign'}
                size={wp(3)}
                color={colors.text}
              />
            </TouchableOpacity>

            {isSubmittedToSelected && (
              <View style={styles.dataContainer}>
                {allUsers.map((d: any, i: number) => (
                  <TouchableOpacity
                    onPress={() => {
                      setisSubmittedToSelected(false);
                      setsubmittedSelected(d);
                      filterObject['submit_to'] = [d.email];
                    }}>
                    <Text style={styles.datacontainerText}>{d.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {/* Risk sekection container */}
          <View style={styles.risk}>
            <Text style={styles.htitle}>Risk</Text>
            <TouchableOpacity
              onPress={() => setisRiskSelector(!isRiskSelector)}
              style={styles.selectionContainer}>
              <Text style={styles.selectedContent}>
                {' '}
                {riskSelected !== '' ? riskSelected : 'Select Type'}{' '}
              </Text>
              <Icon
                name={'down'}
                type={'antdesign'}
                size={wp(3)}
                color={colors.text}
              />
            </TouchableOpacity>
            {isRiskSelector && (
              <View style={styles.dataContainer}>
                {risk.map((d: any, i: number) => (
                  <TouchableOpacity
                    onPress={() => {
                      setisRiskSelector(false);
                      setriskSelected(d);
                      filterObject['risk'] = [d];
                    }}>
                    <Text style={styles.datacontainerText}>
                      {capitalizeFirstLetter(d)}
                    </Text>
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
                onPress={() => {
                  setdatePickerOfFromOrTo('from');
                  setsetDateModal(true);
                }}
                style={[styles.selectionContainer, {width: wp(45)}]}>
                <Text style={styles.selectedContent}>
                  {selectedDayFrom === '' ? 'From' : selectedDayFrom}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.toDate}>
              <TouchableOpacity
                onPress={() => {
                  setdatePickerOfFromOrTo('to');
                  setsetDateModal(true);
                }}
                style={[styles.selectionContainer, {width: wp(45)}]}>
                <Text style={styles.selectedContent}>
                  {selectedDayTo === '' ? 'to' : selectedDayTo}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 
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
          </View> */}

          {/* close and apply */}

          <View style={styles.btnsContainer}>
            {/* Close button */}
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.closebtnContainer}>
              <Text style={styles.closeFilterText}>Close</Text>
            </TouchableOpacity>
            {/* Apply button */}
            <TouchableOpacity
              onPress={() => submitFilters(filterObject)}
              style={styles.applybtnContainer}>
              <Text style={styles.applyfilterText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setsubmittedSelected('');
              setselectedObserver('');
              setselectedObsType('');
              setfilterObject({});

              AsyncStorage.setItem('filters', JSON.stringify({}));
              props.navigation.navigate('Main');
            }}>
            <Text
              style={{
                marginTop: wp(5),
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
          isVisible={setDateModal}
          onBackdropPress={() => {
            setsetDateModal(false);
            setsetloading(false);
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
            <View style={{}}>
              <Text
                style={{
                  position: 'absolute',
                  top: wp(4),
                  // left: wp(1),
                  alignSelf: 'center',
                  // right: wp(1),
                  zIndex: 1000,
                  fontSize: wp(2.8),
                  // marginTop: wp(3),
                  opacity: 0.5,
                  fontFamily: fonts.SFuiDisplayBold,
                  // textAlign: 'center',
                }}>
                {currMonth}
              </Text>
            </View>
            <Icon
              onPress={() => setsetDateModal(false)}
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
                setmarked(data);
                setselectedDay(day.dateString);

                // this.state.filterObject['ranges'] = [];
                if (datePickerOfFromOrTo === 'from') {
                  filterObject['ranges'].push(
                    `${moment(day.dateString).format('YYYY-MM-DD')}`,
                  );

                  console.log(moment(day.dateString).format());

                  setselectedDayFrom(day.dateString);
                } else {
                  filterObject['ranges'].push(
                    `${moment(day.dateString).format('YYYY-MM-DD')}`,
                  );
                  setselectedDayTo(day.dateString);

                  // console.log(this.state.filterObject);
                }
                setsetDateModal(false);
                // this.setState({setDateModal: false});
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
              hideArrows={false}
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
              hideDayNames={false}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={(addMonth) => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={false}
              // Disable right arrow. Default = false
              disableArrowRight={false}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter.
              renderHeader={(date) => {
                /*Return JSX*/
                setcurrMonth(moment(date[0]).format('MMMM'));
              }}
              // Enable the option to swipe between months. Default = false
              enableSwipeMonths={true}
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: AllSorDTO) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
