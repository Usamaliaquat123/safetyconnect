import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements';
export interface TagsProps {
  tags: Array<string>;
  onClose: Function;
}

class Tags extends React.Component<TagsProps, any> {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        {this.props.tags.map((d, i) => (
          <View style={styles.container}>
            <Text style={styles.tagsText}>{d}</Text>
            <TouchableOpacity
              onPress={() => this.props.onClose(d)}
              style={styles.containerIcon}>
              <Icon
                style={styles.crossIcon}
                onPress={() => this.props.onClose(d)}
                size={wp(5)}
                name="cross"
                type="entypo"
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
