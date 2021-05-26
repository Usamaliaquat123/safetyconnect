import * as React from 'react';
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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Auth} from 'aws-amplify';
import {createApi} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MoreNavigationProp = StackNavigationProp<BottomTabNavigatorProp, 'More'>;
type MoreRouteProp = RouteProp<BottomTabNavigatorProp, 'More'>;

export interface MoreProps {
  route: MoreRouteProp;
  navigation: MoreNavigationProp;
  reduxActions: any;
  reduxState: any;
}
export default class More extends React.Component<MoreProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      name: '',
      email: '',
      url: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user: any) => {
      var usr = JSON.parse(user);
      console.log(usr);
      this.setState({name: usr.name, email: usr.email, url: usr.img_url});
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
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
                  uri: this.state.url,
                }}
              />
              <View style={{marginTop: wp(2)}}>
                <Text style={styles.username}>{this.state.name}</Text>
                <Text style={styles.organizations}>{this.state.email}</Text>
              </View>
              <View style={{position: 'absolute', right: wp(0)}}>
                <Image style={styles.itemIcon} source={images.menuIcons.edit} />
              </View>
            </View>
            {/*  content */}
            <TouchableOpacity style={styles.containerOfItem}>
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
                  <Image
                    style={styles.itemIcon}
                    source={images.menuIcons.risk}
                  />
                </View>
                <Text style={styles.itemText}>Risk Management</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerOfItem}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    style={styles.itemIcon}
                    source={images.menuIcons.lms}
                  />
                </View>
                <Text style={styles.itemText}>LMS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerOfItem}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    style={styles.itemIcon}
                    source={images.menuIcons.data}
                  />
                </View>
                <Text style={styles.itemText}>Data Analytics</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerOfItem}>
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
                  this.props.navigation.dispatch(
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
  }
}

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Settings);
