import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface Props {
  style: Object;
}

const Chart = (props: Props) => {
  return (
    <View style={props.style}>
      <View style={styles.rowCont}>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>5</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>5</Text>
        </View>
        <View
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>10</Text>
        </View>
        <View
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>15</Text>
        </View>
        <View style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
          <Text style={styles.circleText}>20</Text>
        </View>
        <View style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
          <Text style={styles.circleText}>25</Text>
        </View>
      </View>
      <View style={styles.rowCont}>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>4</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>4</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>8</Text>
        </View>
        <View
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>12</Text>
        </View>
        <View
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>16</Text>
        </View>
        <View style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
          <Text style={styles.circleText}>20</Text>
        </View>
      </View>
      <View style={styles.rowCont}>
        <Text style={styles.likelihoodText}>LIKELIHOOD</Text>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>3</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>3</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>6</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>9</Text>
        </View>
        <View
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>12</Text>
        </View>
        <View
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>16</Text>
        </View>
      </View>
      <View style={styles.rowCont}>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>2</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.darkGreen},
          ]}>
          <Text style={styles.circleText}>2</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>4</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>6</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>8</Text>
        </View>
        <View
          style={[styles.circle, {backgroundColor: colors.riskIcons.orrange}]}>
          <Text style={styles.circleText}>10</Text>
        </View>
      </View>
      <View style={styles.rowCont}>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>1</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.darkGreen},
          ]}>
          <Text style={styles.circleText}>1</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.darkGreen},
          ]}>
          <Text style={styles.circleText}>2</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>3</Text>
        </View>
        <View
          style={[
            styles.circle,
            {backgroundColor: colors.riskIcons.lightGreen},
          ]}>
          <Text style={styles.circleText}>4</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>5</Text>
        </View>
      </View>
      <View style={styles.rowCont}>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>0</Text>
        </View>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>1</Text>
        </View>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>2</Text>
        </View>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>3</Text>
          <Text style={styles.severityText}>SEVERITY</Text>
        </View>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>4</Text>
        </View>
        <View style={styles.circleOpa}>
          <Text style={[styles.circleText, styles.ruler]}>5</Text>
        </View>
      </View>
    </View>
  );
};

export default Chart;
