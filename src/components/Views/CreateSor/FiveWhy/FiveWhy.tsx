import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  TextInput,
  ViewStyle,
  Animated,
} from 'react-native';
import {colors, GlStyles, images, fonts} from '@theme';

import styles from './styles';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, myTasks, recentActivity} from '@service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface ViewAllProps {
  containerStyle?: ViewStyle;
}

export default class FiveWhy extends React.Component<ViewAllProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fivewhy: [{question: '', answer: ''}],
    };
  }
  componentDidMount() {}

  render() {
    return (
      <View style={this.props.containerStyle}>
        {/* FIVE WHY Questionaries */}
        <View style={styles.fiveWhyContainer}>
          <Text style={styles.conduct5whyanaHeading}>
            Conduct Five WHY analysis
          </Text>

          {/* All Questions  */}

          {this.state.fivewhy.map((d: any, i: number) => (
            <View style={styles.viewWhyContainer}>
              <Text style={styles.viewCountWhy}>{i + 1}st WHY</Text>
              <Text style={styles.viewQuestion}>
                Who is responsible for this event
              </Text>
              <Text style={styles.viewAnswer}>
                john doe is responsible for this event
              </Text>
            </View>
          ))}

          {/* Five WHY Questionaries Container */}
          <View style={styles.questionandAnswerContainer}>
            {/* Question */}
            <TextInput style={styles.qInputContainer} placeholder={'Add WHY'} />
            {/* Answer */}
            <View style={styles.aInputContain}>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.aInputContainer}
                multiline={true}
                placeholder={'Add Answer'}
              />
            </View>
          </View>
          {/* Add Questions Button */}
          <View style={styles.addQuestionbtn}>
            <Text style={styles.addQuestionText}>Add Question</Text>
          </View>
        </View>
        {/* KEY FINDINGS */}
        <View style={styles.keyfindingsContiner}>
          <Text style={styles.keyfindingsText}>Key Findings</Text>
          <View style={styles.keyfindingsInputContiner}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.keyfindingsInput}
              multiline={true}
              placeholder={'Add key findings here'}
            />
          </View>
        </View>
        {/* Root Causes */}
        <View></View>
        {/* Contributory Causes */}
        <View></View>
      </View>
    );
  }
}
