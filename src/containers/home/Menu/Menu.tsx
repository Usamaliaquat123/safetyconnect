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
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {colors, images} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface MenuProps {}

type MenuNavigationProp = StackNavigationProp<StackNavigatorProps, 'Menu'>;
type MenuRouteProp = RouteProp<StackNavigatorProps, 'Menu'>;

export interface HomeProps {
  route: MenuRouteProp;
  navigation: MenuNavigationProp;
  reduxActions: any;
  reduxState: any;
}
export default class Menu extends React.Component<MenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
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
                  uri:
                    'https://media-exp1.licdn.com/dms/image/C5603AQHGeQB42B1CcA/profile-displayphoto-shrink_200_200/0/1588740771758?e=1618444800&v=beta&t=CtMgG7KLgfGZO-pYkX6tdvwbCGnuU-g4G2TiocMI1gc',
                }}
              />
              <View style={{marginTop: wp(2)}}>
                <Text style={styles.username}>John Doe</Text>
                <Text style={styles.organizations}>Safety Connect</Text>
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
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    style={styles.itemIcon}
                    source={images.menuIcons.signout}
                  />
                </View>
                <Text style={styles.itemText}>Sign out</Text>
              </View>
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
