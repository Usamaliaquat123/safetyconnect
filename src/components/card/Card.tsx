import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, fonts} from '@theme';
import {Icon, Avatar} from 'react-native-elements';
import moment from 'moment';
import {createApi, mapChart} from '@service';
import {capitalizeFirstLetter} from '@utils';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var CustomIcon: any = Icon;
export interface CardProps {
  data?: any;
  date?: number;
  risk?: number | any;
  isView?: boolean;
  observation?: string;
  classify?: any;
  location?: string | any;
  even?: boolean;
  iconConf?: any;
  user1: string;
  user2?: string;
  style?: Object;
  viewPortWidth?: number;
  isclassify?: boolean;
  backgroundColor?: string;
  onPress: Function;
  type?: string;
  containerStyle?: any;
  selection?: boolean;
  repeated?: Array<any> | any;
  onPressRepeated?: Function | any;
  name?: string | any;
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
      user: {},
    };
  }

  componentDidMount = () => {
    console.log(this.props.risk);
    const slideWidth = dp(this.props.viewPortWidth);
    const itemHorizontalMargin = dp(2);
    const itemWidth = slideWidth + itemHorizontalMargin * 2;
    this.setState({itemWidth});

    createApi
      .createApi()
      .getUser(this.props.name)
      .then((res: any) => {
        this.setState({
          user: {
            name: res.data.data.name,
            email: res.data.data.email,
            img_url: res.data.data.img_url,
          },
        });
      });
  };

  render() {
    return (
      <>
        {this.props.type == 'all' ? (
          <View style={this.props.style}>
            <View
              // activeOpacity={1}
              style={[
                styles.slideInnerContainer,
                // {width: this.state.itemWidth},
              ]}>
              {/* <View style={styles.shadow} /> */}
              <View
                style={[
                  styles.imageContainer,
                  // {backgroundColor: this.props.backgroundColor},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onPress(this.props.data);
                  }}
                  style={{flexDirection: 'column'}}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardtime}>
                      Reported at{' '}
                      {this.props.date == undefined
                        ? ''
                        : moment(this.props.date).format('LT, DD MMM YYYY')}
                    </Text>
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
                        <Text style={styles.cardBadgeText}>
                          {this.props.risk}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>
                      {this.props.observation}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Card Bottom view */}
                <View style={[styles.cardBottom, {width: wp(70)}]}>
                  <View style={styles.cardContainer}>
                    <View style={styles.cardRisk}>
                      <CustomIcon
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
                        {capitalizeFirstLetter(this.props.classify)}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.riskCapacity,
                        this.props.risk < 6
                          ? {backgroundColor: colors.green}
                          : this.props.risk < 14
                          ? {backgroundColor: colors.yellow}
                          : {backgroundColor: colors.error},
                      ]}>
                      <Text style={styles.riskCapacityText}>
                        {this.props.risk < 6
                          ? `${this.props.risk}-low`
                          : this.props.risk < 14
                          ? `${this.props.risk}-Medium`
                          : `${this.props.risk}-High`}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userAndlocationContainer}>
                    <View style={styles.userNameEmail}>
                      <Avatar
                        size={wp(5)}
                        containerStyle={{marginRight: wp(-5)}}
                        rounded
                        source={{
                          uri:
                            this.props.user1 == undefined
                              ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                              : this.props.user1,
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: wp(6),
                          fontSize: wp(3),
                          opacity: 0.5,
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {capitalizeFirstLetter(this.props.name.split('@')[0])}
                      </Text>
                    </View>

                    {this.props.repeated.length != 0 && (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.onPressRepeated(this.props.repeated)
                        }
                        style={{
                          // position: 'absolute',
                          // right: wp(15),
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

                    <View style={styles.cardLocation}>
                      <CustomIcon
                        style={{paddingRight: 3, opacity: 0.5}}
                        size={wp(5)}
                        name="location"
                        type="evilicon"
                        color={colors.text}
                      />
                      <Text style={styles.cardBorderText}>
                        {capitalizeFirstLetter(this.props.location)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[this.props.even ? styles.radiusMaskEven : {}]} />
              </View>
            </View>
          </View>
        ) : (
          <View style={this.props.style}>
            <TouchableOpacity
              // activeOpacity={1}
              style={[
                styles.slideInnerContainer,

                this.props.containerStyle
                  ? this.props.containerStyle
                  : {
                      width: wp(90),
                    },
              ]}
              onPress={() => {
                this.props.onPress(this.props.data);
              }}>
              {/* <View style={styles.shadow} /> */}
              <View
                style={[
                  styles.imageContainer,
                  {
                    backgroundColor: this.props.backgroundColor,
                  },

                  this.props.selection
                    ? {
                        borderWidth: wp(0.2),
                        borderColor: colors.green,
                      }
                    : null,
                ]}>
                <View style={{flexDirection: 'column'}}>
                  <View style={styles.cardHeader}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.cardtime}>
                        Reported at{' '}
                        {this.props.date == undefined
                          ? ''
                          : moment(this.props.date).format('LT, DD MMM YYYY')}
                      </Text>

                      {this.props.isView == undefined && (
                        <CustomIcon
                          containerStyle={{marginLeft: wp(7)}}
                          name={
                            this.props.selection
                              ? 'checkcircle'
                              : 'checkcircleo'
                          }
                          type={'antdesign'}
                          size={wp(5)}
                          color={colors.green}
                        />
                      )}
                    </View>
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
                        <Text style={styles.cardBadgeText}>
                          {this.props.risk}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>
                      {this.props.observation}
                    </Text>
                  </View>
                </View>

                {/* Card Bottom view */}
                <View style={[styles.cardBottom, {width: wp(70)}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: wp(3),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={styles.cardRisk}>
                      <CustomIcon
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
                        {capitalizeFirstLetter(this.props.classify)}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.riskCapacity,
                        this.props.risk < 6
                          ? {backgroundColor: colors.green}
                          : this.props.risk < 14
                          ? {backgroundColor: colors.yellow}
                          : {backgroundColor: colors.error},
                      ]}>
                      <Text style={styles.riskCapacityText}>
                        {this.props.risk < 6
                          ? `${this.props.risk}-low`
                          : this.props.risk < 14
                          ? `${this.props.risk}-Medium`
                          : `${this.props.risk}-High`}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userAndlocationContainer}>
                    <View style={styles.userNameEmail}>
                      <Avatar
                        size={wp(5)}
                        containerStyle={{marginRight: wp(-5)}}
                        rounded
                        source={{
                          uri:
                            this.props.user1 == undefined
                              ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                              : this.props.user1,
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: wp(6),
                          fontSize: wp(3),
                          opacity: 0.5,
                          fontFamily: fonts.SFuiDisplayMedium,
                        }}>
                        {this.state.user.name}
                      </Text>
                    </View>
                    <View style={styles.cardLocation}>
                      <CustomIcon
                        style={{paddingRight: 3, opacity: 0.5}}
                        size={wp(5)}
                        name="location"
                        type="evilicon"
                        color={colors.text}
                      />
                      <Text style={styles.cardBorderText}>
                        {capitalizeFirstLetter(this.props.location)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[this.props.even ? styles.radiusMaskEven : {}]} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}
