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
    };
  }

  componentDidMount = () => {
    // Storage.get('Screen Shot 2021-02-25 at 1.40.56 AM.png').then((res) => {
    //   this.setState({uploadedImage: res});
    // });
  };

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
          <View style={styles.header}>
            <View style={styles.headertle}>
              {/* <Icon
                containerStyle={{marginLeft: wp(2)}}
                onPress={() => this.props.navigation.goBack()}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              /> */}
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
                <Text style={styles.headingContainer}>Tell about yourself</Text>
                {/* Photo Seclector  */}
                <TouchableOpacity style={styles.imageUploadContainer}>
                  {this.state.uploadedImage === '' ? (
                    <TouchableOpacity
                      onPress={() => this.setState({photoModal: true})}
                      style={styles.imagenotUpoad}>
                      <View style={styles.imagenotuploadContainer}>
                        <Icon
                          size={wp(13)}
                          containerStyle={{opacity: 0.5}}
                          name="camera"
                          type="evilicon"
                          color={colors.text}
                        />
                        <Text style={styles.uploadPicText}>Upload</Text>
                        <Text style={styles.uploadPicText}>Picture</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => this.setState({photoModal: true})}
                      style={styles.avatarPencil}>
                      <View
                        style={{position: 'absolute', zIndex: 1, right: wp(5)}}>
                        <View
                          style={{
                            backgroundColor: colors.green,
                            borderRadius: wp(10),
                            padding: wp(2),
                            zIndex: 1,
                          }}>
                          <Icon
                            size={wp(4)}
                            containerStyle={{opacity: 0.5}}
                            name="pencil"
                            type="font-awesome"
                            color={colors.secondary}
                          />
                        </View>
                      </View>

                      <Avatar
                        size={'xlarge'}
                        rounded
                        source={{
                          uri: this.state.uploadedImage,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
                <View style={styles.inputsContainer}>
                  <Text style={[styles.emailTextContainer, {marginTop: wp(2)}]}>
                    Name
                    <Text
                      style={{
                        fontSize: wp(3),
                        color: colors.error,
                      }}>
                      *
                    </Text>
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 0
                        ? {borderColor: colors.green, padding: wp(0)}
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
                      placeholder={'First Name'}
                    />
                  </View>
                  {this.state.nameError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter your name
                    </Text>
                  )}
                  {/*Industry selectionv   */}
                  <Text style={styles.emailTextContainer}>Industry</Text>

                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 2
                        ? {borderColor: colors.green, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
                    <TextInput
                      onFocus={() => this.setState({selected: 2})}
                      underlineColorAndroid="transparent"
                      style={styles.selectText}
                      value={this.state.IndustrySelectionText}
                      onChange={(e) =>
                        this.setState({
                          IndustrySelectionText: e.nativeEvent.text,
                        })
                      }
                      placeholder={'Industry Type'}
                    />
                  </View>

                  {/*Deraprtment selectionv   */}
                  <Text style={styles.emailTextContainer}>Department</Text>

                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 3
                        ? {borderColor: colors.green, padding: wp(0)}
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

                  {/*job role selectionv   */}
                  <Text style={styles.emailTextContainer}>
                    What is your role in the organization
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      *
                    </Text>{' '}
                    ?
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      this.state.selected == 4
                        ? {borderColor: colors.green, padding: wp(0)}
                        : {
                            borderColor: colors.textOpa,
                            padding: wp(0),
                          },
                    ]}>
                    <TextInput
                      onFocus={() => this.setState({selected: 4})}
                      underlineColorAndroid="transparent"
                      style={styles.selectText}
                      value={this.state.role}
                      onChange={(e) =>
                        this.setState({role: e.nativeEvent.text})
                      }
                      placeholder={'Design and Architecture'}
                    />
                  </View>
                  {this.state.roleError && (
                    <Text style={{color: colors.error, fontSize: wp(3)}}>
                      * Enter you role in the organization
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => this.updateProfile()}
                  style={styles.siginBtnContainer}>
                  <Text style={styles.signinText}>Continue</Text>
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
          <Modal
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
          </Modal>
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
