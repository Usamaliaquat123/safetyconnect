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
          <View style={[styles.containerCard, {marginTop: wp(2)}]}>
            <View style={{flexDirection: 'row', paddingLeft: wp(2)}}>
              <Text style={[styles.cardHeadng]}>Submitted</Text>

              {this.state.submittedSelected == true ? (
                <Icon
                  onPress={() => this.setState({submittedSelected: false})}
                  size={25}
                  containerStyle={styles.containerStyleOfFiledTick}
                  name="checkmark-circle"
                  type="ionicon"
                  color={colors.green}
                />
              ) : (
                <Icon
                  onPress={() => this.setState({submittedSelected: true})}
                  size={25}
                  containerStyle={styles.containerStyleOfNotTick}
                  name="checkmark-circle-outline"
                  type="ionicon"
                  color={colors.text}
                />
              )}
            </View>
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
          </View>
          {/* completed  */}
          <View style={styles.containerCard}>
            <View style={{flexDirection: 'row', paddingLeft: wp(2)}}>
              <Text style={styles.cardHeadng}>Completed</Text>
              {this.state.completedSelected == true ? (
                <Icon
                  onPress={() => this.setState({completedSelected: false})}
                  size={25}
                  containerStyle={styles.containerStyleOfFiledTick}
                  name="checkmark-circle"
                  type="ionicon"
                  color={colors.green}
                />
              ) : (
                <Icon
                  onPress={() => this.setState({completedSelected: true})}
                  size={25}
                  containerStyle={styles.containerStyleOfNotTick}
                  name="checkmark-circle-outline"
                  type="ionicon"
                  color={colors.text}
                />
              )}
            </View>
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
          </View>
          {/* Draft  */}
          <View style={styles.containerCard}>
            <View style={{flexDirection: 'row', paddingLeft: wp(2)}}>
              <Text style={styles.cardHeadng}>Draft</Text>

              {this.state.draftSelected == true ? (
                <Icon
                  onPress={() => this.setState({draftSelected: false})}
                  size={25}
                  containerStyle={styles.containerStyleOfFiledTick}
                  name="checkmark-circle"
                  type="ionicon"
                  color={colors.green}
                />
              ) : (
                <Icon
                  onPress={() => this.setState({draftSelected: true})}
                  size={25}
                  containerStyle={styles.containerStyleOfNotTick}
                  name="checkmark-circle-outline"
                  type="ionicon"
                  color={colors.text}
                />
              )}
            </View>
            {/* Cards containers */}
            {repeatedSor.draft.map((res, i) => (
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
          </View>
          <View style={styles.bottomBtns}>
            <TouchableOpacity onPress={() => this.props.onSkip()}>
              <Text style={styles.skipBtn}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.onSubmit()}
              style={styles.submitBtn}>
              <Text style={styles.subBtnText}>Link with SOR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
