import {arrayOf} from 'prop-types';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
// import {colros} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface Props {
  styles: Object;
  arr: Array<string>;
  onPress: Function;
  type: string;
}

const Suggestions = (props: Props) => {
  return (
    <View style={props.styles}>
      <View>
        <Text style={styles.actionSuggHeading}>Suggestions</Text>
        <View style={styles.ActionSugContainer}>
          {/* Actions  || Observations */}

          {/* Actions */}
          {props.type == 'suggestions' && (
            <View>
              {props.arr.slice(0, 3).map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => props.onPress(d)}
                  style={styles.ActionsugItm}>
                  <Text style={styles.ActionsugItmTxt}>{d.content}</Text>
                  {/* <Text style={{fontSize: wp(3), color: colors.black}}>
                {d.email}
              </Text> */}
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Observations  */}
          {props.type == 'observation' && (
            <View>
              {props.arr.slice(0, 3).map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => props.onPress(d)}
                  style={styles.ActionsugItm}>
                  <Text style={styles.ActionsugItmTxt}>{d.details}</Text>
                  {/* <Text style={{fontSize: wp(3), color: colors.black}}>
                {d.email}
              </Text> */}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Suggestions;
