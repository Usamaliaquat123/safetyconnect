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
import {getCurrentOrganization} from '@utils/utils';
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
          this.setState({organizations: res.data.data.organizations});
        });
    });
  }
  changeOrganizationName = (e: any) => {};
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
            <View style={[styles.inputContainer]}>
              <TextInput
                onFocus={() =>
                  this.setState({organizationSugg: this.state.organizations})
                }
                // editable={this.state.noOrg}
                value={
                  this.state.noOrg == false
                    ? this.state.projectText
                    : "You don't have any organizations yet"
                }
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
            </View>
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
