import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import styles from './styles';
import {colors, images, animation} from '@theme';
import {Auth} from 'aws-amplify';
import Modal from 'react-native-modal';

import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {validateEmail} from '@utils';
export interface ForgotProps {
  navigation: forgotPassNavigationProp;
  route: forgotRouteProp;
  reduxActions: any;
  reduxState: any;
}

type forgotPassNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Forgot'
>;
type forgotRouteProp = RouteProp<StackNavigatorProps, 'Forgot'>;

class Forgot extends React.Component<ForgotProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      laoding: true,
      error: false,
      errModal: false,
    };
  }

  componentDidMount() {}
  // Forget pass function
  forgotPass = async (email: string) => {
    if (validateEmail(email)) {
      this.setState({errModal: true, loading: true, error: false});

      // Authenticated user signin
      await Auth.signIn(this.state.email, 'Safety_Connect1')
        .then()
        .catch((err) => {
          if (err.message.includes('not exists')) {
            this.setState({
              loading: false,
              conentLoading: 'Attempt limit Reached!',
            });
          } else {
            Auth.forgotPassword(email)
              .then((data) => {
                this.setState({loading: false, errModal: false});
                this.props.navigation.navigate('ForgotEmailSend', {
                  email: email,
                });
              })
              .catch((err) => {
                if (err.message.includes('limit')) {
                  this.setState({
                    loading: false,
                    conentLoading: 'Attempt limit Reached!',
                  });
                }
              });
          }
        });
    } else {
      this.setState({loading: false, error: true, errorModal: true});
    }
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
                <Text style={styles.title}>Forgot Password</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View> */}
          {/* content */}
          <View style={{marginTop: wp(1)}}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                size={wp(6)}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.primary}
              />
            </View>
            <View style={{marginTop: wp(5)}}>
              <Text style={styles.headingContainer}>Forgot Password</Text>
              {/* inputs container */}
              <Text style={styles.headingCotent}>
                Enter your email to reset your password{' '}
              </Text>

              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <Text style={styles.emailTextContainer}>Enter your email</Text>

                {Platform.OS == 'ios' ? (
                  <View style={[styles.inputContainer, {padding: wp(3)}]}>
                    <TextInput
                      style={styles.authInputs}
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({email: e.nativeEvent.text});
                      }}
                      placeholder={'Enter your email'}
                    />
                  </View>
                ) : (
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      style={styles.authInputs}
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({email: e.nativeEvent.text});
                      }}
                      placeholder={'Enter your email'}
                    />
                  </View>
                )}
                {this.state.error && (
                  <Text style={{fontSize: wp(3), color: colors.error}}>
                    Type your valid email address
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => this.forgotPass(this.state.email)}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Continue</Text>
                <Icon
                  containerStyle={{marginLeft: wp(3)}}
                  size={wp(5)}
                  name="arrowright"
                  type="antdesign"
                  color={colors.secondary}
                />
              </TouchableOpacity>

              {/* Don't have a Acctouny */}
              <View style={styles.dtHaveContainer}>
                <Text style={styles.dontHaveAccount}>
                  Make sure to check your Spam or Junk{' '}
                </Text>
                <Text style={styles.dontHaveAccount}>
                  folders before requesting verification link
                </Text>
                <Text style={styles.dontHaveAccount}>again.</Text>
              </View>
              <View style={{marginTop: wp(10)}}>
                <Text style={styles.dontHaveAccount}>
                  Didn't received email. ?
                </Text>
                <Text style={styles.dontHaveAccountLink}>
                  Resend Password Reset Email
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal
          isVisible={this.state.errModal}
          onBackdropPress={() =>
            this.setState({errModal: false, loading: false})
          }>
          {this.state.loading == true ? (
            <View>
              <LottieView
                autoPlay={true}
                style={{width: wp(90)}}
                source={animation.loading}
                loop={true}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
