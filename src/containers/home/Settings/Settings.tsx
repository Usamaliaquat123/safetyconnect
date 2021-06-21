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
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts, animation} from '@theme';
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
      department: '',
      industry: '',
      role: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    AsyncStorage.getItem('email').then((email: any) => {
      console.log(email);
      api
        .createApi()
        .getUser(email)
        .then((user: any) => {
          console.log(user.data);

          this.setState({loading: false});

          this.setState({
            username: user.data.data.name,
            email: user.data.data.email,
            role: user.data.data.role,
            department: user.data.data.department,
            industry: user.data.data.industry,
          });

          console.log(this.state.username);
        })
        .catch((err) => console.log(err));
    });
  }

  updateUser = () => {
    if (this.state.username !== ' ') {
      if (this.state.role !== ' ') {
        this.setState({loading: false});
        var data = {
          email: this.state.email,
          role: this.state.role,
          department: this.state.department,
          industry: this.state.industry,
          img_url:
            'https://user-images.githubusercontent.com/33973828/115679334-e690a780-a36b-11eb-9202-3f5fb5413bbf.png',
        };
        api
          .createApi()
          .setUserInfo(data)
          .then((res: any) => {
            this.setState({loading: false});
            this.props.navigation.goBack();
          })
          .catch((err) => {
            console.log(err);
            this.setState({loading: false});
          });
      }
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name={'arrowleft'}
                  type={'antdesign'}
                  size={wp(5)}
                  color={colors.secondary}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>Profile</Text>
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
              {/* <Avatar
                // containerStyle={{alignSelf: 'center', marginTop: wp(3)}}
                // size={wp(30)}
                rounded
                source={{
                  uri:
                    'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fuser&psig=AOvVaw1mZl6u-R0ttxXEyWKiuF_8&ust=1623222366332000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjA_ta8h_ECFQAAAAAdAAAAABAD',
                }}
              /> */}
              <View
                style={{
                  backgroundColor: colors.green,
                  width: wp(8),
                  padding: wp(2.2),
                  right: wp(7),
                  top: wp(5),
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
            <View style={{marginTop: wp(5)}}>
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
                    editable={false}
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
                    placeholder={'Role'}
                  />
                </View>
              </View>
              {/* Your Department */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Your Department
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.department}
                    onChangeText={(e) => {
                      this.setState({department: e});
                    }}
                    placeholder={'Department'}
                  />
                </View>
              </View>
              {/* Your Industry */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Your Industry
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.industry}
                    onChangeText={(e) => {
                      this.setState({industry: e});
                    }}
                    placeholder={'Industry'}
                  />
                </View>
              </View>
              {/* Save  */}

              <TouchableOpacity
                // this.setState({repeatedSorModal: true})
                onPress={() => this.updateUser()}
                style={[
                  styles.submitsorbtnSb,
                  // {backgroundColor: colors.green},
                ]}>
                <Text style={[styles.submitsorbtnSbtxt]}>Update </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Modal Container */}
        {/* <Modal
          isVisible={this.state.loading}
          onBackdropPress={() => this.setState({loading: false})}>
          {this.state.loading == true ? (
            <View>
              <View style={{alignSelf: 'center'}}>
                <LottieView
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
              </View>
            </View>
          ) : null}
        </Modal> */}
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
