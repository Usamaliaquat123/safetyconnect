import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '@theme';
import {Icon, Avatar} from 'react-native-elements';
import moment from 'moment';
import {mapChart} from '@service';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface CardProps {
  data?: any;
  date?: number;
  risk?: number;
  observation?: string;
  classify?: string;
  location?: string;
  even?: boolean;
  iconConf?: any;
  user1: string;
  user2: string;
  style?: Object;
  onPress: Function;
}

export default class Card extends React.Component<CardProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    console.log(this.props.iconConf);
  };

  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slideInnerContainer}
          onPress={() => {
            this.props.onPress(this.props.data);
          }}>
          <View style={styles.shadow} />
          <View style={[styles.imageContainer]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardtime}>{1234}</Text>
              <TouchableOpacity
                style={[
                  styles.cardbadge,
                  {
                    backgroundColor: mapChart.find(
                      (x) => x.value == this.props.risk,
                    )?.color,
                  },
                ]}>
                <Text style={styles.cardBadgeText}>{this.props.risk}</Text>
              </TouchableOpacity>
              <Text style={styles.cardDate}>
                {moment(this.props.date).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>{this.props.observation}</Text>
            </View>
            <View style={styles.cardBottom}>
              <View style={styles.cardRisk}>
                <Icon
                  style={{padding: 3}}
                  size={wp(3)}
                  name="warning"
                  type="antdesign"
                  color={colors.riskIcons.red}
                />
                <Text
                  style={[
                    styles.cardBorderText,
                    {color: colors.riskIcons.red},
                  ]}>
                  {this.props.classify}
                </Text>
              </View>
              <View style={styles.cardLocation}>
                <Icon
                  style={{padding: 3}}
                  size={wp(5)}
                  name="location"
                  type="evilicon"
                  color={colors.primary}
                />
                <Text style={styles.cardBorderText}>{this.props.location}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: wp(-2)}}>
                <Avatar
                  size={wp(8)}
                  containerStyle={{marginRight: wp(-5)}}
                  rounded
                  source={{
                    uri: this.props.user1,
                  }}
                />
                <Avatar
                  size={wp(8)}
                  rounded
                  source={{
                    uri: this.props.user1,
                  }}
                />
              </View>
            </View>
            <View style={[this.props.even ? styles.radiusMaskEven : {}]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
