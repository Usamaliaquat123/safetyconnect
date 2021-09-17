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
import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {
  validatePassword,
  savedCurrentOrganization,
  savedCurrentProject,
} from '@utils';
import {colors, images, GlStyles} from '@theme';
import {RouteProp, ThemeProvider} from '@react-navigation/native';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import {animation, fonts} from '@theme';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreatePassNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'CreatePass'
>;
type CreatePassRouteProp = RouteProp<StackNavigatorProps, 'CreatePass'>;

export interface CreatePassProps {
  navigation: CreatePassNavigationProp;
  route: CreatePassRouteProp;
  reduxActions: any;
  reduxState: any;
  // username: string;
}

class CreatePass extends React.Component<CreatePassProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: '',
      isEyeConfirm: true,
      error: false,
      isEye: true,
      contentPopup: '',
      passMachErr: false,
      errorModal: false,
      passMatchText: '',
      loading: true,
      organizations: [],
      projects: [],
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
  componentDidMount() {
    if (this.props.route.params.invited != undefined) {
      this.setState({
        organizations: this.props.route.params.invited.organization,
        projects: this.props.route.params.invited.project,
      });
      savedCurrentOrganization(this.props.route.params.invited.organization);
      savedCurrentProject(this.props.route.params.invited.project);
    }
  }

  setupPass = async () => {
    console.log(this.state.password);
    console.log(this.state.code);
    console.log(this.state.email);
    if (this.state.name !== ' ') {
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
              this.props.route.params.email, // dynamic link
              this.props.route.params.code, // dynamic link
              this.state.password, //password new
            )
              .then((res) => {
                console.log(res);
                Auth.signIn(
                  this.props.route.params.email, // dynal=mic link
                  this.state.password,
                ).then((res) => {
                  this.setState({loading: false, errorModal: false});
                  console.log('with in signin functions');
                  console.log(res);
                  console.log('with in signin functions');
                  api
                    .createApi()
                    .createUser({
                      name: this.state.name,
                      email: this.props.route.params.email, // dynal=mic link
                      organization: this.state.organizations,
                      img_url:
                        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                    })
                    .then((res) => {
                      console.log('with in create user function');
                      console.log(res);
                      console.log('with in create user function');
                      if (res.status == 200) {
                        this.props.navigation.navigate('TellAboutYou', {
                          username: this.props.route.params.email,
                        });
                        this.setState({loading: false, errorModal: false});
                      } else {
                        this.setState({loading: false, errorModal: false});
                      }
                    })

                    .catch((err) => {
                      console.log('with in create user apo');
                      console.log(err);
                      console.log('with in create user apo');
                    });
                });
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
    } else {
      this.setState({error: true, loading: false});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View>
            <View style={{marginTop: wp(5)}}>
              <View style={{marginBottom: wp(10)}}>
                <Text style={styles.headingContainer}>
                  Welcome to SafetyConnect
                </Text>
                <Text style={styles.headingPra}>
                  You are signing up as{' '}
                  <Text style={styles.headingParaEmail}>
                    {this.props.route.params.email}
                  </Text>
                </Text>
              </View>

              {/* inputs container */}
              <Text style={styles.passTextContainer}>Enter your full Name</Text>
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
              </View>
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
                  and must include number, special character and one capital
                  letter{' '}
                </Text>
              </View>
              {/* )} */}

              <View style={styles.inputsContainer}>
                <Text style={styles.passTextContainer}>
                  Confirm your password
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    secureTextEntry={this.state.isEyeConfirm}
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
                    onPress={() =>
                      this.setState({isEyeConfirm: !this.state.isEyeConfirm})
                    }
                    style={styles.eyeIconContainer}>
                    {this.state.isEyeConfirm == true ? (
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
            <View style={{alignSelf: 'center'}}>
              <LottieView
                autoPlay={true}
                style={{width: wp(90)}}
                source={animation.loading}
                loop={true}
              />
            </View>
          )}
          {this.state.contentPopup !== '' && (
            <View>
              <View
                style={{
                  backgroundColor: colors.secondary,
                  borderRadius: wp(3),
                  padding: wp(5),
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Icon
                    name={'warning'}
                    type={'entypo'}
                    size={wp(8)}
                    color={colors.error}
                  />
                  <Text
                    style={{
                      marginTop: wp(1),
                      fontSize: wp(4),
                      fontFamily: fonts.SFuiDisplaySemiBold,
                      color: colors.error,
                    }}>
                    Your session is expired
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: wp(4),

                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                    textAlign: 'center',
                    color: colors.text,
                  }}>
                  You have to resend the email...
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Auth.forgotPassword(this.props.route.params.email).then(
                      () => {
                        this.props.navigation.navigate('Verify', {
                          email: this.props.route.params.email,
                        });
                      },
                    );
                  }}
                  style={{
                    padding: wp(4),
                    backgroundColor: colors.primary,
                    borderRadius: wp(3),
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: wp(5),
                    width: wp(50),
                  }}>
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      marginLeft: wp(7),
                      fontFamily: fonts.SFuiDisplaySemiBold,
                      color: colors.secondary,
                    }}>
                    Resend Email
                  </Text>
                  <Icon
                    name={'redo'}
                    type={'evilicon'}
                    size={wp(7)}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePass);
