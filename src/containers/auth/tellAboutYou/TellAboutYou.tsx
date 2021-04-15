import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View_sor, profileSetupSelections} from '@service';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps, route} from '@nav';
import {Avatar, Icon} from 'react-native-elements';
import {colors, images, GlStyles} from '@theme';
import {RouteProp} from '@react-navigation/native';
import {imagePicker, cameraCapture} from '@utils';
import {Storage} from 'aws-amplify';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import {animation} from '@theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
type TellAboutYouNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'tellAboutYou'
>;
type TellAboutYouRouteProp = RouteProp<StackNavigatorProps, 'tellAboutYou'>;

export interface TellAboutYouProps {
  navigation: TellAboutYouNavigationProp;
  route: TellAboutYouRouteProp;
  reduxActions: any;
  reduxState: any;
}

class TellAboutYou extends React.Component<TellAboutYouProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploadedImage: '',
      photoModal: false,
      selected: 0,
      photo: '',
      role: '',
      name: '',
      selectedIndustry: false,
      selectedDesignAndArchi: false,
      IndustrySelection: profileSetupSelections.IndustrySelection,
      DesignAndArchitecture: profileSetupSelections.DesignAndArchitecture,
      IndustrySelectionText: '',
      DesignAndArchitectureText: '',
      // Errors
      imageError: false,
      roleError: false,
      errorModal: false,
      nameError: false,
      laoding: false,

      password: '',
    };
  }

  componentDidMount = () => {};

  imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          if (res.didCancel == true) {
            this.setState({photoModal: false, uploadedImage: ''});
          } else {
            this.setState({photoModal: false, uploadedImage: res.uri});
          }
        })
        .catch((err) => {
          this.setState({photoModal: false, uploadedImage: ''});
        });
    } else {
      cameraCapture()
        .then((res: any) => {
          if (res.didCancel == true) {
            this.setState({photoModal: false, uploadedImage: ''});
          } else {
            this.setState({photoModal: false, uploadedImage: res.uri});
          }
        })
        .catch((err) => {
          this.setState({photoModal: false, uploadedImage: ''});
        });
    }
  };

  updateProfile = () => {
    if (this.state.name !== '') {
      if (this.state.role !== '') {
        this.setState({loading: true, errorModal: true});

        api
          .createApi()
          .createUser({
            name: this.state.name,  
            email: this.props.route.params.username,
            organization: [],
          })
          .then((res) => {
            if (res.status == 200) {
              api
                .createApi()
                .setUserInfo({
                  email: this.props.route.params.username,
                  role: this.state.role,
                  department: this.state.DesignAndArchitectureText,
                  industry: this.state.IndustrySelectionText,
                  img_url:
                    this.state.uploadedImage === ''
                      ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                      : this.state.uploadedImage,
                })
                .then((res) => {
                  this.setState({loading: false, errorModal: false});
                  AsyncStorage.setItem(
                    'email',
                    this.props.route.params.username,
                  );
                  AsyncStorage.setItem(
                    'photo',
                    this.state.uploadedImage === ''
                      ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                      : this.state.uploadedImage,
                  );
                  this.setState({loading: true});
                  if ((res.status = 200)) {
                    this.props.navigation.navigate('CreateOrg');
                  }
                });
            } else {
              this.setState({loading: false, errorModal: false});
            }
          })
          .catch((err) => {
            this.setState({loading: false, errorModal: false});
          });
      } else {
        this.setState({roleError: true, nameError: false});
      }

      // api.
    } else {
      this.setState({nameError: true});
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
              </View>
            ) : (
              <View style={{marginTop: wp(10)}}>
                <Text style={styles.headingContainer}>
                  Welcome to SafetyConnect
                </Text>
                <Text style={styles.headingPara}>
                  You are signed up as
                  <Text style={styles.headingParaEmail}>
                    {' '}
                    {this.props.route.params.username}
                  </Text>
                </Text>
                <View style={styles.inputsContainer}>
                  <Text style={[styles.emailTextContainer, {marginTop: wp(2)}]}>
                    What is your Full Name ?
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 0
                        ? {borderColor: colors.primary, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
                    <TextInput
                      onFocus={() => this.setState({selected: 0})}
                      underlineColorAndroid="transparent"
                      style={styles.selectText}
                      value={this.state.name}
                      onChange={(e) =>
                        this.setState({name: e.nativeEvent.text})
                      }
                      placeholder={'Your Full Name'}
                    />
                  </View>
                  {this.state.nameError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your name
                    </Text>
                  )}
                  {/*Industry selectionv   */}
                  <Text style={styles.emailTextContainer}>
                    Enter your new Password
                  </Text>

                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 2
                        ? {borderColor: colors.primary, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
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
                  </View>
                  <Text style={styles.passwordWarning}>
                    Password must contain at least 8 characters and must include
                    numbers and special character.
                  </Text>
                  {/*Deraprtment selectionv   */}
                  <Text style={styles.emailTextContainer}>
                    Confirm Your Password
                  </Text>

                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 3
                        ? {borderColor: colors.primary, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
                    <TextInput
                      onFocus={() => this.setState({selected: 3})}
                      underlineColorAndroid="transparent"
                      style={styles.selectText}
                      value={this.state.DesignAndArchitectureText}
                      onChange={(e) =>
                        this.setState({
                          DesignAndArchitectureText: e.nativeEvent.text,
                        })
                      }
                      placeholder={'department'}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => this.updateProfile()}
                  style={styles.siginBtnContainer}>
                  <Text style={styles.signinText}>Continue</Text>
                  <Icon
                    containerStyle={{marginLeft: wp(2)}}
                    size={wp(5)}
                    name="arrowright"
                    type="antdesign"
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* validations error */}
          {/* Modal Container */}
          {/* <Modal
            isVisible={this.state.errorModal}
            onBackdropPress={() =>
              this.setState({errorModal: false, loading: false})
            }>
            {this.state.loading == true && (
              <View>
                <ActivityIndicator color={colors.primary} size={'large'} />
              </View>
            )}
          </Modal> */}
          {/* Modal Container */}
          {/* <Modal
            isVisible={this.state.photoModal}
            onBackdropPress={() => this.setState({photoModal: false})}>
            <View
              style={{
                backgroundColor: colors.secondary,
                justifyContent: 'center',
                borderRadius: wp(8),
                padding: wp(10),
              }}>
              <TouchableOpacity
                onPress={() => this.imgCap('take')}
                style={[styles.takeaPhotoContainer, {marginTop: wp(1)}]}>
                <Icon
                  size={wp(5)}
                  name="camerao"
                  type="antdesign"
                  color={colors.text}
                />
                <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                  Take a photo
                </Text>
                <Icon
                  containerStyle={{position: 'absolute', right: wp(0)}}
                  size={wp(5)}
                  name="right"
                  type="antdesign"
                  color={colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.imgCap('upload')}
                style={styles.takeaPhotoContainer}>
                <Icon
                  size={wp(5)}
                  name="photo"
                  type="font-awesome"
                  color={colors.text}
                />
                <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                  Upload a photo
                </Text>
                <Icon
                  size={wp(5)}
                  name="right"
                  containerStyle={{position: 'absolute', right: wp(0)}}
                  type="antdesign"
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </Modal> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(TellAboutYou);
