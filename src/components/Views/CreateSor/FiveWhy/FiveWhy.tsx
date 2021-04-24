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
import {suffixThNd} from '@utils';
import {colors, GlStyles, images, fonts} from '@theme';

import styles from './styles';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, myTasks, recentActivity, createApi} from '@service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface ViewAllProps {
  containerStyle?: ViewStyle;
  reportId: string;
  userId: string;
}

export default class FiveWhy extends React.Component<ViewAllProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fivewhy: [
        {
          question: 'Who is responsible for this event',
          answer: 'john doe is responsible for this event',
        },
      ],

      question: '',
      answer: '',
    };
  }
  componentDidMount() {}

  addQuestions = (question: string, answer: string) => {
    // const form = new FormData();
    // form.append('q', str);
    var obj = {
      justification: {
        question: [question],
        answer: [answer],
      },
      report: this.props.reportId,
      user: this.props.userId,
    };
    createApi
      .createApi()
      .createFiveWhy(obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    this.state.fivewhy.push({question, answer});
    this.setState({});
  };

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
              <Text style={styles.viewCountWhy}>{suffixThNd(i + 1)} WHY</Text>
              <Text style={styles.viewQuestion}>{d.question}</Text>
              <Text style={styles.viewAnswer}>{d.answer}</Text>
            </View>
          ))}
          {this.state.fivewhy.length < 5 ? (
            <>
              {/* Five WHY Questionaries Container */}
              <View style={styles.questionandAnswerContainer}>
                {/* Question */}
                <TextInput
                  onChangeText={(e) => this.setState({question: e})}
                  style={styles.qInputContainer}
                  placeholder={'Add WHY'}
                />
                {/* Answer */}
                <View style={styles.aInputContain}>
                  <TextInput
                    onChangeText={(e) => this.setState({answer: e})}
                    underlineColorAndroid="transparent"
                    style={styles.aInputContainer}
                    multiline={true}
                    placeholder={'Add Answer'}
                  />
                </View>
              </View>
              {/* Add Questions Button */}
              <TouchableOpacity
                onPress={() =>
                  this.addQuestions(this.state.question, this.state.answer)
                }
                style={styles.addQuestionbtn}>
                <Text style={styles.addQuestionText}>Add Question</Text>
              </TouchableOpacity>
            </>
          ) : null}
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
