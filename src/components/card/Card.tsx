import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors} from '@theme';
import {Icon, Avatar} from 'react-native-elements';
import moment from 'moment';
import {mapChart} from '@service';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {any} from 'prop-types';
export interface CardProps {
  data?: any;
  date?: number;
  risk?: number;
  observation?: string;
  classify?: any;
  location?: string;
  even?: boolean;
  iconConf?: any;
  user1: string;
  user2: string;
  style?: Object;
  viewPortWidth?: number;
  isclassify?: boolean;
  backgroundColor?: string;
  onPress: Function;
}
function dp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default class Card extends React.Component<CardProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemWidth: 80,
    };
  }

  componentDidMount = () => {
    const slideWidth = dp(this.props.viewPortWidth);
    const itemHorizontalMargin = dp(2);
    const itemWidth = slideWidth + itemHorizontalMargin * 2;
    this.setState({itemWidth});
  };

  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.slideInnerContainer, {width: this.state.itemWidth}]}
          onPress={() => {
            this.props.onPress(this.props.data);
          }}>
          {/* <View style={styles.shadow} /> */}
          <View
            style={[
              styles.imageContainer,
              {backgroundColor: this.props.backgroundColor},
            ]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardtime}>ID: {1234}</Text>
              {this.props.isclassify == true ? (
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
              ) : null}

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
                  name={this.props.iconConf.icon}
                  type={this.props.iconConf.type}
                  color={this.props.iconConf.color}
                />
                <Text
                  style={[
                    styles.cardBorderText,
                    {color: this.props.iconConf.color},
                  ]}>
                  {this.props.classify}
                </Text>
              </View>
              <View style={styles.cardLocation}>
                <Icon
                  style={{paddingRight: 3}}
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
