import React, {useReducer, useState} from 'react';
import {View, Text, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import styles from './styles';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {chartTy} from '@typings';
interface Props {
  severity: Array<Object>;
  liklihood: Array<Object>;
  style: Object;
  onPress: Function;
}

const Chart = (props: Props) => {
  const [liklihood, setliklihood] = useState(props.liklihood);
  const [severity, setseverity] = useState(props.severity);

  return (
    <View style={props.style}>
      <View style={{padding: wp(3)}}>
        {/* Liklihood */}
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: wp(3),
              fontWeight: 'bold',
              marginTop: wp(-2),
              marginRight: wp(3),
              alignSelf: 'center',
            }}>
            LIKELIHOOD
          </Text>
          {liklihood.map((d: any, i: number) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    var likelihoodarr: Array<any> = [...liklihood];
                    likelihoodarr.map((b: object, j: number) => {
                      if (likelihoodarr[j] == d) {
                        likelihoodarr[j].selected = !likelihoodarr[j].selected;
                      } else {
                        likelihoodarr[j].selected = false;
                      }
                    });
                    setliklihood(likelihoodarr);
                    props.onPress({liklihood: d.value});
                  }}
                  style={[
                    {
                      padding: wp(1.7),
                      marginTop: wp(0.4),
                      // marginLeft: wp(1),
                    },
                    d.selected == true
                      ? {
                          borderWidth: wp(0.2),
                          borderRadius: wp(2),

                          borderColor: colors.primary,
                        }
                      : null,
                  ]}>
                  <View
                    style={{
                      backgroundColor: d.color,
                      alignItems: 'center',
                      width: wp(10),
                      height: wp(10),
                      justifyContent: 'center',
                      borderRadius: wp(3),
                    }}>
                    <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>
                      {d.value}
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: wp(2.7),
                      opacity: 0.5,
                    }}>
                    {d.text}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* severity */}
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: wp(3),
              fontWeight: 'bold',
              marginRight: wp(3),
              alignSelf: 'center',
              marginTop: wp(-2),
            }}>
            SEVERITY
          </Text>
          <View style={{flexDirection: 'row', marginLeft: wp(3)}}>
            {severity.map((d: any, i) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      var severityArr: Array<any> = [...severity];
                      severityArr.map((b: object, j: number) => {
                        if (severityArr[j] == d) {
                          severityArr[j].selected = !severityArr[j].selected;
                        } else {
                          severityArr[j].selected = false;
                        }
                      });
                      setseverity(severityArr);
                      props.onPress({severity: d.value});
                    }}
                    style={[
                      {
                        padding: wp(1.7),

                        borderRadius: wp(3),
                        // marginLeft: wp(1),
                      },
                      d.selected == true
                        ? {
                            borderWidth: wp(0.2),
                            borderRadius: wp(2),
                            borderColor: colors.primary,
                          }
                        : null,
                    ]}>
                    <View
                      style={{
                        backgroundColor: d.color,
                        alignItems: 'center',
                        width: wp(10),
                        height: wp(10),
                        justifyContent: 'center',
                        borderRadius: wp(3),
                      }}>
                      <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>
                        {d.value}
                      </Text>
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: wp(2.7),
                        opacity: 0.5,
                      }}>
                      {d.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chart;
