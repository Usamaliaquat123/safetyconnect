import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon, Avatar} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {colors, images, GlStyles} from '@theme';
import LottieView from 'lottie-react-native';
import {validateEmail} from '@utils';
import {RouteProp} from '@react-navigation/native';
import {animation} from '@theme';
import styles from './styles';
import {validatePassword, mainPass} from '@utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {Auth} from 'aws-amplify';
import dynamicLinks from '@react-native-firebase/dynamic-links';

type SignupNavigationProp = StackNavigationProp<StackNavigatorProps, 'Signup'>;
type SignupRouteProp = RouteProp<StackNavigatorProps, 'Signup'>;

export interface SignupProps {
  navigation: SignupNavigationProp;
  route: SignupRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Signup extends React.Component<SignupProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      loading: false,
      conentLoading: '',
      error: false,
      errorModal: false,
    };
  }

  componentDidMount = () => {
    Linking.addEventListener('sd', (e) => {});
    dynamicLinks().onLink((l) => {
      // this.handleDynamicLink(l);
    });
  };
  async signup() {
    if (this.state.username !== '') {
      if (validateEmail(this.state.username)) {
        this.setState({loading: true, errorModal: true});

        try {
          let signUpResponse: any = await Auth.signUp({
            username: this.state.username,
            password: mainPass,
            attributes: {
              profile: 'NotConfirmed',
            },
          });
          // signUpResponse.then((res) => {
          // });
          if (signUpResponse.userConfirmed) {
            // check if limit is not reached else send email for forgot password
            const sendEmail = await Auth.forgotPassword(
              this.state.username,
            ).catch((error) => {
              if (error.message.includes('limit')) {
                this.setState({
                  loading: false,
                  conentLoading: 'Attempt limit Reached!',
                });
              }
            });
            if (sendEmail) {
              this.setState({loading: false, errorModal: false});
              // Redirect => TO Forgot Password
              this.props.navigation.navigate('Verify', {
                email: this.state.username,
              });
            }
          }
        } catch (e: any) {
          if (e.message.includes('google')) {
            this.setState({loading: false, errorModal: false});

            // Redirect to => Alredy met screen
            // Auth.federatedSignIn({})
            this.props.navigation.navigate('MeetBefore', {
              email: this.state.username,
            });
          }

          Auth.signIn(this.state.username, mainPass)
            .then()
            .catch(async (err) => {
              if (err.message.includes('Incorrect')) {
                // Toast Account Already exist
                this.setState({loading: false, errorModal: false});
                this.props.navigation.navigate('MeetBefore', {
                  email: this.state.username,
                });
              }

              if (err.message.includes('NotConfirmed')) {
                const sendEmail = await Auth.forgotPassword(
                  this.state.username,
                ).catch((error) => {
                  // this.setState({loading: false, errorModal: false});

                  if (error.message.includes('limit')) {
                    this.setState({
                      loading: false,
                      conentLoading: 'Attempt limit Reached!',
                    });
                  }
                });
                if (sendEmail) {
                  this.setState({loading: false, errorModal: false});
                  this.props.navigation.navigate('Verify', {
                    email: this.state.username,
                  });
                }
              }
            });
        }
      } else {
        this.setState({error: true});
      }
    } else {
      this.setState({error: true});
    }
  }

  continuewithgoogle = async () => {
    // it isn't working at all
    try {
      const user = await Auth.federatedSignIn({provider: 'Google'});
    } catch (err) {}
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View>
            <View style={{marginTop: wp(10)}}>
              <Text style={styles.headingContainer}>
                Welcome to Safety Connect
              </Text>
              <Text style={styles.headingContent}>
                Create your account and get started with SafetyConnect to ensure
                the safety and well-being of workplaces
              </Text>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <Text style={styles.emailTextContainer}>Enter your email</Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({username: e.nativeEvent.text});
                    }}
                    placeholder={'Enter your email'}
                  />
                </View>
                {this.state.error && (
                  <Text style={{fontSize: wp(3), color: colors.error}}>
                    Type your valid email address
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => this.signup()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Continue</Text>
                <View style={{marginLeft: wp(1)}}>
                  <Icon
                    size={wp(4)}
                    name="arrowright"
                    type="antdesign"
                    color={colors.secondary}
                  />
                </View>
              </TouchableOpacity>

              {/* Or */}
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>
              {/* Google Signin */}
              <TouchableOpacity
                onPress={() => {
                  this.continuewithgoogle();
                }}
                style={styles.siginwithGoogle}>
                <View style={{width: wp(5), height: wp(5), marginRight: wp(3)}}>
                  <Image source={images.google} style={GlStyles.images} />
                </View>
                <Text style={styles.signinTextGoogle}>
                  Continue with Google{' '}
                </Text>
              </TouchableOpacity>
              {/* Apple  Signin */}
              <TouchableOpacity
                onPress={() => {
                  this.continuewithgoogle();
                }}
                style={styles.signUpWithApple}>
                <View style={{width: wp(5), height: wp(5), marginRight: wp(3)}}>
                  <Icon
                    size={wp(5)}
                    name="apple1"
                    type="antdesign"
                    color={colors.text}
                  />
                </View>
                <Text style={styles.signinWithApple}>
                  Continue with Apple ID
                </Text>
              </TouchableOpacity>
              {/* Don't have a Acctouny */}
              <View style={{marginTop: wp(25)}}>
                <Text style={styles.dontHaveAccount}>
                  Already have a account ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}
                  style={styles.createnewaccountContainer}>
                  <Text style={styles.createNewAccount}>Sign in here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.errorModal}
          onBackdropPress={() =>
            this.setState({
              errorModal: false,
              loading: false,
              conentLoading: '',
            })
          }>
          {this.state.loading == true && (
            <View>
              <ActivityIndicator color={colors.primary} size={'large'} />
            </View>
          )}

          {this.state.conentLoading !== '' && (
            <View
              style={{
                backgroundColor: colors.secondary,
                padding: wp(5),
                alignContent: 'center',
                borderRadius: wp(3),
              }}>
              <Text style={{fontSize: wp(3)}}>{this.state.conentLoading}</Text>
            </View>
          )}
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
