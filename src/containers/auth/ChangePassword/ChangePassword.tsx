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
import {loading} from '../../../store/actions/listSorActions';

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
      loading: false,
      name: '',
      passwordValid: false,
      isEyeOLD: true,
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
    AsyncStorage.getItem('email').then((value) => {
      this.setState({email: value});
    });
  }
  setupPass = async () => {
    if (
      this.state.oldPassword !== '' ||
      this.state.password !== '' ||
      this.state.passMatchText !== ''
    ) {
      if (this.state.password == this.state.passMatchText) {
        this.setState({loading: true});
        try {
          this.setState({loading: false});
          const user = await Auth.currentAuthenticatedUser();
          await Auth.changePassword(
            user,
            this.state.oldPassword,
            this.state.password,
          );
          this.setState({passwordValid: false});
          this.props.navigation.goBack();
        } catch (error) {
          this.setState({loading: false});
          this.setState({passwordValid: true});
        }
      }
    } else {
      this.setState({passMachErr: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View>
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
                  loading...
                </Text>
              </View>
            ) : (
              <View style={{marginTop: wp(5)}}>
                <View style={{marginBottom: wp(10)}}>
                  <Text style={styles.headingContainer}>Change Password</Text>
                  <Text style={styles.headingPra}>
                    You are changing password of{' '}
                    <Text style={styles.headingParaEmail}>
                      {this.state.email}
                    </Text>
                  </Text>
                </View>

                <Text style={styles.passTextContainer}>Old Password</Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    secureTextEntry={this.state.isEyeOLD}
                    style={styles.authInputs}
                    value={this.state.oldPassword}
                    onChangeText={(e) => {
                      if (validatePassword(e)) {
                        this.setState({oldPasswordError: false});
                      } else {
                        this.setState({oldPasswordError: true});
                      }
                      this.setState({oldPassword: e});
                    }}
                    placeholder={'Youtr old password'}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({isEyeOLD: !this.state.isEyeOLD})
                    }
                    style={styles.eyeIconContainer}>
                    {this.state.isEyeOLD == true ? (
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
                {this.state.oldPasswordError == true && (
                  <Text
                    style={{
                      paddingTop: wp(2),
                      color: colors.error,
                      fontSize: wp(3),
                    }}>
                    Enter your valid password..
                  </Text>
                )}
                <View style={styles.inputsContainer}>
                  <Text style={styles.passTextContainer}>
                    Enter your password
                  </Text>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      secureTextEntry={this.state.isEye}
                      style={styles.authInputs}
                      value={this.state.password}
                      onChangeText={(e) => {
                        if (validatePassword(e)) {
                          this.setState({error: false});
                        } else {
                          this.setState({error: true});
                        }
                        this.setState({password: e});
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

                {this.state.passwordValid == true && (
                  <Text
                    style={{
                      paddingTop: wp(2),
                      color: colors.error,
                      fontSize: wp(3),
                    }}>
                    Your old password is wrong.. ! please enter your valid
                    password
                  </Text>
                )}
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
            )}
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
