import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Auth} from 'aws-amplify';
import {connect} from 'react-redux';
import * as reduxActions from '@actions';
import {bindActionCreators} from 'redux';
import {AllSorDTO} from '@dtos';
import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {validatePassword} from '@utils';
import LottieView from 'lottie-react-native';
import {colors, images, GlStyles, animation} from '@theme';
import {RouteProp, ThemeProvider} from '@react-navigation/native';
import styles from './styles';
import {createApi as api} from '@service';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChangePasswordsNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ChangePassword'
>;
type ChangePasswordRouteProp = RouteProp<StackNavigatorProps, 'ChangePassword'>;

export interface ChangePasswordProps {
  navigation: ChangePasswordsNavigationProp;
  route: ChangePasswordRouteProp;
  reduxActions: any;
  reduxState: any;
  // username: string;
}

class ChangePassword extends React.Component<ChangePasswordProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: '',
      error: false,
      isEye: false,
      contentPopup: '',
      passMachErr: false,
      errorModal: false,
      passMatchText: '',
      loading: true,
      name: '',

      // for testing
      email: 'defaje7099@troikos.com',
      code: '3D449672',
    };
  }

  componentWillUnmount = () => {
    this.setState({
      password: '',
      passMatchText: '',
    });
  };

  setupPass = async () => {
    console.log(this.state.password);
    console.log(this.state.code);
    console.log(this.state.email);
    if (validatePassword(this.state.password)) {
      if (this.state.password == this.state.passMatchText) {
        try {
          this.setState({
            passMachErr: false,
            error: false,
            loading: true,
            errorModal: true,
          });

          await Auth.forgotPasswordSubmit(
            this.props.route.params.email, // dynal=mic link
            this.props.route.params.code, // dynamic link
            this.state.password, //password new
          )
            .then((res) => {
              this.props.reduxActions
                .getUser(this.props.route.params.email)
                .then((d: any) => {
                  if (d.data.data.organizations.length == 0) {
                    this.props.navigation.navigate('TellAboutYou', {
                      username: this.props.route.params.email,
                    });
                  } else {
                    this.props.navigation.navigate('Main');
                  }
                });
              // api
              //   .createApi()
              //   .getUser(this.props.route.params.email)
              //   .then((getusr: any) => {
              //     if (getusr.data.data.organizations.length == 0) {
              //       this.props.navigation.navigate('TellAboutYou', {
              //         username: this.props.route.params.email,
              //       });
              //     } else {
              //       this.props.navigation.navigate('Main');
              //     }
              //   });

              // this.props.navigation.navigate('Main');
            })
            .catch((err) => {
              console.log('error on forgot password submit ');
              console.log(err);

              this.setState({
                loading: false,
                errorModal: true,
                contentPopup: 'Your session is expired',
              });
            });
        } catch (err) {
          console.log(err);
          this.setState({loading: false, errorModal: false});
        }
      } else {
        this.setState({passMachErr: true, error: false});
      }
    } else {
      this.setState({error: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View>
            {/* {this.state.loading == true ? ( */}
            {/* <View
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
                loading...
              </Text>
            </View> */}
            {/* ) : ( */}
            <View style={{marginTop: wp(5)}}>
              <View style={{marginBottom: wp(10)}}>
                <Text style={styles.headingContainer}>Change Password</Text>
                <Text style={styles.headingPra}>
                  You are changing password of{' '}
                  <Text style={styles.headingParaEmail}>
                    {this.props.route.params.email}
                  </Text>
                </Text>
              </View>

              {/* inputs container
              <Text style={styles.passTextContainer}>
                What is your First Name ?
              </Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  value={this.state.name}
                  onChange={(e) => {
                    // if (validatePassword(this.state.password)) {
                    //   this.setState({error: false});
                    // } else {
                    //   this.setState({error: true});
                    // }
                    this.setState({name: e.nativeEvent.text});
                  }}
                  placeholder={'Your First Name'}
                />
              </View> */}
              <View style={styles.inputsContainer}>
                <Text style={styles.passTextContainer}>
                  Enter your password
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    secureTextEntry={this.state.isEye}
                    style={styles.authInputs}
                    value={this.state.password}
                    onChange={(e) => {
                      // if (validatePassword(this.state.password)) {
                      //   this.setState({error: false});
                      // } else {
                      //   this.setState({error: true});
                      // }
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
                {this.state.error == true && (
                  <Text
                    style={{
                      paddingTop: wp(2),
                      color: colors.error,
                      fontSize: wp(3),
                    }}>
                    Enter your valid password..
                  </Text>
                )}
              </View>

              {/* {this.state.error && ( */}
              <View style={{marginTop: wp(3)}}>
                <Text style={[styles.dontHaveAccount]}>
                  Password must contain atleast 8 characters
                </Text>
                <Text style={[styles.dontHaveAccount]}>
                  and must include numbers and special{' '}
                </Text>
                <Text style={[styles.dontHaveAccount]}>character</Text>
              </View>
              {/* )} */}

              <View style={[styles.inputsContainer, {marginTop: wp(3)}]}>
                <Text style={styles.passTextContainer}>
                  Confirm your password
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    secureTextEntry={this.state.isEye}
                    style={styles.authInputs}
                    value={this.state.passMatchText}
                    onChange={(e) => {
                      if (this.state.password == e.nativeEvent.text) {
                        this.setState({passMachErr: false});
                      } else {
                        this.setState({passMachErr: true});
                      }
                      this.setState({passMatchText: e.nativeEvent.text});
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
                {this.state.passMachErr == true && (
                  <Text
                    style={{
                      paddingTop: wp(2),
                      color: colors.error,
                      fontSize: wp(3),
                    }}>
                    Your password is not matched
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => this.setupPass()}
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
              <LottieView
                autoPlay={true}
                style={{width: wp(90)}}
                source={animation.loading}
                loop={true}
              />
            </View>
          )}
          {this.state.contentPopup !== '' && (
            <View
              style={{
                backgroundColor: colors.secondary,
                borderRadius: wp(4),
                justifyContent: 'center',
              }}>
              <Text>{this.state.contentPopup}</Text>
            </View>
          )}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
