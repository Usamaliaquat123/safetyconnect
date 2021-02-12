import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Create_sor} from '@service';
import {RouteProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {Auth} from 'aws-amplify';
import {colors, images, GlStyles, animation} from '@theme';
import {default as Model} from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type LoginNavigationProp = StackNavigationProp<StackNavigatorProps, 'Login'>;
type LoginRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

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
    };
  }

  submitSignin = async (e: string) => {
    // event.preventDefault();
    // this.props.navigation.navigate('sor');
    this.setState({loading: true});
    const attr = {
      profile: 'NotConfirmed',
    };
    try {
      // Auth.
      const user = await Auth.signIn(
        'asohial.bscs16seecs@seecs.edu.pk',
        'Weird.password02',
        attr,
      );
      console.log(user);

      if (user.userConfirmed) {
        const sendEmail = await Auth.forgotPassword(e);
        this.setState({loading: false});
        if (sendEmail) this.props.navigation.navigate('Verify');
      } else {
        this.setState({loading: false});
        this.props.navigation.navigate('sor');
      }
    } catch (err) {
      this.setState({loading: false});
      console.log(err);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Sign In</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={[styles.content]}>
            {this.state.loading == true ? (
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
                  style={{width: wp(70)}}
                  source={animation.loading}
                  loop={true}
                />
                <Text
                  style={{
                    fontSize: wp(3.5),
                    opacity: 0.5,
                    textAlign: 'center',
                    marginTop: wp(5),
                  }}>
                  Connecting...
                </Text>
              </View>
            ) : (
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
                      onChange={(e) =>
                        this.setState({username: e.nativeEvent.text})
                      }
                      value={this.state.username}
                      placeholder={'Enter your email'}
                    />
                  </View>
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
                      onFocus={() => this.setState({selectedInput: 2})}
                      style={styles.authInputs}
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({password: e.nativeEvent.text})
                      }
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
                </View>
                <Text style={styles.forgetPassText}>Forget Password ? </Text>
                <TouchableOpacity
                  onPress={() => this.submitSignin(this.state.username)}
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
                  <View
                    style={{width: wp(7), height: wp(7), marginRight: wp(3)}}>
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
                  <Text style={styles.createNewAccount}>
                    Create New Account
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        {/* <Model
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          animationInTiming={2000}
          animationOutTiming={2000}
          isVisible={true}
          onBackdropPress={() => this.setState({addAssigners: false})}>
        
        </Model> */}
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
