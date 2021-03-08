import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
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
  style?: ViewStyle;
  type?: string;
}

class Tags extends React.Component<TagsProps, any> {
  render() {
    if (this.props.type == 'sugg') {
      return this.props.tags.map((d: any, i: number) => (
        <View key={i} style={[styles.container, this.props.style]}>
          <Text style={styles.tagsText}>{d.action.substring(0, 40)}...</Text>
          <TouchableOpacity
            onPress={() => this.props.onClose(d)}
            style={styles.containerIcon}>
            <Icon
              style={styles.crossIcon}
              onPress={() => this.props.onClose(d)}
              size={wp(3)}
              name="cross"
              type="entypo"
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      ));
    } else if (this.props.type == 'addTeamMem') {
      return this.props.tags.map((d: any, i: number) => (
        <View key={i} style={[styles.container, this.props.style]}>
          <Text style={styles.tagsText}>{d}</Text>
          <TouchableOpacity
            onPress={() => this.props.onClose(d)}
            style={styles.containerIcon}>
            <Icon
              style={styles.crossIcon}
              onPress={() => this.props.onClose(d)}
              size={wp(3)}
              name="cross"
              type="entypo"
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      ));
    } else if (this.props.type == 'location') {
      return this.props.tags.map((d: any, i: number) => (
        <View key={i} style={[styles.container, this.props.style]}>
          <Text style={styles.tagsText}>{d}</Text>
          <TouchableOpacity
            onPress={() => this.props.onClose(d)}
            style={styles.containerIcon}>
            <Icon
              style={styles.crossIcon}
              onPress={() => this.props.onClose(d)}
              size={wp(3)}
              name="cross"
              type="entypo"
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      ));
    } else {
      return this.props.tags.map((d: any, i: number) => (
        <View key={i} style={[styles.container, this.props.style]}>
          <Text style={styles.tagsText}>{d.name}</Text>
          <TouchableOpacity
            onPress={() => this.props.onClose(d)}
            style={styles.containerIcon}>
            <Icon
              style={styles.crossIcon}
              onPress={() => this.props.onClose(d)}
              size={wp(3)}
              name="cross"
              type="entypo"
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      ));
    }
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
