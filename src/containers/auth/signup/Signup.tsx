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
} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon, Avatar} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorProp} from '@nav';
import {colors, images, GlStyles} from '@theme';
import LottieView from 'lottie-react-native';
import {validateEmail} from '@utils';
import {RouteProp} from '@react-navigation/native';
import {animation} from '@theme';
import styles from './styles';
import {validatePassword} from '@utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {Auth} from 'aws-amplify';

type SignupNavigationProp = StackNavigationProp<AuthNavigatorProp, 'Login'>;
type SignupRouteProp = RouteProp<AuthNavigatorProp, 'Login'>;

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

  async signup() {
    if (this.state.username !== '') {
      if (validateEmail(this.state.username)) {
        console.log(this.state.username);
        this.setState({loading: true, errorModal: true});
        // setTimeout(() => {

        // Auth.forgotPassword('')
        // await AsyncStorage.setItem('email', this.state.username).then((res) => {
        //   this.setState({loading: false, error: false, errorModal: false});
        // });

        // createPass = async () => {
        // if (this.state.password !== '') {
        // if (validatePassword(this.state.password)) {
        // this.setState({loading: true, errorModal: true});
        // const sii =  await Auth.signUp()
        try {
          const signUpResponse: any = await Auth.signUp({
            username: this.state.username,
            password: 'Safety_Connect1',
            attributes: {
              profile: 'NotConfirmed',
            },
          });
          // signUpResponse.then((res) => {
          //   console.log(res);
          // });
          console.log(signUpResponse);
          if (signUpResponse.userConfirmed) {
            console.log('line 79');
            console.log('user confirmed');
            // check if limit is not reached else send email for forgot password
            const sendEmail = await Auth.forgotPassword(
              this.state.username,
            ).catch((error) => {
              console.log('line 84');
              console.log(error);
              if (error.message.includes('limit')) {
                this.setState({loading: false, errorModal: false});

                console.log('Attempt limit Reached');
                // SHOW ATTEMPT LIMIT REACHED
              }
            });
            console.log('line 93');
            console.log(sendEmail);
            if (sendEmail) {
              this.setState({loading: false, errorModal: false});
              // Redirect => TO Forgot Password
              this.props.navigation.navigate('Verify', {
                email: this.state.username,
              });
            }
          }
        } catch (e: any) {
          console.log('line 101');
          console.log(e.messsage);
          if (e.message.includes('google')) {
            this.setState({loading: false, errorModal: false});

            console.log('Looks like you already signup with google.');
            // Redirect to => Alredy met screen
            // Auth.federatedSignIn({})
            // this.props.navigation.navigate('');
          }

          Auth.signIn(this.state.username, 'Safety_Connect1')
            .then()
            .catch(async (err) => {
              console.log(err);
              if (err.message.includes('Incorrect')) {
                // Toast Account Already exist
                this.setState({loading: false, errorModal: false});

                console.log('Account Already exitst');
              }

              if (e.message.includes('NotConfirmed')) {
                const sendEmail = await Auth.forgotPassword(
                  this.state.username,
                ).catch((error) => {
                  this.setState({loading: false, errorModal: false});
                  if (error.message.includes('limit')) {
                    console.log('Attempt limit reached. Try again later.');
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
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            {/* {this.state.loading == true ? (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: wp(40),
                }}>
                <LottieView
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
              </View>
            ) : ( */}
            <View>
              <Text style={styles.headingContainer}>Sign up</Text>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <Text style={styles.emailTextContainer}>Email</Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.username}
                    onChange={(e) => {
                      // if (validateEmail(e.nativeEvent.text)) {
                      //   this.setState({error: false});
                      // } else {
                      //   this.setState({error: true});
                      // }
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
                  // Auth.federatedSignIn({provider: }).then(res => {
                  // })
                }}
                style={styles.siginwithGoogle}>
                <View style={{width: wp(5), height: wp(5), marginRight: wp(3)}}>
                  <Image source={images.google} style={GlStyles.images} />
                </View>
                <Text style={styles.signinTextGoogle}>
                  Continue with Google{' '}
                </Text>
              </TouchableOpacity>
              {/* Don't have a Acctouny */}
              <Text style={styles.dontHaveAccount}>Already a member ? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
                style={styles.createnewaccountContainer}>
                <Text style={styles.createNewAccount}>
                  Sign in to your existing account!
                </Text>
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
