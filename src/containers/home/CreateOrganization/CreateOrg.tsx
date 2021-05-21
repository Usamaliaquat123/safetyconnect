import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as reduxActions from '../../../store/actions/listSorActions';

import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';

import {RouteProp} from '@react-navigation/native';
import {colors, images, GlStyles} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import {createApi as api} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';

import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
// import {validateEmail} from '@utils/';
type CreateOrgNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Login'
>;
type CreateOrgRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface CreateOrgProps {
  navigation: CreateOrgNavigationProp;
  route: CreateOrgRouteProp;
  reduxActions: any;
  reduxState: any;
}

class CreateOrg extends React.Component<CreateOrgProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      // Error State
      errorModal: false,
      orgError: false,
      orgDescError: false,
      org: '',
      orgDetails: '',
      projectLeader: '',
      peoplesText: '',
      peoples: [], // must be array of id's
      projects: [],
    };
  }

  createOrg = () => {
    if (this.state.org !== '') {
      this.setState({loading: true, errorModal: true});

      AsyncStorage.getItem('email')
        .then((email: any) => {
          // this.props.navigation.navigate('CreateProj', {}
          // var org = {
          //   created_by: email,
          //   name: this.state.org,
          //   details: 'details of the organizations',
          //   members: [],
          //   projects: [],
          // };
          // this.props.reduxActions.createOrganization(org);

          api
            .createApi()
            .organization({
              created_by: email,
              name: this.state.org,
              details: 'ad',
              members: [],
              projects: [],
            })
            .then((res: any) => {
              if (res.status == 200) {
                this.setState({loading: false, errorModal: false});
                this.props.navigation.navigate('CreateProj', {
                  organization: res.data.data.organization_id,
                });
              } else {
                this.setState({loading: false, errorModal: false});
              }
            })
            .catch((err) => {
              this.setState({loading: false, errorModal: false});
            });
        })
        .catch((err) => {
          this.setState({loading: true, errorModal: true});
        });
    } else {
      this.setState({loading: false});
      this.setState({orgError: true});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Create organization</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View> */}
          {/* content */}
          <View style={styles.content}>
            {/* {this.state.loading ? (
              <View>
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
              </View>
            ) : ( */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.headingContainer}>
                  Add New Organization
                </Text>
                <Icon
                  onPress={() => this.props.navigation.goBack()}
                  containerStyle={{marginLeft: wp(2)}}
                  name={'cross'}
                  type={'entypo'}
                  size={wp(4.6)}
                  iconStyle={{opacity: 0.5}}
                />
              </View>
              {/* inputs container */}
              <View style={styles.inputsContainer}>
                {/* Email Container */}
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.emailTextContainer}>
                      Organization Name
                    </Text>
                    <Text
                      style={[
                        styles.emailTextContainer,
                        {opacity: 0.5, marginLeft: wp(3)},
                      ]}>
                      (Mandatory)
                    </Text>
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.org}
                      style={styles.authInputs}
                      onChangeText={(e) => this.setState({org: e})}
                      placeholder={'Enter Organization Name'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type your organization name
                    </Text>
                  )}
                </View>

                {/* Organization Description */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>
                      Organization Description
                    </Text>
                    <Text
                      style={[
                        styles.emailTextContainer,
                        {opacity: 0.5, marginLeft: wp(3)},
                      ]}>
                      (Mandatory)
                    </Text>
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.orgDetails}
                      style={styles.authInputs}
                      onChangeText={(e) => this.setState({orgDetails: e})}
                      placeholder={'Enter Organization description here'}
                    />
                  </View>
                  {this.state.orgDescError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Type your organization description
                    </Text>
                  )}
                </View>

                {/* People */}
                <View>
                  <View style={{flexDirection: 'row', marginTop: wp(3)}}>
                    <Text style={styles.emailTextContainer}>People</Text>
                    <Icon
                      containerStyle={{marginTop: wp(1), marginLeft: wp(2)}}
                      name={'info'}
                      type={'feather'}
                      size={wp(3)}
                      iconStyle={{opacity: 0.5}}
                    />
                  </View>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.peoplesText}
                      style={styles.authInputs}
                      onChangeText={(e) => this.setState({peoplesText: e})}
                      placeholder={'Enter name or add email'}
                    />
                  </View>
                  {this.state.orgError && (
                    <Text style={{fontSize: wp(3), color: colors.error}}>
                      Add people to the organization
                    </Text>
                  )}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.createOrg()}
                style={styles.siginBtnContainer}>
                <Text style={styles.signinText}>Create Organization</Text>
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
              <ActivityIndicator color={colors.primary} size={'large'} />
            </View>
          )}
        </Modal>
      </View>
    );
  }
}

// const mapStateToProps = (state: any) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {};
// };

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrg);
