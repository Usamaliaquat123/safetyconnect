import {arrayOf} from 'prop-types';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
interface Props {
  styles: Object;
  arr: Array<string>;
  onPress: Function;
}

const Suggestions = (props: Props) => {
  return (
    <View style={props.styles}>
      <View>
        <Text style={styles.actionSuggHeading}>Suggestions</Text>
        <View style={styles.ActionSugContainer}>
          {props.arr.map((d: string) => (
            <TouchableOpacity
              onPress={() => props.onPress(d)}
              style={styles.ActionsugItm}>
              <Text style={styles.ActionsugItmTxt}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Suggestions;
