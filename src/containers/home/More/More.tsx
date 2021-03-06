import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
// import { connect } from 'react-redux';
import {Avatar} from 'react-native-elements';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigatorProp} from '@nav';
import {RouteProp, CommonActions} from '@react-navigation/native';
import {colors, images} from '@theme';
import {createApi as api} from '@service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Auth} from 'aws-amplify';
import {createApi} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type MoreNavigationProp = StackNavigationProp<BottomTabNavigatorProp, 'More'>;
type MoreRouteProp = RouteProp<BottomTabNavigatorProp, 'More'>;

export interface MoreProps {
  route: MoreRouteProp;
  navigation: MoreNavigationProp;
  reduxActions: any;
  reduxState: any;
}

const More = (props: MoreProps) => {
  const [user, setuser] = useState({});
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [url, seturl] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('email').then((email: any) => {
      api
        .createApi()
        .getUser(email)
        .then((user: any) => {
          var usr = user.data.data;
          setname(usr.name);
          seturl(usr.img_url);
          setuser(user.data.data);
          setemail(usr.email);
        });
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headertle}>
            <View>
              <Text style={styles.title}>More</Text>
              <View style={styles.underScrore} />
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.avatarView}>
            <Avatar
              size={'medium'}
              rounded
              source={{
                uri: url,
              }}
            />
            <View style={{marginTop: wp(2)}}>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.organizations}>{email}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                AsyncStorage.getItem('email').then((email: any) => {
                  api
                    .createApi()
                    .getUser(email)
                    .then((user: any) => {
                      props.navigation.navigate('Settings', {
                        data: user.data.data,
                      });
                    });
                });
              }}
              style={{position: 'absolute', right: wp(0)}}>
              <Image style={styles.itemIcon} source={images.menuIcons.edit} />
            </TouchableOpacity>
          </View>
          {/*  content */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViewAllSOr')}
            style={styles.containerOfItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.itemIcon}
                  source={images.menuIcons.observation}
                />
              </View>
              <Text style={styles.itemText}>Observation & Feedback</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerOfItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.itemIcon}
                  source={images.menuIcons.incident}
                />
              </View>
              <Text style={styles.itemText}>
                Incident and Accident Reporting
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerOfItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.itemIcon}
                  source={images.menuIcons.audit}
                />
              </View>
              <Text style={styles.itemText}>Audit and Inspection</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerOfItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image style={styles.itemIcon} source={images.menuIcons.risk} />
              </View>
              <Text style={styles.itemText}>Risk Management</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerOfItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image style={styles.itemIcon} source={images.menuIcons.lms} />
              </View>
              <Text style={styles.itemText}>LMS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerOfItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image style={styles.itemIcon} source={images.menuIcons.data} />
              </View>
              <Text style={styles.itemText}>Data Analytics</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('MainSettings')}
            style={styles.containerOfItem}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.itemIcon}
                  source={images.menuIcons.settings}
                />
              </View>
              <Text style={styles.itemText}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerOfItem, {marginBottom: wp(15)}]}>
            <TouchableOpacity
              onPress={() => {
                Auth.signOut();

                AsyncStorage.removeItem('user');
                AsyncStorage.removeItem('email');
                AsyncStorage.removeItem('organizationId');
                AsyncStorage.removeItem('projectId');
                GoogleSignin.signOut();
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: 'Login',
                      },
                    ],
                  }),
                );
              }}
              style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.itemIcon}
                  source={images.menuIcons.signout}
                />
              </View>
              <Text style={styles.itemText}>Sign out</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default More;
