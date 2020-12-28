import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  styles: Object;
  arr: Array<string>;
}

const Suggestions = (props: Props) => {
  return <View style={props.styles}></View>;
};

export default Suggestions;
