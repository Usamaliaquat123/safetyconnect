import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
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
import {fonts} from '@theme';
import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
// import {validateEmail} from '@utils/';
type WelcomeHomeNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'WelcomeHome'
>;
type WelcomeHomeRouteProp = RouteProp<StackNavigatorProps, 'WelcomeHome'>;

export interface WelcomeHomeProps {
  navigation: WelcomeHomeNavigationProp;
  route: WelcomeHomeRouteProp;
  reduxActions: any;
  reduxState: any;
}

class WelcomeHome extends React.Component<WelcomeHomeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  WelcomeHome = () => {};
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: wp(10)}}>
          <Text
            style={{
              fontSize: wp(5),
              fontFamily: fonts.SFuiDisplayMedium,
              color: colors.primary,
            }}>
            Hey John! Lets start using
          </Text>
          <Text
            style={{
              fontSize: wp(5),
              fontFamily: fonts.SFuiDisplayMedium,
              color: colors.primary,
            }}>
            SefetyConnect!
          </Text>
        </View>

        {/* craete your first observation  */}
        <View style={{marginTop: wp(5)}}>
          <View
            style={{
              backgroundColor: colors.primary,
              padding: wp(5),
              alignItems: 'center',
              flexDirection: 'row',
              //   alignItems: 'center',
              borderRadius: wp(2),
            }}>
            <View
              style={{
                width: wp(3),
                backgroundColor: colors.green,
                borderRadius: wp(10),
                padding: wp(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.homeIcon.observationfeedback}
                style={[
                  {
                    position: 'absolute',
                    tintColor: colors.secondary,
                    width: wp(7),
                    height: wp(7),
                  },
                ]}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: wp(5),

                  fontSize: wp(4),
                  fontFamily: fonts.SFuiDisplayLight,
                  color: colors.secondary,
                }}>
                Create your first
              </Text>
              <Text
                style={{
                  marginLeft: wp(5),

                  fontSize: wp(4),
                  fontFamily: fonts.SFuiDisplayLight,
                  color: colors.secondary,
                }}>
                Observation
              </Text>
            </View>
          </View>
        </View>

        {/* Invite your team members */}
        <View style={{marginTop: wp(5)}}>
          <View
            style={{
              backgroundColor: colors.primary,
              padding: wp(5),
              alignItems: 'center',
              flexDirection: 'row',
              //   alignItems: 'center',
              borderRadius: wp(2),
            }}>
            <View
              style={{
                width: wp(3),
                backgroundColor: colors.green,
                borderRadius: wp(10),
                padding: wp(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name={'team'}
                type={'antdesign'}
                size={wp(8)}
                containerStyle={{position: 'absolute'}}
                color={colors.secondary}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: wp(5),

                  fontSize: wp(4),
                  fontFamily: fonts.SFuiDisplayLight,
                  color: colors.secondary,
                }}>
                Invite your Team
              </Text>
              <Text
                style={{
                  marginLeft: wp(5),

                  fontSize: wp(4),
                  fontFamily: fonts.SFuiDisplayLight,
                  color: colors.secondary,
                }}>
                Members
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontSize: wp(4),
            fontFamily: fonts.SFuiDisplayMedium,
            color: colors.primary,
            textAlign: 'center',
            position: 'absolute',
            alignSelf: 'center',
            bottom: wp(20),
          }}>
          SKIP
        </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeHome);
