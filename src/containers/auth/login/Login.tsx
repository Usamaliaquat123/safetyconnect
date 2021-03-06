import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorProp} from '@nav';
import {Create_sor} from '@service';
import {RouteProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {Auth} from 'aws-amplify';
import {colors, images, GlStyles, animation} from '@theme';
import Modal from 'react-native-modal';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {validateEmail, validatePassword} from '@utils';
type LoginNavigationProp = StackNavigationProp<AuthNavigatorProp, 'Login'>;
type LoginRouteProp = RouteProp<AuthNavigatorProp, 'Login'>;

export interface LoginProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Login extends React.Component<LoginProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedInput: 1,
      isEye: true,
      username: '',
      loading: false,
      password: '',
      passError: false,
      errorModal: false,
      emailError: false,
      dynamicLink: '',
      email: '',
      code: '',
    };
  }
  // handleDynamicLink = (link: any) => {
  //   // Handle dynamic link inside your own application
  //   this.setState({dynamicLink: JSON.stringify(link)});
  // };
  componentWillUnmount = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

  componentDidMount() {
    // dynamicLinks().onLink(this.handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then((link: any) => {
        console.log(link);
        if (link != null) {
          if (link.url.split('/')[3].split('?')[0] == 'user-info') {
            this.props.navigation.navigate('CreatePass', {
              email: link.url
                .split('/')[3]
                .split('?')[1]
                .split('email=')[1]
                .split('&')[0],
              code: link.url
                .split('/')[3]
                .split('?')[1]
                .split('&')[1]
                .split('=')[1],
            });
          }
        }
      });

    dynamicLinks().onLink(this.handleDynamicLink);
  }

  handleDynamicLink = (link: any) => {
    // Handle dynamic link inside your own application
    console.log(link.url);
    // if (link.url === 'https://invertase.io/offer') {
    //   // ...navigate to your offers screen
    // }
  };

  submitSignin = async () => {
    if (
      this.state.username != '' &&
      validateEmail(this.state.username) == true
    ) {
      this.setState({emailError: false});
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
          const user = await Auth.signIn(
            this.state.username,
            this.state.password,
            {
              profile: 'NotConfirmed',
            },
          );

          if (user.userConfirmed) {
            const sendEmail = await Auth.forgotPassword(this.state.username);
            this.setState({loading: false});
            if (sendEmail) this.props.navigation.navigate('Home');
          } else {
            this.setState({loading: false});
          }
        } catch (err) {
          this.setState({errorModal: true, loading: false});
        }
      } else {
        this.setState({passError: true});
      }
    } else {
      this.setState({emailError: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text>{this.state.dynamicLink}</Text>
                <Text style={styles.title}>Sign In</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={[styles.content]}>
            {/* {this.state.loading == true ? (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: wp(40),
                }}>
                <LottieView
                  // ref={(animation) => {
                  //   this.photoAnim = animation;
                  // }}
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
                <Text
                  style={{
                    fontSize: wp(3),
                    opacity: 0.5,
                    textAlign: 'center',
                    marginTop: wp(-5),
                  }}>
                  loading...
                </Text>
              </View>
            ) : ( */}
            <View>
              <Text style={styles.headingContainer}>Sign In</Text>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <Text style={styles.emailTextContainer}>Email</Text>
                <View
                  style={[
                    styles.inputContainer,
                    this.state.selectedInput == 1
                      ? {borderColor: colors.green}
                      : {borderColor: colors.textOpa},
                  ]}>
                  <TextInput
                    onFocus={() => this.setState({selectedInput: 1})}
                    style={styles.authInputs}
                    onChange={(e) => {
                      if (validateEmail(e.nativeEvent.text) == true) {
                        this.setState({emailError: false});
                      } else {
                        this.setState({emailError: true});
                      }

                      this.setState({username: e.nativeEvent.text});
                    }}
                    value={this.state.username}
                    placeholder={'Enter your email'}
                  />
                </View>
                {this.state.emailError && (
                  <Text style={{fontSize: wp(3), color: colors.error}}>
                    Enter your valid email address
                  </Text>
                )}
                {/* Password Container */}
                <Text style={styles.passTextContainer}>Password</Text>
                <View
                  style={[
                    styles.inputContainer,
                    this.state.selectedInput == 2
                      ? {borderColor: colors.green}
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
              <Text style={styles.forgetPassText}>Forget Password ? </Text>
              <TouchableOpacity
                onPress={() => this.submitSignin()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Sign in </Text>
              </TouchableOpacity>
              {/* Or */}
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>
              {/* Google Signin */}
              <TouchableOpacity style={styles.siginwithGoogle}>
                <View style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
                  <Image source={images.google} style={GlStyles.images} />
                </View>
                <Text style={styles.signinTextGoogle}>
                  Continue with Google{' '}
                </Text>
              </TouchableOpacity>
              {/* Don't have a Acctouny */}
              <Text style={styles.dontHaveAccount}>
                Don't have an Account ?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}
                style={styles.createnewaccountContainer}>
                <Text style={styles.createNewAccount}>Create New Account</Text>
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
          {this.state.loading == true ? (
            <View>
              <ActivityIndicator color={colors.primary} size={'large'} />
            </View>
          ) : (
            <View style={styles.modelContainer}>
              <View>
                <Text style={styles.errHeadPop}>
                  Incorrect Email / Password !
                </Text>
                <Text style={styles.errEmailPassDesc}>
                  We don't recognize that email and password.
                </Text>
                <Text style={styles.plzTryAgain}>Please try again later.</Text>
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
