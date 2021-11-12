import * as React from 'react';
import {fonts} from '@theme';
import {View, StyleSheet, Text} from 'react-native';
import styles from './styles';
import {Avatar, Icon} from 'react-native-elements';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var CustomIcon: any = Icon;
export interface HeaderProps {
  onBackPress?: Function;
  profile?: string;
  title?: string;
  newChat?: boolean;
  isback?: boolean;
}

export default class Header extends React.Component<HeaderProps, any> {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headertle}>
          {this.props.isback == true ? (
            <CustomIcon
              onPress={() => this.props.onBackPress()}
              size={25}
              name="arrow-back-outline"
              type="ionicon"
              color={colors.secondary}
            />
          ) : null}
          <View>
            <Text style={styles.title}>{this.props.title}</Text>
            {/* <View style={styles.underScrore} /> */}
          </View>
          <View style={styles.avatarView}>
            <CustomIcon
              onPress={() => this.props.onBackPress()}
              size={15}
              name="plus"
              type="antdesign"
              color={colors.secondary}
            />
            <Text
              style={{
                fontFamily: fonts.SFuiDisplayMedium,
                fontSize: wp(3),
                paddingLeft: wp(1),
                color: colors.secondary,
              }}>
              Chat
            </Text>
            {/* <Avatar
              rounded
              source={{
                uri: this.props.profile,
              }}
            /> */}
          </View>
        </View>
      </View>
    );
  }
}
