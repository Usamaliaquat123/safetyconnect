import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Avatar} from 'react-native-elements';
import styles from './styles';
import {images, colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
var CustomIcon: any = Icon;
export interface ListCardProps {
  observation: string;
  user1?: string;
  user2?: string;
  repeated: Array<any>;
  username: string;
  date: number;
  onPress: Function;
  location?: string;
  iconconf: any;
  onPressRepeated: Function;
  classify: string;
  styles: StyleProp<ViewStyle>;
}

export default class ListCard extends React.Component<ListCardProps, any> {
  componentDidMount = () => {};
  render() {
    return (
      <View style={[styles.listVwCntent, this.props.styles]}>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={{flexDirection: 'row'}}>
          {this.props.classify == 'lsr' ? (
            <Image
              source={images.lsr}
              style={{tintColor: colors.primary, width: wp(5), height: wp(5)}}
            />
          ) : (
            <View>
              {this.props.classify == 'near miss' ? (
                <Image
                  source={images.nearMiss}
                  style={{tintColor: 'black', width: wp(5), height: wp(5)}}
                />
              ) : (
                <View>
                  {this.props.iconconf == undefined ? null : (
                    <CustomIcon
                      size={wp(5)}
                      name={this.props.iconconf.icon}
                      type={this.props.iconconf.type}
                      color={this.props.iconconf.color}
                    />
                  )}
                </View>
              )}
            </View>
          )}

          <Text style={styles.listObDesc}>
            {this.props.observation == undefined
              ? 'observation not found'
              : `${this.props.observation.slice(0, 40)}...`}
          </Text>
        </TouchableOpacity>
        <View style={styles.listBottomView}>
          <Text style={styles.listUserTimeDate}>{this.props.location}</Text>
          <Text style={styles.listMomentLT}>
            {this.props.date === undefined
              ? ''
              : moment(this.props.date).format('LT Do MMM, YYYY')}
          </Text>
          {/* Repeated */}

          {this.props.repeated.length != 0 && (
            <TouchableOpacity
              onPress={() => this.props.onPressRepeated(this.props.repeated)}
              style={{
                position: 'absolute',
                right: wp(15),
                borderColor: colors.green,
                borderWidth: wp(0.5),
                backgroundColor: colors.lightGreen,
                padding: wp(1.5),
                paddingTop: wp(0.1),
                paddingBottom: wp(0.1),
                borderRadius: wp(1),
              }}>
              <Text
                style={{
                  fontFamily: fonts.SfuiDisplayHeavy,
                  color: colors.green,
                  fontSize: wp(3),
                }}>
                R
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.listAvatars}>
            <Avatar
              size={wp(5)}
              rounded
              source={{
                uri:
                  this.props.user1 == undefined
                    ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                    : this.props.user1,
              }}
            />
            <Avatar
              containerStyle={styles.listAvatarLeft}
              size={wp(5)}
              rounded
              source={{
                uri:
                  this.props.user2 == undefined
                    ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                    : this.props.user2,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
