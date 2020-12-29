import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface Props {}

export interface ChartProps {
  style: Object;
  onPress: Function;
}

class Chart extends React.Component<ChartProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      SelectedArr: [],
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>5</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log(this.state.SelectedArr);
              if (this.state.SelectedArr.length != 0) {
                if (this.state.SelectedArr.filter((v: number) => v == 5)) {
                  this.setState({
                    SelectedArr: this.state.SelectedArr.filter(
                      (v: number) => v !== 5,
                    ),
                  });
                }
              } else {
                // console.log('eles');
                this.setState({SelectedArr: [5]});
                // this.setState({});
              }
              this.props.onPress(5);
            }}
            style={[
              styles.circle,
              this.state.SelectedArr.find((v: number) => {
                return v == 5;
              })
                ? {opacity: 1}
                : {opacity: 0.5},
            ]}>
            <Text style={styles.circleText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.orrange},
            ]}>
            <Text style={styles.circleText}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.orrange},
            ]}>
            <Text style={styles.circleText}>15</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
            <Text style={styles.circleText}>20</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
            <Text style={styles.circleText}>25</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>4</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.lightGreen},
            ]}>
            <Text style={styles.circleText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Text style={styles.circleText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.orrange},
            ]}>
            <Text style={styles.circleText}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.orrange},
            ]}>
            <Text style={styles.circleText}>16</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.circle, {backgroundColor: colors.riskIcons.red}]}>
            <Text style={styles.circleText}>20</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowCont}>
          <Text style={styles.likelihoodText}>LIKELIHOOD</Text>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>3</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.lightGreen},
            ]}>
            <Text style={styles.circleText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Text style={styles.circleText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Text style={styles.circleText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.orrange},
            ]}>
            <Text style={styles.circleText}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.orrange},
            ]}>
            <Text style={styles.circleText}>16</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>2</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.darkGreen},
            ]}>
            <Text style={styles.circleText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.lightGreen},
            ]}>
            <Text style={styles.circleText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Text style={styles.circleText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Text style={styles.circleText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.orrange},
            ]}>
            <Text style={styles.circleText}>10</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>1</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.darkGreen},
            ]}>
            <Text style={styles.circleText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.darkGreen},
            ]}>
            <Text style={styles.circleText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.lightGreen},
            ]}>
            <Text style={styles.circleText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.circle,
              {backgroundColor: colors.riskIcons.lightGreen},
            ]}>
            <Text style={styles.circleText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Text style={styles.circleText}>5</Text>
          </TouchableOpacity>
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
  }
}

export default Chart;
