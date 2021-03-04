import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Avatar, Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
export interface SuggestionsAvatarProps {
  text: string;
  type: string;
  onSelect: Function;
}

class SuggestionsAvatar extends React.Component<SuggestionsAvatarProps, any> {
  render() {
    return (
      <View>
        {this.props.type == 'location' ? (
          <View style={styles.involveSuggestCont}>
            {/* {this.props.users.map((d: string, i: number) => ( */}
            <TouchableOpacity
              onPress={() => this.props.onSelect(this.props.text)}
              style={[styles.involvePsuggCont, {borderBottomWidth: wp(0)}]}>
              <Icon
                //   onPress={() => this.props.navigation.goBack()}
                size={wp(6)}
                containerStyle={{opacity: 0.6}}
                name="add-circle-outline"
                type="ionicon"
                color={colors.text}
              />
              <Text style={{fontSize: wp(3), opacity: 0.5, marginLeft: wp(1)}}>
                Add
              </Text>
              <Text style={styles.involvePSt}> {this.props.text}</Text>
            </TouchableOpacity>
            {/* ))} */}
          </View>
        ) : (
          <View style={styles.involveSuggestCont}>
            {/* {this.props.users.map((d: string, i: number) => ( */}
            <TouchableOpacity
              onPress={() => this.props.onSelect(this.props.text)}
              style={[styles.involvePsuggCont, {borderBottomWidth: wp(0)}]}>
              <Icon
                //   onPress={() => this.props.navigation.goBack()}
                size={wp(6)}
                containerStyle={{opacity: 0.6}}
                name="add-circle-outline"
                type="ionicon"
                color={colors.text}
              />
              <Text style={{fontSize: wp(3), opacity: 0.5, marginLeft: wp(1)}}>
                Add
              </Text>
              <Text style={styles.involvePSt}> {this.props.text}</Text>
            </TouchableOpacity>
            {/* ))} */}
          </View>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsAvatar);
