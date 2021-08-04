import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as reduxActions from '../../../store/actions/listSorActions';

import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';

import {RouteProp} from '@react-navigation/native';
import {colors, images, GlStyles} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';

import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
// import {validateEmail} from '@utils/';
type AddLocationNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'AddLocation'
>;
type AddLocationRouteProp = RouteProp<StackNavigatorProps, 'AddLocation'>;

export interface AddLocationProps {
  navigation: AddLocationNavigationProp;
  route: AddLocationRouteProp;
  reduxActions: any;
  reduxState: any;
}

class AddLocation extends React.Component<AddLocationProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      // Error State
      errorModal: false,
      orgError: false,
      peoples: [], // must be array of id's
      projects: [],

      locationName: '',
      locationSupervisor: '',
      additionalSuppervisors: '',
    };
  }

  addLocation = async () => {
    if (this.state.locationName !== '') {
      await AsyncStorage.getItem('locations').then((location: any) => {
        var loca = JSON.parse(location);
        if (loca != null) {
          // AsyncStorage.setItem(
          //   'locations',
          //   JSON.stringify({name : this.state.locationName, supervisor : }),
          // );

          this.props.navigation.goBack();
        } else {
          loca.push(this.state.locationName);
          this.props.navigation.goBack();
        }
      });
      await AsyncStorage.setItem('locations', this.state.locationName);
      this.props.navigation.goBack();
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View style={styles.content}>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.headingContainer}>Add New Location</Text>
                <Icon
                  onPress={() => this.props.navigation.goBack()}
                  containerStyle={{marginLeft: wp(2)}}
                  name={'cross'}
                  type={'entypo'}
                  size={wp(4.6)}
                  iconStyle={{opacity: 0.5}}
                />
              </View>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.emailTextContainer}>Location Name</Text>
                    <Text
                      style={[
                        styles.emailTextContainer,
                        {opacity: 0.5, marginLeft: wp(3)},
                      ]}>
                      (Mandatory)
                    </Text>
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.locationName}
                      style={styles.authInputs}
                      onChangeText={(e) => this.setState({locationName: e})}
                      placeholder={'Enter your new location'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type your location name
                    </Text>
                  )}
                </View>

                {/* Location Supervisor */}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: wp(3),
                      alignItems: 'center',
                    }}>
                    <Text style={styles.emailTextContainer}>
                      Location Supervisor
                    </Text>
                    <Icon
                      containerStyle={{marginLeft: wp(2)}}
                      name={'info'}
                      type={'feather'}
                      size={wp(3)}
                      iconStyle={{opacity: 0.5}}
                    />
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.locationSupervisor}
                      style={styles.authInputs}
                      onChangeText={(e) =>
                        this.setState({locationSupervisor: e})
                      }
                      placeholder={'Enter Name'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Assign your location supervisor
                    </Text>
                  )}
                </View>

                {/* Additional Suppervisors */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>
                      Additional Suppervisors
                    </Text>
                    <Icon
                      containerStyle={{marginTop: wp(1), marginLeft: wp(2)}}
                      name={'info'}
                      type={'feather'}
                      size={wp(3)}
                      iconStyle={{opacity: 0.5}}
                    />
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      
                      value={this.state.additionalSuppervisors}
                      style={styles.authInputs}
                      onChangeText={(e) =>
                        this.setState({additionalSuppervisors: e})
                      }
                      placeholder={'Enter name'}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.addLocation()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Add Location</Text>
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
        </ScrollView>
        {/* validations error */}
        {/* Modal Container */}
        <Modal
          isVisible={this.state.errorModal}
          onBackdropPress={() =>
            this.setState({errorModal: false, loading: false})
          }>
          {this.state.loading == true && (
            <View>
              <LottieView
                autoPlay={true}
                style={{width: wp(90)}}
                source={animation.loading}
                loop={true}
              />
            </View>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);
