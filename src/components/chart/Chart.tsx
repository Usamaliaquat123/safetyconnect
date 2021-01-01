import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {colors} from '@theme';
import {mapChart} from '@service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ThemeConsumer} from 'react-native-elements';

export interface ChartProps {
  style?: Object;
  onPress: Function;
}

class Chart extends React.Component<ChartProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      mapChart,
    };
  }

  clearValues = (i: number, val: Object, arr: Array<any>): Array<Object> => {
    arr.map((j: object, i: number) => {
      if (arr[i] == val) {
        arr[i].selected = true;
      } else {
        arr[i].selected = false;
      }
    });

    return arr;
  };

  onIconSelecte = (d: object, i: number, row: Array<Object>) => {
    console.log('test');
    if (this.state.mapChart.r1 == row) {
    } else if (this.state.mapChart.r2 == row) {
      console.log('inner row');
      var mapChart = {...this.state.mapChart};
      // mapChart.r2;
      // mapChart.r2[i].selected = !this.state.mapChart.r2[i].selected;
      // mapChart.r2.map((d: object, indx: number) => {
      //   if (mapChart.r2[i] == d) {
      //     console.log('sds');
      //     mapChart.r2[i].selected = true;
      //   } else {
      //     // console.log('sds');
      //     mapChart.r2[i].selected = false;
      //   }
      // });
      // console.log(mapChart);

      mapChart.r2.map((b: object, j: number) => {
        if (mapChart.r2[j] == d) {
          mapChart.r2[j].selected = !mapChart.r2[j].selected;
        } else {
          mapChart.r2[j].selected = false;
        }
      });
      this.setState({mapChart});
      this.numberIcon(mapChart.r2);
      // this.render();
    } else if (this.state.mapChart.r3 == row) {
    } else if (this.state.mapChart.r4 == row) {
    } else if (this.state.mapChart.r5 == row) {
    }

    // console.log(mapChart);
  };

  numberIcon = (row: Array<object>) => {
    {
      return (
        <View style={{flexDirection: 'row'}}>
          {row.map((d: any, i: number) => (
            <TouchableOpacity
              onPress={() => this.onIconSelecte(d, i, row)}
              style={[
                styles.circle,
                {backgroundColor: d.color},
                d.selected == true ? {opacity: 1} : {opacity: 0.5},
              ]}>
              <Text style={styles.circleText}>{d.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };
  render() {
    console.log(this.state.mapChart);
    return (
      <View style={this.props.style}>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>5</Text>
          </View>
          {this.numberIcon(this.state.mapChart.r1)}
        </View>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>4</Text>
          </View>

          {this.numberIcon(this.state.mapChart.r2)}
        </View>
        <View style={styles.rowCont}>
          <Text style={styles.likelihoodText}>LIKELIHOOD</Text>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>3</Text>
          </View>

          {this.numberIcon(this.state.mapChart.r3)}
        </View>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>2</Text>
          </View>

          {this.numberIcon(this.state.mapChart.r4)}
        </View>
        <View style={styles.rowCont}>
          <View style={styles.circleOpa}>
            <Text style={[styles.circleText, styles.ruler]}>1</Text>
          </View>
          {this.numberIcon(this.state.mapChart.r5)}
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
