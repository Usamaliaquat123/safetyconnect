import * as React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import styles from './styles';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon, Avatar} from 'react-native-elements';
export interface SearchProps {
  onChange: Function;
  value: string;
  iconName?: string;
  placeHolder?: string;
  iconType?: string;
}

export default class Search extends React.Component<SearchProps, any> {
  render() {
    return (
      <View style={styles.containerSearch}>
        {this.props.iconName ? (
          <Icon
            containerStyle={styles.iconStyle}
            size={25}
            name={this.props.iconName}
            type={this.props.iconType}
            color={colors.textOpa}
          />
        ) : null}
        <TextInput
          placeholder={this.props.placeHolder}
          style={styles.searchInput}
          //   value={this.props.value}
          onChange={(e) => this.props.onChange(e.nativeEvent.text)}
        />
      </View>
    );
  }
}
