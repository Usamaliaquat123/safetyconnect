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
import {colors, images, GlStyles} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
import {createApi as api, createApi} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';

import {AllSorDTO} from '@dtos';
import {getActiveChildNavigationOptions} from 'react-navigation';
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
      peoples: [], // must be array of id's
      projects: [],
    };
  }

  Menu = () => {};
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

          {/* Audit and Inspection */}
          <TouchableOpacity
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
          </TouchableOpacity>
          {/* Incident and Accident Report */}
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.getItem('organization').then((org: any) => {
                AsyncStorage.getItem('invitedUsersEmails').then(
                  (invitedEmails: any) => {
                    this.props.navigation.navigate('createProject', {
                      organization: org,
                      suggestedUsers: JSON.parse(invitedEmails),
                    });
                  },
                );
              });
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
