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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View_sor, profileSetupSelections} from '@service';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorProp, route} from '@nav';
import {Avatar, Icon} from 'react-native-elements';
import {colors, images, GlStyles} from '@theme';
import {RouteProp} from '@react-navigation/native';
import {imagePicker, cameraCapture} from '@utils';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import {animation} from '@theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
type TellAboutYouNavigationProp = StackNavigationProp<
  AuthNavigatorProp,
  'CreatePass'
>;
type TellAboutYouRouteProp = RouteProp<AuthNavigatorProp, 'CreatePass'>;

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
      IndustrySelectionText: profileSetupSelections.IndustrySelection[0].text,
      DesignAndArchitectureText:
        profileSetupSelections.DesignAndArchitecture[0].text,
      // Errors
      imageError: false,
      roleError: false,
      nameError: false,
      laoding: false,
    };
  }

  componentDidMount = () => {};

  imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          console.log(res);
          this.setState({photoModal: false, uploadedImage: res.uri});
        })
        .catch((err) => {
          this.setState({photoModal: false});
        });
    } else {
      cameraCapture()
        .then((res: any) => {
          console.log(res);
          this.setState({photoModal: false, uploadedImage: res.uri});
        })
        .catch((err) => {
          this.setState({photoModal: false});
        });
    }
  };

  updateProfile = () => {
    if (this.state.role !== ' ') {
      if (this.state.name !== ' ') {
        this.setState({loading: true});

        api
          .createApi()
          .createUser({
            name: this.state.name,
            email: this.props.route.params.username,
            organization: [],
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              api
                .createApi()
                .setUserInfo({
                  email: this.props.route.params.username,
                  role: this.state.role,
                  department: this.state.DesignAndArchitectureText,
                  industry: this.state.IndustrySelectionText,
                  img_url: this.state.photo,
                })
                .then((res) => {
                  AsyncStorage.setItem(
                    'email',
                    this.props.route.params.username,
                  );
                  this.setState({loading: true});
                  if ((res.status = 200)) {
                    this.props.navigation.navigate('CreateOrg');
                  }
                });
            } else {
              this.setState({loading: true});
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      } else {
        this.setState({nameError: true});
      }

      // api.
    } else {
      this.setState({roleError: true});
    }
  };

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
                <Text style={styles.headingContainer}>Tell about yourself</Text>
                {/* Photo Seclector  */}
                <TouchableOpacity style={styles.imageUploadContainer}>
                  {this.state.uploadedImage == '' ? (
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
                  {/* <Text style={styles.emailTextContainer}>Name÷÷</Text> */}
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
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({selected: 1, selectedIndustry: true})
                    }
                    style={[
                      styles.inputContainer,
                      this.state.selected == 1
                        ? {borderColor: colors.green}
                        : {borderColor: colors.textOpa},
                    ]}>
                    <Text style={styles.selectText}>
                      {this.state.IndustrySelectionText}
                    </Text>
                    <Icon
                      onPress={() => this.props.navigation.goBack()}
                      size={wp(5)}
                      containerStyle={{
                        position: 'absolute',
                        right: wp(3),
                        opacity: 0.5,
                      }}
                      name="down"
                      type="antdesign"
                      color={colors.text}
                    />
                  </TouchableOpacity>
                  {/* Industry selection */}
                  {this.state.selectedIndustry == true ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.IndustrySelection.map((d: any, i: number) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            this.setState({
                              IndustrySelectionText: d.text,
                              selectedIndustry: false,
                            })
                          }
                          style={[
                            styles.involvePsuggCont,
                            this.state.IndustrySelection.length == i + 1
                              ? {borderBottomWidth: wp(0)}
                              : null,
                          ]}>
                          <Text style={styles.involvePSt}>{d.text}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : null}
                  {/*Deraprtment selectionv   */}
                  <Text style={styles.emailTextContainer}>Department</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({selected: 2, selectedDesignAndArchi: true})
                    }
                    style={[
                      styles.inputContainer,
                      this.state.selected == 2
                        ? {borderColor: colors.green}
                        : {borderColor: colors.textOpa},
                    ]}>
                    <Text style={styles.selectText}>
                      {this.state.DesignAndArchitectureText}
                    </Text>
                    <Icon
                      onPress={() => this.props.navigation.goBack()}
                      size={wp(5)}
                      containerStyle={{
                        position: 'absolute',
                        right: wp(3),
                        opacity: 0.5,
                      }}
                      name="down"
                      type="antdesign"
                      color={colors.text}
                    />
                  </TouchableOpacity>
                  {/* design and architecture selection */}
                  {this.state.selectedDesignAndArchi == true ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.DesignAndArchitecture.map(
                        (d: any, i: number) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() =>
                              this.setState({
                                DesignAndArchitectureText: d.text,
                                selectedDesignAndArchi: false,
                              })
                            }
                            style={[
                              styles.involvePsuggCont,
                              this.state.IndustrySelection.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null,
                            ]}>
                            <Text style={styles.involvePSt}>{d.text}</Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  ) : null}

                  {/*job role selectionv   */}
                  <Text style={styles.emailTextContainer}>
                    What is your role in the organization ?
                  </Text>
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
