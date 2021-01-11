import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import styles from './styles';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { chartTy } from "@typings";
interface Props {
  style: Object;
  onPress: Function;
}



const Chart = (props: Props) => {
  const [liklihood, setliklihood] = useState([
    {value: 1, selected: false},
    {value: 2, selected: false},
    {value: 3, selected: false},
    {value: 4, selected: false},
    {value: 5, selected: false},
  ]);
  const [severity, setseverity] = useState([
    {value: 1, selected: false},
    {value: 2, selected: false},
    {value: 3, selected: false},
    {value: 4, selected: false},
    {value: 5, selected: false},
  ]);
  const selectRuler = (
    likelihood: number,
    severityn: number,
    value: number,
  ) => {
    const sev = [...severity];
    const lik = [...liklihood];

    lik.map((d: chartTy) => (d.selected = false));
    sev.map((d: chartTy) => (d.selected = false));

    sev.map((d: chartTy) => {
      if (severityn == d.value) d.selected = true;
    });
    lik.map((d: chartTy, i: number) => {
      if (likelihood == d.value) d.selected = true;
    });
    props.onPress(value);
    setliklihood(lik);
    setseverity(sev);
  };

  return (
    <View style={props.style}>
      <View style={styles.rowCont}>
        <View
          style={[
            styles.circleOpa,
            liklihood[4].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>5</Text>
        </View>
        <TouchableOpacity
          onPress={() => selectRuler(5, 1, 5)}
          style={styles.circle}>
          <Text style={styles.circleText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(5, 2, 10)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(5, 3, 15)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>15</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(5, 4, 20)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
          <Text style={styles.circleText}>20</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(5, 5, 25)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
          <Text style={styles.circleText}>25</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowCont}>
        <View
          style={[
            styles.circleOpa,
            liklihood[3].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>4</Text>
        </View>
        <TouchableOpacity
          onPress={() => selectRuler(4, 1, 4)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(4, 2, 8)}
          style={styles.circle}>
          <Text style={styles.circleText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(4, 3, 12)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>12</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(4, 4, 16)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>16</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(4, 5, 20)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
          <Text style={styles.circleText}>20</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowCont}>
        <Text style={styles.likelihoodText}>LIKELIHOOD</Text>
        <View
          style={[
            styles.circleOpa,
            liklihood[2].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>3</Text>
        </View>
        <TouchableOpacity
          onPress={() => selectRuler(3, 1, 3)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(3, 2, 6)}
          style={styles.circle}>
          <Text style={styles.circleText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(3, 3, 9)}
          style={styles.circle}>
          <Text style={styles.circleText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(3, 4, 12)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>12</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(3, 5, 16)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>16</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowCont}>
        <View
          style={[
            styles.circleOpa,
            liklihood[1].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>2</Text>
        </View>
        <TouchableOpacity
          onPress={() => selectRuler(2, 1, 2)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.darkGreen},
          ]}>
          <Text style={styles.circleText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(2, 2, 4)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(2, 3, 6)}
          style={styles.circle}>
          <Text style={styles.circleText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(2, 4, 8)}
          style={styles.circle}>
          <Text style={styles.circleText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(2, 5, 10)}
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>10</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowCont}>
        <View
          style={[
            styles.circleOpa,
            liklihood[0].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>1</Text>
        </View>
        <TouchableOpacity
          onPress={() => selectRuler(1, 1, 1)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.darkGreen},
          ]}>
          <Text style={styles.circleText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(1, 2, 2)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.darkGreen},
          ]}>
          <Text style={styles.circleText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(1, 3, 3)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(1, 4, 4)}
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRuler(1, 5, 5)}
          style={styles.circle}>
          <Text style={styles.circleText}>5</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowCont}>
        <View style={[styles.circleOpa]}>
          <Text style={[styles.circleText, styles.ruler]}>0</Text>
        </View>
        <View
          style={[
            styles.circleOpa,
            severity[0].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>1</Text>
        </View>
        <View
          style={[
            styles.circleOpa,
            severity[1].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>2</Text>
        </View>
        <View
          style={[
            styles.circleOpa,
            severity[2].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>3</Text>
          <Text style={styles.severityText}>SEVERITY</Text>
        </View>
        <View
          style={[
            styles.circleOpa,
            severity[3].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>4</Text>
        </View>
        <View
          style={[
            styles.circleOpa,
            severity[4].selected == true
              ? {backgroundColor: colors.textOpa, borderRadius: wp(10)}
              : null,
          ]}>
          <Text style={[styles.circleText, styles.ruler]}>5</Text>
        </View>
      </View>
    </View>
  );
};

export default Chart;
