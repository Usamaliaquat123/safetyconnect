import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors} from '@theme';
export interface UserProps {
  isOnline: boolean;
  switch?: boolean | undefined;
  isSelected?: boolean;
  name: string;
  image: string;
  id: number;
  type: string;
  userImages: Array<string>;
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
            <>
              {/* {this.props.userImages.length > 2()} */}
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {this.props.userImages.slice(0, 2).map((d, i) => (
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
        <Text style={styles.name}>{this.props.name}</Text>

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
