import React, {useState, useEffect} from 'react';
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
import {
  getCurrentOrganization,
  getCurrentProject,
  savedCurrentOrganization,
  savedCurrentProject,
} from '@utils/utils';
// import {validateEmail} from '@utils/';
type MenuNavigationProp = StackNavigationProp<StackNavigatorProps, 'Menu'>;
type MenuRouteProp = RouteProp<StackNavigatorProps, 'Menu'>;

export interface MenuProps {
  navigation: MenuNavigationProp;
  route: MenuRouteProp;
  reduxActions: any;
  reduxState: any;
}

const Menu = (props: MenuProps) => {
  const [loading, setloading] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  const [orgError, setorgError] = useState(false);
  const [org, setorg] = useState('');
  const [orgDetails, setorgDetails] = useState('');
  const [projectLeader, setprojectLeader] = useState('');
  const [peoplesText, setpeoplesText] = useState('');
  const [organizationSugg, setorganizationSugg] = useState([]);
  const [organizations, setorganizations] = useState([]);
  const [currOrganizations, setcurrOrganizations] = useState({});
  const [peoples, setpeoples] = useState([]);
  const [projects, setprojects] = useState([]);
  const [userEmail, setuserEmail] = useState('');
  const [orgCreatedBy, setorgCreatedBy] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((res: any) => {
          setuserEmail(email);
          setorganizations(res.data.data.organizations);
          getCurrentOrganization().then((orgId: any) => {
            createApi
              .createApi()
              .getOrganization(orgId)
              .then((orgD: any) => {
                setorgCreatedBy(orgD.data.data.created_by);
              });
            setcurrOrganizations(
              res.data.data.organizations.filter((d) => d._id == orgId)[0].name,
            );
          });
        });
    });
  }, []);

  // change organization
  const changeOrganizationName = (e: any) => {
    var strArr = [];
    for (var j = 0; j < organizations.length; j++) {
      if (organizations[j].name.toLowerCase().match(e)) {
        strArr.push(organizations[j]);
      }
    }
    setorganizationSugg(strArr);
  };

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

              props.navigation.dispatch(
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

            <Text style={styles.createNewText}>New Observation</Text>
          </TouchableOpacity>

          <Icon
            onPress={() => props.navigation.goBack()}
            containerStyle={{marginLeft: 10}}
            name={'cross'}
            type={'entypo'}
            size={10}
            iconStyle={{opacity: 0.5}}
            // accessibilityComponentType={undefined}
            // accessibilityTraits={undefined}
          />
        </View>
        {/* create organization */}
        <TouchableOpacity
          onPress={() => {
            //   this.setState({createModal: xfalse});
            props.navigation.navigate('CreateOrganization');
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
        {/* Create project */}
        <TouchableOpacity
          onPress={() => {
            //   this.setState({createModal: false});

            if (userEmail === orgCreatedBy) {
              props.navigation.navigate('createProject');
            }
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
            if (userEmail === orgCreatedBy) {
              props.navigation.navigate('InvitePeople');
            }
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
              accessibilityComponentType={undefined}
              accessibilityTraits={undefined}
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
          <Text style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayMedium}}>
            Select your organization
          </Text>
          <TouchableOpacity
            onPress={() => {
              setorganizationSugg(organizations);
            }}
            style={[styles.inputContainer]}>
            <TextInput
              editable={false}
              value={currOrganizations}
              style={{
                fontSize: wp(3),
                width: wp(80),
              }}
              onChangeText={(e) => changeOrganizationName(e)}
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
              accessibilityComponentType={undefined}
              accessibilityTraits={undefined}
            />
          </TouchableOpacity>
          {/* Suggestions of organization */}
          {organizationSugg.length != 0 ? (
            <View>
              <View style={styles.involveSuggestCont}>
                {organizationSugg.map((d: any, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      console.log('proajdhasjhd');
                      console.log(d);
                      savedCurrentOrganization(d._id);

                      if (d.projects.length != 0) {
                        savedCurrentProject(d.projects[0].project_id._id).then(
                          () => {
                            savedCurrentOrganization(d._id).then(() => {
                              setcurrOrganizations(d.name);
                              setorganizationSugg([]);
                            });
                          },
                        );
                      }
                      // AsyncStorage.setItem('organizationId', d._id);
                    }}
                    style={[
                      styles.involvePsuggCont,
                      organizationSugg.length == i + 1
                        ? {borderBottomWidth: wp(0)}
                        : null,
                    ]}>
                    <Icon
                      name={'stats-chart'}
                      type={'ionicon'}
                      iconStyle={{opacity: 0.5}}
                      size={wp(3)}
                      containerStyle={{marginRight: wp(3)}}
                      accessibilityComponentType={undefined}
                      accessibilityTraits={undefined}
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
};

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
