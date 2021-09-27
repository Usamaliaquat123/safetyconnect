import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CommonActions} from '@react-navigation/native';
import {StackNavigatorProps} from '@nav';
import {Icon, Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '@actions';
import {AllSorDTO} from '@dtos';
import {
  imagePicker,
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
const industries = [
  ' Oil & Gas	',
  'Mining & Quarrying',
  ' Petrochemicals & Polymers	',
  'Construction',
  'Power Generation & Distribution',
  'Transportation & Logistics	',
  'Health Care & Pharmacuticals',
  'Telecommunication & IT	',
  'FMCG & Manufacturing',
  'Aviation',
  'Shipping & Automobiles',
  'Others (Please Specify)',
];

const yourRole = ['Top Management', 'Line Management', 'Craft/Trade Employee'];

var selectedRole = [];
const topManagementData = [
  'CEO',
  'Director',
  'General Manager',
  'Corporate Manager	',
  'Advisor',
  'Executive',
  'Other',
];

const lineManagementData = [
  'Manager',
  'Depty Manager',
  'Assistant Manager',
  'Superintendent',
  'Engineer',
  'Associate Engineer',
  'Supervisor',
];

const craftTradeEmployeeData = [
  'Foreman',
  'Technician',
  'Skilled Worker',
  'Labor',
];

class Settings extends React.Component<SettingsProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      email: '',
      department: '',
      industry: '',
      arrayOfYourRole: [],
      arrayofDepartment: [],
      arrayofIndustry: [],
      role: '',
      img_url: '',

      type: '',
      profileupload: false,
      loading: false,
    };
  }

  componentDidMount() {
    console.log('this.props.route.params.data');
    console.log(this.props.route.params.data);
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
          name: this.state.username,
          role: this.state.role,
          department: this.state.department,
          industry: this.state.industry,
          img_url:
            this.state.type !== ' '
              ? this.state.img_url
              : this.props.route.params.data.img_url,
        };

        console.log(data);

        api
          .createApi()
          .setUserInfo(data)
          .then((res: any) => {
            this.props.navigation.goBack();
            // this.props.navigation.dispatch(
            //   CommonActions.reset({
            //     index: 1,
            //     routes: [
            //       {
            //         name: 'Home',
            //       },
            //     ],
            //   }),
            // );
            this.setState({loading: false});
            // this.props.navigation.goBack();
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

            this.setState({fileLoading: true});

            profileUploader(res.type, res.type.split('/')[1], res.base64)
              .then((uploadUri: any) => {
                this.setState({fileLoading: false});
                this.setState({img_url: uploadUri[0]});
                console.log('uploaded image');
                console.log(uploadUri[0]);
                // this.setState({uploadedImage:});
              })
              .catch((err) => console.log(err));

            console.log(data);
            this.setState({});

            console.log(res);
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
            {this.state.loading == true ? (
              <View style={styles.lottiefilesLoading}>
                <LottieView
                  // ref={(animation) => {
                  //   this.photoAnim = animation;
                  // }}
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
                <Text style={styles.loadingtext}>loading...</Text>
              </View>
            ) : (
              <>
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
                  onPress={() => {
                    this.imgCap('upload');
                  }}
                  style={{width: wp(50), alignSelf: 'center'}}>
                  {this.state.fileLoading ? (
                    <LottieView
                      autoPlay={true}
                      style={{width: wp(20), alignSelf: 'center'}}
                      source={animation.profileimage}
                      loop={true}
                    />
                  ) : (
                    <Avatar
                      containerStyle={{alignSelf: 'center', marginTop: wp(3)}}
                      size={wp(30)}
                      rounded
                      source={{
                        uri:
                          this.state.img_url === ' '
                            ? 'https://via.placeholder.com/150'
                            : this.state.img_url,
                      }}
                    />
                  )}
                  <View
                    style={{
                      backgroundColor: colors.green,
                      width: wp(8),
                      padding: wp(2.2),
                      right: wp(10),
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
                        onFocus={() => {
                          this.setState({
                            arrayofIndustry: suggestInActionsRecommendations(
                              '',
                              industries,
                            ),
                          });
                        }}
                        onChangeText={(e) => {
                          if (e !== '') {
                            this.setState({
                              arrayofIndustry: suggestInActionsRecommendations(
                                e.toLowerCase(),
                                industries,
                              ),
                            });
                          } else {
                            this.setState({arrayofIndustry: []});
                          }
                          this.setState({industry: e});
                        }}
                        placeholder={'Industry'}
                      />
                      <TouchableOpacity
                        style={{
                          // marginRight: wp(),
                          // paddingRight: wp(6),
                          width: wp(10),
                          position: 'absolute',
                          right: 0,
                          height: wp(10),
                          justifyContent: 'center',
                          // alignSelf: 'center',
                        }}
                        onPress={() => {
                          if (this.state.arrayofIndustry.length == 0) {
                            this.setState({arrayofIndustry: industries});
                          } else {
                            this.setState({arrayofIndustry: []});
                          }
                        }}>
                        <Icon
                          // containerStyle={{marginRight: wp(8)}}
                          name={'down'}
                          type={'antdesign'}
                          size={wp(3)}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                    {this.state.arrayofIndustry.length != 0 ? (
                      <View style={styles.involveSuggestCont}>
                        {this.state.arrayofIndustry.map(
                          (d: string, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                this.setState({
                                  industry: d,
                                  arrayofIndustry: [],
                                });
                              }}
                              style={[
                                styles.involvePsuggCont,
                                this.state.arrayofIndustry.length == i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d}</Text>
                            </TouchableOpacity>
                          ),
                        )}
                      </View>
                    ) : null}
                  </View>

                  {/* Your Type of role */}
                  <View>
                    <Text
                      style={{
                        fontSize: wp(3.2),
                        marginTop: wp(3),
                        fontFamily: fonts.SFuiDisplaySemiBold,
                      }}>
                      Type of Role
                    </Text>
                    <View style={[styles.inputContainer]}>
                      <TextInput
                        style={styles.authInputs}
                        onFocus={() => {
                          this.setState({
                            arrayofDepartment: suggestInActionsRecommendations(
                              '',
                              yourRole,
                            ),
                          });
                        }}
                        value={this.state.department}
                        onChangeText={(e) => {
                          if (e !== '') {
                            this.setState({
                              arrayofDepartment: suggestInActionsRecommendations(
                                e.toLowerCase(),
                                yourRole,
                              ),
                            });
                          } else {
                            this.setState({arrayofDepartment: []});
                          }
                          this.setState({department: e});
                        }}
                        placeholder={'Department'}
                      />
                      <TouchableOpacity
                        style={{
                          // marginRight: wp(),
                          // paddingRight: wp(6),
                          width: wp(10),
                          height: wp(10),
                          justifyContent: 'center',
                          // alignSelf: 'center',
                          position: 'absolute',
                          right: 0,
                        }}
                        onPress={() => {
                          if (this.state.arrayofDepartment.length == 0) {
                            // if()

                            this.setState({arrayofDepartment: yourRole});
                          } else {
                            this.setState({arrayofDepartment: []});
                          }
                        }}>
                        <Icon
                          // containerStyle={{marginRight: wp(8)}}
                          name={'down'}
                          type={'antdesign'}
                          size={wp(3)}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>

                    {this.state.arrayofDepartment.length != 0 ? (
                      <View style={styles.involveSuggestCont}>
                        {this.state.arrayofDepartment.map(
                          (d: string, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                this.setState({
                                  department: d,
                                  arrayofDepartment: [],
                                });

                                // console.log(d);
                                if (d == 'Top Management') {
                                  selectedRole = topManagementData;
                                  // this.setState({
                                  // });
                                } else if (d == 'Line Management') {
                                  selectedRole = lineManagementData;
                                  // this.setState({
                                  // });
                                } else if (d == 'Craft/Trade Employee') {
                                  selectedRole = craftTradeEmployeeData;
                                  // this.setState({
                                  // });
                                } else {
                                  selectedRole = topManagementData;
                                  // this.setState({
                                  // });
                                }
                              }}
                              style={[
                                styles.involvePsuggCont,
                                this.state.arrayofDepartment.length == i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d}</Text>
                            </TouchableOpacity>
                          ),
                        )}
                      </View>
                    ) : null}
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
                        onFocus={() => {
                          this.setState({
                            arrayOfYourRole: selectedRole,
                          });
                        }}
                        style={styles.authInputs}
                        value={this.state.role}
                        onChangeText={(e) => {
                          if (e !== '') {
                            this.setState({
                              arrayOfYourRole: suggestInActionsRecommendations(
                                e.toLowerCase(),
                                selectedRole,
                              ),
                            });
                          } else {
                            this.setState({arrayOfYourRole: []});
                          }
                          this.setState({role: e});
                          this.setState({role: e});
                        }}
                        placeholder={'Role'}
                      />
                      <TouchableOpacity
                        style={{
                          // marginRight: wp(),
                          // paddingRight: wp(6),
                          width: wp(10),
                          height: wp(10),
                          position: 'absolute',
                          right: 0,
                          justifyContent: 'center',
                          // alignSelf: 'center',
                        }}
                        onPress={() => {
                          if (this.state.arrayOfYourRole.length == 0) {
                            this.setState({arrayOfYourRole: selectedRole});
                          } else {
                            this.setState({arrayOfYourRole: []});
                          }
                        }}>
                        <Icon
                          // containerStyle={{marginRight: wp(8)}}
                          name={'down'}
                          type={'antdesign'}
                          size={wp(3)}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>

                    {this.state.arrayOfYourRole.length != 0 ? (
                      <View style={styles.involveSuggestCont}>
                        {this.state.arrayOfYourRole.map(
                          (d: string, i: number) => (
                            <TouchableOpacity
                              key={i}
                              onPress={() => {
                                this.setState({
                                  role: d,
                                  arrayOfYourRole: [],
                                });
                              }}
                              style={[
                                styles.involvePsuggCont,
                                this.state.arrayOfYourRole.length == i + 1
                                  ? {borderBottomWidth: wp(0)}
                                  : null,
                              ]}>
                              <Text style={styles.involvePSt}>{d}</Text>
                            </TouchableOpacity>
                          ),
                        )}
                      </View>
                    ) : null}
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
              </>
            )}
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

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
