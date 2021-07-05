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
      initiator: '',
      status: ['Draft', 'In Progress', 'Esclated', 'Pending Closure', 'Closed'],
      locations: [],
      risk: ['Low ', 'Medium', 'High'],
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
              <View style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </View>
              <View style={styles.dataContainer}>
                {this.state.obsType.map((d: any, i: number) => (
                  <TouchableOpacity onPress={() => console.log(d)}>
                    <Text style={styles.datacontainerText}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* created by selection container */}
            <View style={styles.initiator}>
              <Text style={styles.htitle}>Initiator</Text>
              <View style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </View>
              <View style={styles.dataContainer}>
                {this.state.obsType.map((d: any, i: number) => (
                  <TouchableOpacity onPress={() => console.log(d)}>
                    <Text style={styles.datacontainerText}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Status selection container */}
            <View style={styles.status}>
              <Text style={styles.htitle}>Status</Text>
              <View style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </View>
              <View style={styles.dataContainer}>
                {this.state.status.map((d: any, i: number) => (
                  <TouchableOpacity onPress={() => console.log(d)}>
                    <Text style={styles.datacontainerText}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Location selection container */}
            <View style={styles.location}>
              <Text style={styles.htitle}>Location</Text>
              <View style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </View>
              <View style={styles.dataContainer}>
                {this.state.obsType.map((d: any, i: number) => (
                  <TouchableOpacity onPress={() => console.log(d)}>
                    <Text style={styles.datacontainerText}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Risk sekection container */}
            <View style={styles.risk}>
              <Text style={styles.htitle}>Risk</Text>
              <View style={styles.selectionContainer}>
                <Text style={styles.selectedContent}>Select Type </Text>
                <Icon
                  name={'down'}
                  type={'antdesign'}
                  size={wp(3)}
                  color={colors.text}
                />
              </View>
              <View style={styles.dataContainer}>
                {this.state.risk.map((d: any, i: number) => (
                  <TouchableOpacity onPress={() => console.log(d)}>
                    <Text style={styles.datacontainerText}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.dateContainer}>
              {/* Date  container  */}
              <View style={styles.fromDate}></View>
              <View style={styles.toDate}></View>
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
