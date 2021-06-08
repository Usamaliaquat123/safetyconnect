import * as React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CommonActions} from '@react-navigation/native';
import {StackNavigatorProps} from '@nav';
import {Icon, Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '@theme';
export interface SettingsProps {
  route: MoreRouteProp;
  navigation: MoreNavigationProp;
  reduxActions: any;
  reduxState: any;
}

type MoreNavigationProp = StackNavigationProp<StackNavigatorProps, 'Settings'>;
type MoreRouteProp = RouteProp<StackNavigatorProps, 'Settings'>;

class Settings extends React.Component<SettingsProps, any> {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                name={'arrowleft'}
                type={'antdesign'}
                size={wp(5)}
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Profile</Text>
                {/* <View style={styles.underScrore} /> */}
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

            <View style={{width: wp(50), alignSelf: 'center'}}>
              <Avatar
                containerStyle={{alignSelf: 'center', marginTop: wp(3)}}
                size={wp(30)}
                rounded
                source={{
                  uri:
                    'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fuser&psig=AOvVaw1mZl6u-R0ttxXEyWKiuF_8&ust=1623222366332000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjA_ta8h_ECFQAAAAAdAAAAABAD',
                }}
              />
              <View
                style={{
                  backgroundColor: colors.green,
                  width: wp(10),
                  padding: wp(3),
                  right: wp(7),
                  top: wp(5),
                  // alignSelf: 'center',
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
            </View>
          </View>
        </ScrollView>
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
