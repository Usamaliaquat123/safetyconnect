import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import styles from './styles';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {chartTy} from '@typings';
interface Props {
  style: Object;
  onPress: Function;
}

const Chart = (props: Props) => {
  const [liklihood, setliklihood] = useState([
    {
      value: 1,
      text: 'Rare',
      selected: false,
      color: colors.riskIcons.likelihood.rare,
    },
    {
      value: 2,
      text: 'Likely',
      selected: false,
      color: colors.riskIcons.likelihood.likely,
    },
    {
      value: 3,
      text: 'Possible',
      selected: false,
      color: colors.riskIcons.likelihood.possibly,
    },
    {
      value: 4,
      text: 'Unlikely',
      selected: false,
      color: colors.riskIcons.likelihood.unlikely,
    },
    {
      value: 5,
      text: 'Rare',
      selected: false,
      color: colors.riskIcons.likelihood.Rare,
    },
  ]);
  const [severity, setseverity] = useState([
    {
      value: 1,
      text: 'low',
      selected: false,
      color: colors.riskIcons.severity.rare,
    },
    {
      value: 2,
      text: 'Minor',
      selected: false,
      color: colors.riskIcons.severity.likely,
    },
    {
      value: 3,
      text: 'Moderate',
      selected: false,
      color: colors.riskIcons.severity.possibly,
    },
    {
      value: 4,
      text: 'Major',
      selected: false,
      color: colors.riskIcons.severity.unlikely,
    },
    {
      value: 5,
      text: 'Critical',
      selected: false,
      color: colors.riskIcons.severity.Rare,
    },
  ]);

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
          {liklihood.map((d, i) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  var likelihoodarr = [...liklihood];
                  likelihoodarr.map((b: object, j: number) => {
                    if (likelihoodarr[j] == d) {
                      likelihoodarr[j].selected = !likelihoodarr[j].selected;
                    } else {
                      likelihoodarr[j].selected = false;
                    }
                  });
                  setliklihood(likelihoodarr);
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
          ))}
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
            {severity.map((d, i) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    var severityArr = [...severity];
                    severityArr.map((b: object, j: number) => {
                      if (severityArr[j] == d) {
                        severityArr[j].selected = !severityArr[j].selected;
                      } else {
                        severityArr[j].selected = false;
                      }
                    });
                    setseverity(severityArr);
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
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chart;
