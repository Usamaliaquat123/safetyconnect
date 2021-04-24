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
  fiveWhyQuestions: Function;
  fiveWhyAnswer: Function;
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
      rootcauses: '',
      countributoryCauses: '',
    };
  }
  componentDidMount() {
    console.log(this.props.reportId);
  }

  addQuestions = (question: string, answer: string) => {
    // const form = new FormData();
    // form.append('q', str);
    // var obj = {
    //   justification: {
    //     question: [question],
    //     answer: [answer],
    //     contributoryCauses: 'haider',
    //     rootCauses: 'ali',
    //   },
    //   report: this.props.reportId,
    //   user: this.props.userId,
    // };
    // createApi
    //   .createApi()
    //   .createFiveWhy(obj)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
    this.state.fivewhy.push({question, answer});
    this.setState({question: '', answer: ''});
    console.log(this.state.fivewhy);
    this.props.fiveWhyQuestions(this.state.fivewhy.map((d: any) => d.question));
    this.props.fiveWhyAnswer(this.state.fivewhy.map((d: any) => d.answer));

    this.setState({});
  };

  onChangeAnswer = (e: any, i: number) => {
    this.state.fivewhy[i].answer = e;
    this.setState({});
  };
  onChangeQuestion = (e: any, i: number) => {
    this.state.fivewhy[i].question = e;
    this.setState({});
  };
  onDeleteFivewhy = (fivewhy: any) => {
    var fivewhy = this.state.fivewhy.filter((d: any) => d != fivewhy);
    this.setState({fivewhy});
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
            <View style={styles.whyViewContainer}>
              <View key={i} style={styles.viewWhyContainer}>
                <Text style={styles.viewCountWhy}>{suffixThNd(i + 1)} WHY</Text>
                <TextInput
                  style={styles.viewQuestion}
                  value={d.question}
                  onChangeText={(e) => this.onChangeQuestion(e, i)}></TextInput>
                <TextInput
                  style={styles.viewAnswer}
                  value={d.answer}
                  onChangeText={(e: any) =>
                    this.onChangeAnswer(e, i)
                  }></TextInput>
              </View>
              <Icon
                onPress={() => this.onDeleteFivewhy(d)}
                size={wp(7)}
                name="trash"
                type="evilicon"
                color={colors.error}
              />
            </View>
          ))}
          {this.state.fivewhy.length < 5 ? (
            <>
              {/* Five WHY Questionaries Container */}
              <View style={styles.questionandAnswerContainer}>
                {/* Question */}
                <TextInput
                  value={this.state.question}
                  onChangeText={(e) => this.setState({question: e})}
                  style={styles.qInputContainer}
                  placeholder={'Add WHY'}
                />
                {/* Answer */}
                <View style={styles.aInputContain}>
                  <TextInput
                    value={this.state.answer}
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
        <View style={styles.rootCauseContainer}>
          <Text style={styles.keyfindingsText}>Root Causes</Text>
          {/* <View style={styles.rootCauseInputContainer}> */}
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.rootCausesInput}
            multiline={true}
            value={this.state.rootcauses}
            onChangeText={(e) => this.setState({rootcauses: e})}
            placeholder={'Add Root Causes'}
          />
          {/* </View> */}
        </View>
        {/* Contributory Causes */}
        <View style={styles.rootCauseContainer}>
          <Text style={styles.keyfindingsText}>Contributory Causes</Text>
          {/* <View style={styles.rootCauseInputContainer}> */}
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.rootCausesInput}
            multiline={true}
            value={this.state.countributoryCauses}
            onChangeText={(e) => this.setState({countributoryCauses: e})}
            placeholder={'Add Contributory causes'}
          />
          {/* </View> */}
        </View>
      </View>
    );
  }
}
