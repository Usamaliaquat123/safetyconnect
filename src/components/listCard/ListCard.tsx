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
import {images, colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
export interface ListCardProps {
  observation: string;
  user1?: string;
  user2?: string;
  username: string;
  date: number;
  onPress: Function;
  iconconf: any;
  classify: string;
  styles: StyleProp<ViewStyle>;
}

export default class ListCard extends React.Component<ListCardProps, any> {
  componentDidMount = () => {};
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[styles.listVwCntent, this.props.styles]}>
        <View style={{flexDirection: 'row'}}>
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
                    <Icon
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
              : `${this.props.observation.slice(0, 30)}...`}
          </Text>
          <View style={styles.listAvatars}>
            <Avatar
              size={wp(8)}
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
              size={wp(8)}
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
        <View style={styles.listBottomView}>
          <Text style={styles.listUserTimeDate}>{this.props.username}</Text>
          <Text style={styles.listMomentLT}>
            {moment(this.props.date).format('LT Do MMM, YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
