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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    this.state = {username: '', loading: false, error: false};
  }

  async signup() {
    if (this.state.username !== '') {
      if (validateEmail(this.state.username)) {
        this.setState({loading: true});
        setTimeout(() => {
          this.setState({loading: false, error: false});
          AsyncStorage.setItem('email', this.state.username);
          this.props.navigation.navigate('CreatePass', {
            username: this.state.username,
          });
        }, 3000);
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
            {this.state.loading == true ? (
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
            ) : (
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
                  // onPress={() => }
                  style={styles.siginwithGoogle}>
                  <View
                    style={{width: wp(5), height: wp(5), marginRight: wp(3)}}>
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
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
