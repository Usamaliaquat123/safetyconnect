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
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts, animation, images, GlStyles} from '@theme';
import {AllSorDTO} from '@dtos';
import {connect} from 'react-redux';
import styles from './styles';
import {bindActionCreators} from 'redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Tags} from '@components';
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
      obsType: ['Lsr', 'Concern', 'Positive', 'Near miss'],
      selectedObsType: '',

      selectedObserver: '',
      status: ['Draft', 'In Progress', 'Esclated', 'Pending Closure', 'Closed'],
      selectedStatus: '',
      locations: [],
      submittedSelected: '',

      selectedLocations: '',
      risk: ['Low ', 'Medium', 'High'],
      // Selectors
      isRiskSelector: false,
      isSubmittedToSelected: false,
      isStatusSelected: false,
      isObservationSelected: false,
      isObserverSelected: false,
    };
  }

  componentDidMount = () => {};

  //   get All users
  getAllUsers = () => {};

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
                <Text style={styles.selectedContent}>Select Type </Text>
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
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </TouchableOpacity>
              {this.state.isObserverSelected && (
                <View style={styles.dataContainer}>
                  {this.state.obsType.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          isObserverSelected: false,
                          selectedObserver: d,
                        })
                      }>
                      <Text style={styles.datacontainerText}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {/* Status selection container */}
            <View style={styles.status}>
              <Text style={styles.htitle}>Status</Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isStatusSelected: !this.state.isStatusSelected,
                  })
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
              {this.state.isStatusSelected && (
                <View style={styles.dataContainer}>
                  {this.state.status.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectedStatus: d,
                          isStatusSelected: false,
                        });
                      }}>
                      <Text style={styles.datacontainerText}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
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
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </TouchableOpacity>

              {this.state.isSubmittedToSelected && (
                <View style={styles.dataContainer}>
                  {this.state.obsType.map((d: any, i: number) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          isSubmittedToSelected: false,
                          submittedSelected: false,
                        });
                      }}>
                      <Text style={styles.datacontainerText}>{d}</Text>
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
                    <TouchableOpacity onPress={() => console.log(d)}>
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
                <View style={[styles.selectionContainer, {width: wp(45)}]}>
                  <Text style={styles.selectedContent}>From</Text>
                </View>
              </View>
              <View style={styles.toDate}>
                <View style={[styles.selectionContainer, {width: wp(45)}]}>
                  <Text style={styles.selectedContent}>to</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: wp(3),
              }}>
              <Tags onClose={(e) => console.log(e)} tags={[{name: 'Today'}]} />
              <Tags
                onClose={(e) => console.log(e)}
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
              <View style={styles.applybtnContainer}>
                <Text style={styles.applyfilterText}>Apply Filters</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: AllSorDTO) => ({});

const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
