import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export interface SearchProps {}

export default class Search extends React.Component<SearchProps, any> {
  render() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }
}
