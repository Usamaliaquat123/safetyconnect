import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {RouteProp, CommonActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {validatePassword} from '@utils';
import styles from './styles';
import {colors, images, GlStyles, fonts} from '@theme';
import {Icon} from 'react-native-elements';
import {Auth} from 'aws-amplify';
import {Create_sor, createApi} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface MeetBeforeProps {
  navigation: MeetBeforeNavigationProp;
  route: MeetBeforeRouteProp;
  reduxActions: any;
  reduxState: any;
}

type MeetBeforeNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'MeetBefore'
>;
type MeetBeforeRouteProp = RouteProp<StackNavigatorProps, 'MeetBefore'>;

class MeetBefore extends React.Component<MeetBeforeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: 'inconnent12345@outlook.com', //this.props.route.params.email
      password: '',
      passError: false,
    };
  }

  componentDidMount() {}

  submitSignin = async () => {
    if (
      this.state.password != '' &&
      validatePassword(this.state.password) == true
    ) {
      this.setState({passError: false});
      try {
        /*
         * @Default email : asohial.bscs16seecs@seecs.edu.pk || password: Weird.password02
         */

        this.setState({loading: true, errorModal: true});
        const user = await Auth.signIn(this.state.email, this.state.password);
        this.setState({errorModal: false, loading: false});

        createApi
          .createApi()
          .getUser(this.state.username)
          .then((user: any) => {
            AsyncStorage.setItem('user', JSON.stringify(user.data.data));
          });

        AsyncStorage.setItem('email', this.state.username);

        this.props.navigation.navigate('Main');
      } catch (err) {
        this.setState({errorModal: true, loading: false});
      }
    } else {
      this.setState({passError: true});
    }
  };
  // Continue with google
  loginWithGoogle = async () => {
    try {
      // GoogleSignin.signIn().then(res => {
      //   console.log(res)
      // }).catch(err => console.log(err))

      const user = await Auth.federatedSignIn({provider: 'Google'});

      this.props.navigation.navigate('Main');
    } catch (e) {}
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                containerStyle={{marginLeft: wp(2)}}
                onPress={() => this.props.navigation.goBack()}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View> */}
          {/* content */}
          <View style={styles.content}>
            <View>
              <Text style={styles.headingContainer}>
                Hey there, We've already met
              </Text>
              <Text
                style={{
                  fontSize: wp(3.3),
                  fontFamily: fonts.SFuiDisplayMedium,
                  opacity: 0.5,
                }}>
                This email address is allready registered, Please
              </Text>
              <Text
                style={{
                  fontSize: wp(3.3),
                  fontFamily: fonts.SFuiDisplayMedium,
                  opacity: 0.5,
                }}>
                enter password to access your account
              </Text>

              {/* Password Container */}
              <View>
                <Text style={styles.passTextContainer}>
                  Enter your password
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    this.state.selectedInput == 2
                      ? {borderColor: colors.primary}
                      : {borderColor: colors.textOpa},
                  ]}>
                  <TextInput
                    secureTextEntry={this.state.isEye}
                    onFocus={() => {
                      // if (validateEmail(this.state.username)) {
                      //   this.setState({emailError: false});
                      // } else {
                      //   this.setState({emailError: true});
                      // }
                      this.setState({selectedInput: 2});
                    }}
                    style={styles.authInputs}
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({passError: false});
                      this.setState({password: e.nativeEvent.text});
                    }}
                    placeholder={'******'}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({isEye: !this.state.isEye})}
                    style={styles.eyeIconContainer}>
                    {this.state.isEye == true ? (
                      <Icon
                        containerStyle={{opacity: 0.5}}
                        size={wp(5)}
                        name="eye-with-line"
                        type="entypo"
                        color={colors.text}
                      />
                    ) : (
                      <Icon
                        containerStyle={{opacity: 0.5}}
                        size={wp(5)}
                        name="eye"
                        type="antdesign"
                        color={colors.text}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {this.state.passError && (
                  <View>
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Your valid password should be including
                    </Text>
                    <View>
                      <Text style={styles.passwordError}>
                        * Password must be a 8 characters long.
                      </Text>
                      <Text style={styles.passwordError}>
                        * Password must be contain a capital letter.
                      </Text>
                      <Text style={styles.passwordError}>
                        * Password must be contain a number.
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <View style={{marginTop: wp(10)}}>
                <TouchableOpacity
                  onPress={() => this.submitSignin()}
                  style={styles.siginBtnContainer}>
                  <Text style={styles.signinText}>Continue </Text>

                  <Icon
                    containerStyle={{marginLeft: wp(3)}}
                    size={wp(5)}
                    name="arrowright"
                    type="antdesign"
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>

              {/* Or */}
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>
              {/* Google Signin */}
              <TouchableOpacity
                onPress={() => {
                  this.loginWithGoogle();
                }}
                style={styles.siginwithGoogle}>
                <View style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
                  <Image source={images.google} style={GlStyles.images} />
                </View>
                <Text style={styles.signinTextGoogle}>
                  Continue with Google{' '}
                </Text>
              </TouchableOpacity>
              {/* Apple Signin */}
              <TouchableOpacity
                onPress={() => {
                  this.loginWithGoogle();
                }}
                style={styles.siginwithGoogle}>
                <View
                  style={{width: wp(10), height: wp(7), marginRight: wp(3)}}>
                  {/* <Image source={images.} style={GlStyles.images} /> */}
                  <Icon
                    containerStyle={{marginLeft: wp(3)}}
                    size={wp(5)}
                    name="apple1"
                    type="antdesign"
                    color={colors.text}
                  />
                </View>
                <Text style={styles.signinTextGoogle}>
                  Continue with Apple ID{' '}
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => {
                  // this.props.navigation.dispatch(
                  //   CommonActions.reset({
                  //     index: 1,
                  //     routes: [
                  //       {
                  //         name: 'Login',
                  //       },
                  //     ],
                  //   }),
                  // );
                }}
                style={styles.siginwithGoogle}>
                <View style={{width: wp(5), height: wp(5), marginRight: wp(3)}}>
                  <Image source={images.google} style={GlStyles.images} />
                </View>
                <Text style={styles.signinTextGoogle}>Use Google Account </Text>
              </TouchableOpacity> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MeetBefore);
