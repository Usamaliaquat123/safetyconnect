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
import {suffixThNd, FiveWhySubMenus, FiveWhyMenus} from '@utils';
import {colors, GlStyles, images, fonts} from '@theme';

import styles from './styles';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, myTasks, recentActivity, createApi} from '@service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface ViewAllProps {
  contributoryCauses?: '';
  rootCauses?: '';
  containerStyle?: ViewStyle;
  reportId: string;
  userId: string;
  data: any;
  fiveWhyQuestions: Function;
  fiveWhyAnswer: Function;
  onChangeCountributory: Function;
  onChangeRiskCause: Function;
}

export default class FiveWhy extends React.Component<ViewAllProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fivewhy: this.props.data,

      question: '',
      answer: '',
      rootcauses: this.props.rootCauses,
      countributoryCauses: this.props.contributoryCauses,

      rootCausesArray: [],
      contributoryCauseArray: [],

      selectedContributoryCauseQ: '',
      selectedContributoryCauseA: '',
      selectedrootCausesQ: '',
      selectedrootCausesA: '',
    };
  }
  componentDidMount() {
    console.log(this.props.reportId);
    // for (let i = 0; i < this.props.fiveWhyQuestions.length; i++) {
    //     for (let j = 0; j < this.props.fiveWhyAnswer.length; j++) {
    //         this.state.fivewhy.push({question : i, answer})

    //     }

    // }
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
    this.props.fiveWhyQuestions(this.state.fivewhy.map((d: any) => d.question));
    this.props.fiveWhyAnswer(this.state.fivewhy.map((d: any) => d.answer));
    this.setState({});
  };
  onChangeQuestion = (e: any, i: number) => {
    this.state.fivewhy[i].question = e;
    this.props.fiveWhyQuestions(this.state.fivewhy.map((d: any) => d.question));
    this.props.fiveWhyAnswer(this.state.fivewhy.map((d: any) => d.answer));
    this.setState({});
  };
  onDeleteFivewhy = (fivewhy: any) => {
    var fivewhy = this.state.fivewhy.filter((d: any) => d != fivewhy);
    this.setState({fivewhy});
    this.props.fiveWhyQuestions(this.state.fivewhy.map((d: any) => d.question));
    this.props.fiveWhyAnswer(this.state.fivewhy.map((d: any) => d.answer));
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
          <TouchableOpacity
            onPress={() => this.setState({rootCausesArray: FiveWhyMenus})}>
            <TextInput
              editable={false}
              underlineColorAndroid="transparent"
              style={styles.rootCausesInput}
              multiline={true}
              value={this.state.rootcauses}
              onChangeText={(e) => {
                this.props.onChangeRiskCause(e);
                this.setState({rootcauses: e});
              }}
              placeholder={'Select Root Causes'}
            />
          </TouchableOpacity>
          {this.state.rootCausesArray.length == 0 ? null : (
            <View style={styles.involveSuggestCont}>
              {this.state.rootCausesArray.map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.state.AssignedTo.push(d.email);
                    this.setState({
                      involvePersonText: '',
                      suggestions: [],
                    });
                  }}
                  style={[
                    styles.involvePsuggCont,
                    this.state.rootCausesArray.length == i + 1
                      ? {borderBottomWidth: wp(0)}
                      : null,
                  ]}>
                  <View>
                    <Text style={styles.involvePSt}>{d}</Text>
                  </View>
                  <Icon
                    containerStyle={{opacity: 0.5}}
                    name={'right'}
                    type={'antdesign'}
                    size={wp(3)}
                    color={colors.text}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* </View> */}
        </View>
        {/* Contributory Causes */}
        <View style={styles.rootCauseContainer}>
          <Text style={styles.keyfindingsText}>Contributory Causes</Text>
          {/* <View style={styles.rootCauseInputContainer}> */}
          <TouchableOpacity
            onPress={() =>
              this.setState({contributoryCauseArray: FiveWhyMenus})
            }>
            <TextInput
              editable={false}
              underlineColorAndroid="transparent"
              style={styles.rootCausesInput}
              multiline={true}
              value={this.state.countributoryCauses}
              onChangeText={(e) => {
                this.props.onChangeCountributory(e);
                this.setState({countributoryCauses: e});
              }}
              placeholder={'Select Contributory causes'}
            />
          </TouchableOpacity>
          {this.state.contributoryCauseArray.length == 0 ? null : (
            <View style={styles.involveSuggestCont}>
              {this.state.contributoryCauseArray.map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {}}
                  style={[
                    styles.involvePsuggCont,
                    this.state.contributoryCauseArray.length == i + 1
                      ? {borderBottomWidth: wp(0)}
                      : null,
                  ]}>
                  <View>
                    <Text style={styles.involvePSt}>{d}</Text>
                  </View>
                  <Icon
                    containerStyle={{opacity: 0.5}}
                    name={'right'}
                    type={'antdesign'}
                    size={wp(3)}
                    color={colors.text}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* </View> */}
        </View>
      </View>
    );
  }
}
