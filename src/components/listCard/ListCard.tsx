import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Avatar} from 'react-native-elements';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
export interface ListCardProps {
  observation: string;
  user1: string;
  user2: string;
  username: string;
  date: number;
  onPress: Function;
  iconconf: any;
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
          <Icon
            size={wp(5)}
            name={this.props.iconconf.icon}
            type={this.props.iconconf.type}
            color={this.props.iconconf.color}
          />
          <Text style={styles.listObDesc}>
            {this.props.observation.slice(0, 40)}...
          </Text>
          <View style={styles.listAvatars}>
            <Avatar
              size={wp(8)}
              rounded
              source={{
                uri: this.props.user1,
              }}
            />
            <Avatar
              containerStyle={styles.listAvatarLeft}
              size={wp(8)}
              rounded
              source={{
                uri: this.props.user2,
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
