import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CommonActions} from '@react-navigation/native';
import {StackNavigatorProps} from '@nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
import api from '@service/api';
export interface SettingsProps {
  route: MoreRouteProp;
  navigation: MoreNavigationProp;
  reduxActions: any;
  reduxState: any;
}

type MoreNavigationProp = StackNavigationProp<StackNavigatorProps, 'Settings'>;
type MoreRouteProp = RouteProp<StackNavigatorProps, 'Settings'>;

class Settings extends React.Component<SettingsProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      email: '',
      role: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('email').then((email: any) => {
      api
        .createApi()
        .getUser(email)
        .then((user: any) => {
          console.log(user);
        });
    });
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                name={'arrowleft'}
                type={'antdesign'}
                size={wp(5)}
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Profile</Text>
                {/* <View style={styles.underScrore} /> */}
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <Text
              style={{
                fontSize: wp(4),
                fontFamily: fonts.SFuiDisplayBold,
                textAlign: 'center',
                marginTop: wp(3),
                color: colors.primary,
              }}>
              {' '}
              Edit Your Profile
            </Text>

            <View style={{width: wp(50), alignSelf: 'center'}}>
              <Avatar
                containerStyle={{alignSelf: 'center', marginTop: wp(3)}}
                size={wp(30)}
                rounded
                source={{
                  uri:
                    'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fuser&psig=AOvVaw1mZl6u-R0ttxXEyWKiuF_8&ust=1623222366332000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjA_ta8h_ECFQAAAAAdAAAAABAD',
                }}
              />
              <View
                style={{
                  backgroundColor: colors.green,
                  width: wp(10),
                  padding: wp(3),
                  right: wp(7),
                  top: wp(5),
                  // alignSelf: 'center',
                  position: 'absolute',
                  borderRadius: wp(10),
                }}>
                <Icon
                  name={'pencil'}
                  type={'entypo'}
                  size={wp(3.5)}
                  color={colors.secondary}
                />
              </View>
            </View>
            {/* user profile details */}
            <View style={{marginTop: wp(5)}}>
              {/* Full name */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Full Name
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.username}
                    onChangeText={(e) => {
                      this.setState({username: e});
                    }}
                    placeholder={'Your Full Name'}
                  />
                </View>
              </View>

              {/* Email Address */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Email Address
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.email}
                    onChangeText={(e) => {
                      this.setState({email: e});
                    }}
                    placeholder={'johndoe@email.com'}
                  />
                </View>
              </View>
              {/* Your Role */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Your Role
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.role}
                    onChangeText={(e) => {
                      this.setState({role: e});
                    }}
                    placeholder={'johndoe@email.com'}
                  />
                </View>
              </View>
              {/* Save  */}

              <TouchableOpacity
                // this.setState({repeatedSorModal: true})
                // onPress={() => this.onCreateSor(4)}
                style={[
                  styles.submitsorbtnSb,
                  {backgroundColor: colors.green},
                ]}>
                <Text
                  style={[styles.submitsorbtnSbtxt, {color: colors.secondary}]}>
                  Mark as Complete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
