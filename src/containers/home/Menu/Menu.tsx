import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
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

import {RouteProp, CommonActions} from '@react-navigation/native';
import {colors, images, GlStyles, fonts} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import {createApi as api, createApi} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';

import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
import {getCurrentOrganization, getCurrentProject} from '@utils/utils';
// import {validateEmail} from '@utils/';
type MenuNavigationProp = StackNavigationProp<StackNavigatorProps, 'Menu'>;
type MenuRouteProp = RouteProp<StackNavigatorProps, 'Menu'>;

export interface MenuProps {
  navigation: MenuNavigationProp;
  route: MenuRouteProp;
  reduxActions: any;
  reduxState: any;
}

class Menu extends React.Component<MenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      // Error State
      errorModal: false,
      orgError: false,
      org: '',
      orgDetails: '',
      projectLeader: '',
      peoplesText: '',
      organizationSugg: [],
      organizations: [],
      currOrganizations: {},
      peoples: [], // must be array of id's
      projects: [],
    };
  }

  Menu = () => {};
  componentDidMount() {
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((res: any) => {
          console.log(res.data.data.organizations);
          this.setState({organizations: res.data.data.organizations});
          getCurrentOrganization().then((orgId) => {
            this.setState({
              currOrganization: res.data.data.organizations.filter(
                (d) => d._id == orgId,
              )[0].name,
            });
          });
        });
    });
  }
  changeOrganizationName = (e: any) => {
    var strArr = [];
    for (var j = 0; j < this.state.organizations.length; j++) {
      if (this.state.organizations[j].name.toLowerCase().match(e)) {
        strArr.push(this.state.organizations[j]);
      }
    }
    this.setState({organizationSugg: strArr});
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>sdsd</Text> */}
        <View style={styles.createNewpopcontaienr}>
          {/* Create New sor */}
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                //   this.setState({createModal: false});
                // this.props.navigation.navigate('CreateSOR');

                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: 'CreateSOR',
                      },
                    ],
                  }),
                );
              }}
              style={styles.containerOfIcon}>
              <View style={styles.newsorContainer}>
                <Image source={images.bottomTab.note} style={GlStyles.images} />
              </View>

              <Text style={styles.createNewText}>New SOR</Text>
            </TouchableOpacity>

            <Icon
              onPress={() => this.props.navigation.goBack()}
              containerStyle={{marginLeft: wp(2)}}
              name={'cross'}
              type={'entypo'}
              size={wp(4.6)}
              iconStyle={{opacity: 0.5}}
            />
          </View>
          {/* create organization */}
          {/* <TouchableOpacity
            onPress={() => {
              //   this.setState({createModal: xfalse});
              this.props.navigation.navigate('CreateOrganization');
            }}
            style={styles.containerOfIcon}>
            <View style={styles.auditAndReportContainer}>
              <Image
                source={images.homeIcon.auditAndReporting}
                style={GlStyles.images}
              />
            </View>
            <Text style={styles.auditReportText}>Create Organization</Text>
          </TouchableOpacity> */}
          {/* Create project */}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('createProject');
              //   this.setState({createModal: false});
            }}
            style={styles.containerOfIcon}>
            <View style={styles.incidentContaineR}>
              <Image
                source={images.homeIcon.incidentreporting}
                style={GlStyles.images}
              />
            </View>
            <Text style={styles.auditReportText}>Create Project</Text>
          </TouchableOpacity>
          {/* invite user */}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('InvitePeople');
              //   this.setState({createModal: false});
            }}
            style={styles.containerOfIcon}>
            <View style={styles.incidentContaineR}>
              {/* <Image
                source={images.homeIcon.incidentreporting}
                style={GlStyles.images}
              /> */}
              <Icon
                name="adduser"
                type="antdesign"
                color={colors.green}
                iconStyle={{fontWeight: 'bold'}}
              />
            </View>
            <Text style={styles.auditReportText}>Invite</Text>
          </TouchableOpacity>
          {/* line height */}
          <View
            style={{
              marginTop: wp(3),
              height: wp(1),
              backgroundColor: '#F6F6F6',
            }}
          />
          {/* Organization Selector */}
          <View style={{padding: wp(3)}}>
            <Text
              style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayMedium}}>
              Select your organization
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({organizationSugg: this.state.organizations});
              }}
              style={[styles.inputContainer]}>
              <TextInput
                editable={false}
                value={this.state.currOrganization}
                style={{
                  fontSize: wp(3),
                  width: wp(80),
                }}
                onChangeText={(e) => this.changeOrganizationName(e)}
                placeholder={'Enter name'}
              />

              <Icon
                containerStyle={{
                  position: 'absolute',
                  right: wp(5),
                  top: wp(5),
                }}
                name={'down'}
                type={'antdesign'}
                size={wp(3)}
                iconStyle={{opacity: 0.5}}
              />
            </TouchableOpacity>
            {/* Suggestions of organization */}
            {this.state.organizationSugg.length != 0 ? (
              <View>
                <View style={styles.involveSuggestCont}>
                  {this.state.organizationSugg.map((d: any, i: number) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        this.setState({
                          currOrganization: d.name,
                          organizationSugg: [],
                        });
                      }}
                      style={[
                        styles.involvePsuggCont,
                        this.state.organizationSugg.length == i + 1
                          ? {borderBottomWidth: wp(0)}
                          : null,
                      ]}>
                      <Icon
                        name={'stats-chart'}
                        type={'ionicon'}
                        iconStyle={{opacity: 0.5}}
                        size={wp(3)}
                        containerStyle={{marginRight: wp(3)}}
                      />
                      <View style={{alignItems: 'center'}}>
                        <Text
                          style={[
                            styles.involvePSt,
                            {fontSize: wp(3), opacity: 0.5},
                          ]}>
                          {d.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
