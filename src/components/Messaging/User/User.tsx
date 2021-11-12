import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar, Icon, Image} from 'react-native-elements';
import moment from 'moment';
import {GlStyles, images, fonts} from '@theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors} from '@theme';
var CustomIcon: any = Icon;
export interface UserProps {
  isOnline: boolean;
  switch?: boolean | undefined;
  isSelected?: boolean;
  name: string;
  image: string;
  latestMsgs: Array<string>;
  date?: any;
  id: number;
  type: string;
  userImages?: Array<string>;
  pendingsms?: number | undefined;
  onPress: Function;
}

export default class User extends React.Component<UserProps, any> {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={styles.userContainer}>
        <View>
          {this.props.type == 'group' ? (
            <View
              style={{
                padding: wp(2),
                justifyContent: 'center',
                borderRadius: wp(10),
                // backgroundColor: colors.primary,
              }}>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {this.props.userImages?.slice(0, 2).map((d, i) => (
                  <Avatar
                    size={wp(4 - i)}
                    rounded
                    containerStyle={[
                      styles.containerAvatar,
                      {marginRight: wp(0.5)},
                    ]}
                    source={{
                      uri: d,
                    }}
                  />
                ))}
              </View>
              {this.props.userImages?.length > 2 && (
                <>
                  {this.props.userImages?.slice(0, 1).map((d, i) => (
                    <Avatar
                      size={wp(3)}
                      rounded
                      containerStyle={[
                        styles.containerAvatar,
                        {
                          marginRight: wp(0.5),
                          marginTop: wp(1),
                          marginLeft: wp(2),
                        },
                      ]}
                      source={{
                        uri: d,
                      }}
                    />
                  ))}
                </>
              )}

              {/* <Avatar
                rounded
                containerStyle={styles.containerAvatar}
                source={{
                  uri: this.props.image,
                }}
              /> */}
              <View
                style={[
                  styles.isonline,
                  this.props.isOnline == false
                    ? {backgroundColor: colors.riskIcons.orrange, opacity: 0.7}
                    : null,
                ]}
              />
            </View>
          ) : (
            <>
              <Avatar
                rounded
                containerStyle={styles.containerAvatar}
                source={{
                  uri: this.props.image,
                }}
              />
              <View
                style={[
                  styles.isonline,
                  this.props.isOnline == false
                    ? {backgroundColor: colors.riskIcons.orrange, opacity: 0.7}
                    : null,
                ]}
              />
            </>
          )}
        </View>

        {/* <Image  /> */}
        <View>
          <Text style={styles.name}>{this.props.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: wp(3),
                height: wp(1),
                opacity: 0.5,
                marginRight: wp(1),
                marginTop: wp(2),
              }}>
              <Image
                source={images.messagereply}
                style={[GlStyles.images, {tintColor: colors.text}]}
              />
            </View>
            <Text style={styles.messages}>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs.
            </Text>
          </View>
          <View
            style={{
              borderWidth: wp(0.1),
              marginTop: wp(3),
              opacity: 0.2,
              borderColor: colors.text,
              width: wp(70),
            }}></View>
        </View>

        {this.props.date ? (
          <View style={{position: 'absolute', right: wp(0)}}>
            <Text
              style={{
                fontSize: wp(2),
                fontFamily: fonts.SFuiDisplayMedium,
                opacity: 0.5,
              }}>
              {moment(this.props.date).fromNow()}
            </Text>
          </View>
        ) : null}
        {this.props.switch ? (
          <View
            style={[
              styles.circleSelect,
              {position: 'absolute', right: 0},
              this.props.isSelected == true
                ? {backgroundColor: colors.green}
                : {backgroundColor: colors.secondary, borderWidth: 0.3},
            ]}>
            <Text style={styles.textNumber}></Text>
          </View>
        ) : (
          <>
            {this.props.pendingsms ? (
              <View style={[styles.circle]}>
                <Text style={styles.textNumber}>{this.props.pendingsms}</Text>
              </View>
            ) : null}
          </>
        )}
      </TouchableOpacity>
    );
  }
}
