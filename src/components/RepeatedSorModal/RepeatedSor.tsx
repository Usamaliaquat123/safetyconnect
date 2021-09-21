import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Icon} from 'react-native-elements';
import {Card} from '@components';
import {colors} from '@theme';
import {repeatedSor, createApi} from '@service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Isor} from '@typings';
import {classifySor} from '@utils';
import {ScrollView} from 'react-native-gesture-handler';
export interface RepeatedModalProps {
  onSubmit: Function;
  onSkip: Function;
  onViewSor: Function;
  repeatedSor: Array<any>;
}

export default class RepeatedModal extends React.Component<
  RepeatedModalProps,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      completedSelected: false,
      draftSelected: false,
      submittedSelected: false,
      repeatedSor: [],
    };
  }

  componentDidMount() {
    this.setState({repeatedSor: this.props.repeatedSor});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.headingContainer}>
              Is your SOR same as these ?
            </Text>
            <Icon name={'cross'} type={'entypo'} size={wp(7)} />
          </View>
          {/* SUbmitted */}
          {/* <View style={[styles.containerCard, {marginTop: wp(2)}]}> */}
          {/* <View style={{flexDirection: 'row', paddingLeft: wp(2)}}> */}

          {/* </View> */}
          {/* Cards containers */}
          {this.state.repeatedSor.length != 0 ? (
            <>
              <>
                {this.state.repeatedSor.map((res: any, i: number) => (
                  <View style={{marginBottom: wp(3)}}>
                    <Card
                      data={res}
                      onPress={(d: Isor) => {
                        var data = [...this.state.repeatedSor];
                        data[i].selected = !d.selected;

                        this.setState({repeatedSor: data});
                        this.props.onViewSor(
                          this.state.repeatedSor.filter(
                            (d) => d.selected == true,
                          ),
                        );
                      }}
                      date={res.occurred_at}
                      // repeated={res.}
                      risk={res.risk.likelihood * res.risk.severity}
                      name={res?.user.name == undefined ? '' : res.user.name}
                      selection={res.selected}
                      viewPortWidth={70}
                      observation={res.details}
                      backgroundColor={colors.secondary}
                      classify={res.sor_type}
                      iconConf={classifySor.find(
                        (e: any) => e.title == res.sor_type,
                      )}
                      location={res.location}
                      user1={
                        res?.user.img_url == undefined ? ' ' : res.user.img_url
                      }
                      containerStyle={{width: wp(80)}}
                      // style={{borderColor: colors.green, borderWidth: wp(0.2)}}
                    />
                  </View>
                ))}
              </>
            </>
          ) : null}
          {/* </View> */}
          {/* completed  */}

          <View style={styles.bottomBtns}>
            <TouchableOpacity onPress={() => this.props.onSkip()}>
              <Text style={styles.skipBtn}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.onSubmit(
                  this.state.repeatedSor.filter((d) => d.selected == true),
                )
              }
              style={[
                styles.submitBtn,
                this.state.repeatedSor.filter((d) => d.selected == true)
                  .length == 0
                  ? {backgroundColor: colors.lightGrey}
                  : {backgroundColor: colors.primary},
              ]}>
              <Text style={styles.subBtnText}>Link with SOR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
