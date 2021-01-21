import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface SuggestionsAvatarProps {
  users: Array<string>;
}

class SuggestionsAvatar extends React.Component<SuggestionsAvatarProps, any> {
  render() {
    return (
      <View>
        <View style={styles.involveSuggestCont}>
          {this.props.users.map((d: string, i: number) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                this.setState({
                  involvePersonText: d,
                  involvePersonSuggestions: [],
                })
              }
              style={[
                styles.involvePsuggCont,
                this.state.involvePersonSuggestions.length == i + 1
                  ? {borderBottomWidth: wp(0)}
                  : null,
              ]}>
              <Text style={styles.involvePSt}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
