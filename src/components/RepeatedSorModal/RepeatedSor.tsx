import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Icon} from 'react-native-elements';
import {Card} from '@components';
import {colors} from '@theme';
import {repeatedSor} from '@service';
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
  repeatedSor: Array<Isor>;
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
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headingContainer}>
            Is your SOR same as these ?
          </Text>
          {/* SUbmitted */}
          {/* <View style={[styles.containerCard, {marginTop: wp(2)}]}> */}
          {/* <View style={{flexDirection: 'row', paddingLeft: wp(2)}}> */}

          {/* </View> */}
          {/* Cards containers */}
          {repeatedSor.submitted.map((res, i) => (
            <Card
              data={res}
              onPress={(d: Isor) => this.props.onViewSor(d)}
              date={res.date}
              risk={res.risk}
              viewPortWidth={70}
              observation={res.observation}
              backgroundColor={colors.secondary}
              classify={res.classify}
              iconConf={classifySor.find((e: any) => e.title == res.classify)}
              location={res.location}
              user1={res.user1}
              user2={res.user2}
              style={[styles.cardConatiner, {marginTop: wp(2)}]}
            />
          ))}
          {/* </View> */}
          {/* completed  */}

          {/* Cards containers */}
          {repeatedSor.submitted.map((res, i) => (
            <Card
              data={res}
              onPress={(d: Isor) => this.props.onViewSor(d)}
              date={res.date}
              risk={res.risk}
              viewPortWidth={70}
              observation={res.observation}
              backgroundColor={colors.secondary}
              classify={res.classify}
              iconConf={classifySor.find((e: any) => e.title == res.classify)}
              location={res.location}
              user1={res.user1}
              user2={res.user2}
              style={[styles.cardConatiner, {marginTop: wp(2)}]}
            />
          ))}
          {/* Draft  */}

          {/* Cards containers */}
          {repeatedSor.draft.map((res, i) => (
            <>
              {/* 
<Card
                            key={i}
                            type={'all'}
                            data={d}
                            onPress={(d: Isor) =>
                              this.props.navigation.navigate('ViewSOR', {
                                data: d,
                              })
                            }
                            name={d.created_by}
                            date={d.occured_at}
                            risk={d.risk.severity * d.risk.likelihood}
                            viewPortWidth={80}
                            observation={d.details}
                            classify={d.sor_type}
                            iconConf={classifySor.find(
                              (e: any) => e.title == d.sor_type,
                            )}
                            location={d.location}
                            style={[
                              styles.draftCardContainer,
                              // {marginBottom: wp()},
                            ]}
                            user1={d.user1}
                            user2={d.user2}
                          /> */}

              <Card
                data={res}
                type={'all'}
                onPress={(d: Isor) => this.props.onViewSor(d)}
                date={res.date}
                risk={res.risk}
                viewPortWidth={70}
                observation={res.observation}
                backgroundColor={colors.secondary}
                classify={res.classify}
                iconConf={classifySor.find((e: any) => e.title == res.classify)}
                location={res.location}
                user1={res.user1}
                user2={res.user2}
                style={[styles.cardConatiner, {marginTop: wp(2)}]}
              />
            </>
          ))}
          <View style={styles.bottomBtns}>
            <TouchableOpacity onPress={() => this.props.onSkip()}>
              <Text style={styles.skipBtn}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.onSubmit()}
              style={[
                styles.submitBtn,
                this.state.draftSelected == false ||
                this.state.completedSelected == false ||
                this.state.submittedSelected == false
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
