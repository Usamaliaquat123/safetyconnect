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
import {StackNavigatorProps} from '@nav';
import {colors, images, GlStyles} from '@theme';
import LottieView from 'lottie-react-native';

import {RouteProp} from '@react-navigation/native';
import {animation} from '@theme';
import styles from './styles';
import {set} from 'react-native-reanimated';

type SignupNavigationProp = StackNavigationProp<StackNavigatorProps, 'Login'>;
type SignupRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface SignupProps {
  navigation: SignupNavigationProp;
  route: SignupRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Signup extends React.Component<SignupProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {username: '', loading: false};
  }

  async signup() {
    this.setState({loading: true});
    setTimeout(() => {
      if (this.state.username !== '') {
        this.setState({loading: false});

        this.props.navigation.navigate('CreatePass', {
          username: this.state.username,
        });
      }
    }, 5000);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
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
                <Text
                  style={{
                    fontSize: wp(3.5),
                    opacity: 0.5,
                    textAlign: 'center',
                    marginTop: wp(-5),
                  }}>
                  Connecting...
                </Text>
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
                        this.setState({username: e.nativeEvent.text});
                      }}
                      placeholder={'Enter your email'}
                    />
                  </View>
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
