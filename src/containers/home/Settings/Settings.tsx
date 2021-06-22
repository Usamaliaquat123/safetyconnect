import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Buffer} from 'buffer';
import {connect} from 'react-redux';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CommonActions} from '@react-navigation/native';
import {StackNavigatorProps} from '@nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import RNFetchBlob from 'rn-fetch-blob';

import {
  imagePicker,
  cameraCapture,
  profileUploader,
  suggestInActionsRecommendations,
} from '@utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts, animation, images} from '@theme';
import api from '@service/api';
export interface SettingsProps {
  route: MoreRouteProp;
  navigation: MoreNavigationProp;
  reduxActions: any;
  reduxState: any;
}

type MoreNavigationProp = StackNavigationProp<StackNavigatorProps, 'Settings'>;
type MoreRouteProp = RouteProp<StackNavigatorProps, 'Settings'>;

class Settings extends React.Component<SettingsProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      email: '',
      department: '',
      industry: '',
      role: '',
      img_url: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      username: this.props.route.params.data.name,
      email: this.props.route.params.data.email,
      role: this.props.route.params.data.role,
      department: this.props.route.params.data.department,
      industry: this.props.route.params.data.industry,
      img_url: this.props.route.params.data.img_url,
    });

  }

  updateUser = () => {
    if (this.state.username !== ' ') {
      if (this.state.role !== ' ') {
        this.setState({loading: true});
        var data = {
          email: this.state.email,
          role: this.state.role,
          department: this.state.department,
          industry: this.state.industry,
          img_url: this.state.uploadedImage === "" ? this.state.uploadedImage: this.props.route.params.data.img_url
        };
        api
          .createApi()
          .setUserInfo(data)
          .then((res: any) => {
            this.setState({loading: false});
            this.props.navigation.goBack();
          })
          .catch((err) => {
            console.log(err);
            this.setState({loading: false});
          });
      }
    }
  };

  imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          console.log(res);
          if (res.didCancel == true) {
            this.setState({photoModal: false, uploadedImage: ''});
          } else {
            console.log();

            // RNFS.readFile(res.uri).then((file) => console.log(file));

            var data = {
              bucket: 'hns-codist',
              report: 'old',
              fileType: [res.type],
              ext: [res.type.split('/')[1]],
            };


            this.setState( {img_url : res.uri })

            profileUploader(res.type, res.type.split('/')[1], res.base64)
              .then((uploadUri : any) => {

                this.setState({ uploadedImage : uploadUri[0] })
              })
              .catch((err) => console.log(err));

            console.log(data);
            this.setState({});

            console.log(res);
            // this.setState({
            //   photoModal: false,
            //   uploadedImage: res.uri,
            //   photofileType: res.type,
            //   fileType: res.type.split('/')[1],
            // });
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
            this.setState({
              photoModal: false,
              uploadedImage: res.uri,
              photofileType: res.type,
              fileType: res.type.split('/')[1],
            });
          }
        })
        .catch((err) => {
          this.setState({photoModal: false, uploadedImage: ''});
        });
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name={'arrowleft'}
                  type={'antdesign'}
                  size={wp(5)}
                  color={colors.secondary}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>Profile</Text>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <Text
              style={{
                fontSize: wp(4),
                fontFamily: fonts.SFuiDisplayBold,
                textAlign: 'center',
                marginTop: wp(3),
                color: colors.primary,
              }}>
              {' '}
              Edit Your Profile
            </Text>

            <TouchableOpacity
              onPress={() => this.imgCap('upload')}
              style={{width: wp(50), alignSelf: 'center'}}>
              <Avatar
                containerStyle={{alignSelf: 'center', marginTop: wp(3)}}
                size={wp(30)}
                rounded
                source={{
                  uri:
                    this.state.img_url === ' '
                    ? 'https://via.placeholder.com/150'
                      : this.state.img_url
                }}
              />

              <View
                style={{
                  backgroundColor: colors.green,
                  width: wp(8),
                  padding: wp(2.2),
                  right: wp(7),
                  top: wp(5),
                  position: 'absolute',
                  borderRadius: wp(10),
                }}>
                <Icon
                  name={'pencil'}
                  type={'entypo'}
                  size={wp(3.5)}
                  color={colors.secondary}
                />
              </View>
            </TouchableOpacity>
            <View style={{marginTop: wp(5)}}>
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Full Name
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.username}
                    onChangeText={(e) => {
                      this.setState({username: e});
                    }}
                    placeholder={'Your Full Name'}
                  />
                </View>
              </View>

              {/* Email Address */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Email Address
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    editable={false}
                    style={styles.authInputs}
                    value={this.state.email}
                    onChangeText={(e) => {
                      this.setState({email: e});
                    }}
                    placeholder={'johndoe@email.com'}
                  />
                </View>
              </View>
              {/* Your Role */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Your Role
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.role}
                    onChangeText={(e) => {
                      this.setState({role: e});
                    }}
                    placeholder={'Role'}
                  />
                </View>
              </View>
              {/* Your Department */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Your Department
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.department}
                    onChangeText={(e) => {
                      this.setState({department: e});
                    }}
                    placeholder={'Department'}
                  />
                </View>
              </View>
              {/* Your Industry */}
              <View>
                <Text
                  style={{
                    fontSize: wp(3.2),
                    marginTop: wp(3),
                    fontFamily: fonts.SFuiDisplaySemiBold,
                  }}>
                  Your Industry
                </Text>
                <View style={[styles.inputContainer]}>
                  <TextInput
                    style={styles.authInputs}
                    value={this.state.industry}
                    onChangeText={(e) => {
                      this.setState({industry: e});
                    }}
                    placeholder={'Industry'}
                  />
                </View>
              </View>
              {/* Save  */}

              <TouchableOpacity
                // this.setState({repeatedSorModal: true})
                onPress={() => this.updateUser()}
                style={[
                  styles.submitsorbtnSb,
                  // {backgroundColor: colors.green},
                ]}>
                <Text style={[styles.submitsorbtnSbtxt]}>Update </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Modal Container */}
        <Modal isVisible={this.state.loading}>
          {this.state.loading == true ? (
            <View>
              <View style={{alignSelf: 'center'}}>
                <LottieView
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
              </View>
            </View>
          ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
