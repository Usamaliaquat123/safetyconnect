import React, {useReducer, useState} from 'react';
import {View, Text, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import styles from './styles';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '@theme';
import {Icon} from 'react-native-elements';
// import {chartTy} from '@typings';
interface Props {
  severity: Array<Object>;
  liklihood: Array<Object>;
  style?: Object;
  onPress: Function;
}

const Chart = (props: Props) => {
  const [liklihood, setliklihood] = useState(props.liklihood);
  const [severity, setseverity] = useState(props.severity);
  const [total, setTotal] = useState();

  // console.log(props.liklihood.filter((i: any) => i.selected == true)[0].value);
  // if(liklihood.filter((i: any) => i.selected == true))

  if (severity.filter((i: any) => i.selected == true).length != 0) {
    if (severity.filter((i: any) => i.selected == true).length != 0) {
      var ttl =
        liklihood.filter((i: any) => i.selected == true)[0].value *
        severity.filter((i: any) => i.selected == true)[0].value;
    }
  }

  console.log();
  // console.log(props.liklihood.filter((i: any) => i.selected == true).);
  // if (props.liklihood.filter((i: any) => i.selected == true).length == 0) {
  //   props.liklihood[0].selected = true;
  //   props.severity[0].selected = true;
  //   ttl =
  //     props.liklihood.filter((i: any) => i.selected == true)[0].value *
  //     props.severity.filter((i: any) => i.selected == true)[0].value;
  // } else {
  //   ttl =
  //     props.liklihood.filter((i: any) => i.selected == true)[0].value *
  //     props.severity.filter((i: any) => i.selected == true)[0].value;
  // }
  // p[]
  // var ttl = 9;
  return (
    <View style={props.style}>
      <View style={{paddingBottom: wp(3)}}>
        {/* Liklihood */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: wp(4),
              // marginTop: wp(-2),
              marginTop: wp(1),
              fontFamily: fonts.SFuiDisplayMedium,
              marginRight: wp(3),
            }}>
            LIKELIHOOD
          </Text>

          <Text
            style={{
              fontSize: wp(2.8),
              fontFamily: fonts.SFuiDisplayMedium,
              opacity: 0.5,
              // marginLeft: wp(2),
              marginTop: wp(2),
            }}>
            View Risk Matrix{' '}
          </Text>
          <Icon
            iconStyle={{opacity: 0.5, marginTop: wp(1), marginLeft: wp(1)}}
            size={wp(4)}
            name="infocirlceo"
            type="antdesign"
            color={colors.text}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          {liklihood.map((d: any, i: number) => {
            return (
              <View key={i}>
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

                    console.log(likelihoodarr);
                    props.onPress({liklihood: d});
                  }}
                  style={[
                    {
                      padding: wp(1.7),
                      height: wp(16),
                      marginTop: wp(0.4),
                      // marginLeft: wp(1),
                    },
                  ]}>
                  <View
                    style={[
                      {
                        // backgroundColor: d.color,
                        borderColor: d.color,
                        borderWidth: wp(0.7),
                        alignItems: 'center',
                        width: wp(10),
                        height: wp(10),
                        justifyContent: 'center',
                        borderRadius: wp(2),
                      },

                      d.selected == true
                        ? {
                            backgroundColor: d.color,
                          }
                        : null,
                    ]}>
                    <Text
                      style={[
                        {fontSize: wp(3.5), fontWeight: 'bold', color: d.color},
                        d.selected == true
                          ? {
                              color: colors.secondary,
                            }
                          : null,
                      ]}>
                      {d.value}
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: wp(2.2),
                      position: 'absolute',
                      bottom: wp(1),
                      alignSelf: 'center',
                      opacity: 0.5,
                    }}>
                    {d.text}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View
          style={{
            right: 0,
            top: wp(16),
            position: 'absolute',
          }}>
          <View
            style={[
              {
                borderRadius: wp(1),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.error,
                padding: wp(8),
              },
              ttl < 7
                ? {backgroundColor: colors.green}
                : ttl < 14
                ? {backgroundColor: colors.riskIcons.orrange}
                : {backgroundColor: colors.error},
            ]}>
            <Text
              style={[
                {
                  position: 'absolute',
                  fontSize: wp(8),
                  color: colors.secondary,
                  fontFamily: fonts.SFuiDisplayBold,
                },
              ]}>
              {ttl}
            </Text>
          </View>
          <Text
            style={[
              {
                fontSize: wp(4),
                fontFamily: fonts.SFuiDisplayBold,
                textAlign: 'center',
                // color: colors.error,
              },
              ttl < 7
                ? {color: colors.green}
                : ttl < 14
                ? {color: colors.riskIcons.orrange}
                : {color: colors.error},
            ]}>
            {ttl < 7 ? `Low` : ttl < 14 ? `Medium` : 'High'}
          </Text>
          <Text
            style={{
              fontSize: wp(3),
              fontFamily: fonts.SFuiDisplayMedium,
              textAlign: 'center',
              opacity: 0.5,
            }}>
            (L X S)
          </Text>
        </View>

        {/* severity */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              marginTop: wp(3),
              fontSize: wp(4),
              // fontWeight:   'bold',
              fontFamily: fonts.SFuiDisplayMedium,
              // marginRight: wp(3),
            }}>
            SEVERITY
          </Text>
          <Text
            style={{
              fontSize: wp(2.8),
              fontFamily: fonts.SFuiDisplayMedium,
              opacity: 0.5,
              marginLeft: wp(3),
              marginTop: wp(2),
            }}>
            View Risk Matrix{' '}
          </Text>
          <Icon
            iconStyle={{opacity: 0.5, marginTop: wp(1), marginLeft: wp(1)}}
            size={wp(4)}
            name="infocirlceo"
            type="antdesign"
            color={colors.text}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            {severity.map((d: any, i) => {
              return (
                <View key={i}>
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
                      props.onPress({severity: d});
                    }}
                    style={[
                      {
                        padding: wp(1.7),
                        height: wp(16),
                        // width: wp(14),
                        borderRadius: wp(3),
                        // marginLeft: wp(1),
                      },
                    ]}>
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
                        props.onPress({severity: d});
                      }}
                      style={[
                        {
                          borderColor: d.color,
                          alignItems: 'center',
                          width: wp(10),
                          borderWidth: wp(0.5),
                          // position: 'absolute',
                          height: wp(10),
                          justifyContent: 'center',
                          borderRadius: wp(2),
                        },
                        d.selected == true
                          ? {
                              backgroundColor: d.color,
                            }
                          : null,
                      ]}>
                      <Text
                        style={[
                          {
                            fontSize: wp(3.5),
                            fontWeight: 'bold',
                            color: d.color,
                          },

                          d.selected == true
                            ? {
                                color: colors.secondary,
                              }
                            : null,
                        ]}>
                        {d.value}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: wp(2.2),
                        position: 'absolute',
                        bottom: wp(1),
                        alignSelf: 'center',
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
