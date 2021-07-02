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
  keyFindingss: '';
  data: any;
  fiveWhyQuestions: Function;
  keyFindings?: Function;

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
      keyFindings: '',
      rootCausesArray: [],
      rootCausesArrayA: [],
      contributoryCauseArray: [],
      contributoryCauseArrayA: [],
      selectedContributoryCauseQ: '',
      selectedContributoryCauseA: '',
      selectedrootCausesQ: '',
      selectedrootCausesA: '',
      contributoryCauseAQ: [],
      rootCausesQA: [],
    };
  }
  componentDidMount() {
    console.log('this.props.countributoryCauses');

    //   this.setState({
    //     // contributoryCauseArray: this.props.contributoryCauses[0].category,
    //     // contributoryCauseArrayA: this.props.contributoryCauses[0]
    //     //   .subCategory[0],
    //     // rootCausesArray: this.props.rootCauses[0].category,
    //     // rootCausesArrayA: this.props.rootCauses[0].subCategory[0],
    //   });
    // }

    console.log(this.state.countributoryCauses);

    if (this.props.contributoryCauses.length != 0) {
      console.log(this.state.countributoryCauses[0].category);
      this.setState({
        selectedContributoryCauseQ: this.state.countributoryCauses[0].category,
        selectedContributoryCauseA: this.state.countributoryCauses[0].category,
      });
    }
    if (this.props.rootCauses.length != 0) {
      console.log(this.state.rootcauses[0].category);
      this.setState({selectedrootCausesQ: this.state.rootcauses[0].category});
      this.setState({
        selectedrootCausesA: this.state.rootcauses[0].subCategory,
      });
    }

    // for (let i = 0; i < this.props.fiveWhyQuestions.length; i++) {
    //   for (let j = 0; j < this.props.fiveWhyAnswer.length; j++) {
    //     this.state.fivewhy.push({question: i, answer});
    //   }
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
  keyFindingsOnChange = (e) => {
    this.props.keyFindings()
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
              onChangeText={(e) => this.props.keyFindings(e)}
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

          <View
            style={[
              styles.involveSuggestCont,
              {padding: wp(0), paddingLeft: wp(3)},
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.setState({rootCausesArray: FiveWhyMenus});
              }}
              style={[styles.involvePsuggCont, {borderBottomWidth: wp(0)}]}>
              <View>
                <Text
                  style={[
                    styles.involvePSt,
                    this.state.selectedrootCausesQ === ''
                      ? {opacity: 0.3, fontSize: wp(3)}
                      : null,
                  ]}>
                  {this.state.selectedrootCausesQ === ''
                    ? 'Select Root Causes  '
                    : this.state.selectedrootCausesQ}
                </Text>
                <Text
                  style={{
                    fontSize: wp(2.5),
                    opacity: 0.5,
                    fontFamily: fonts.SFuiDisplayMedium,
                  }}>
                  {this.state.selectedrootCausesA}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.rootCausesArray.length == 0 ? null : (
            <View style={styles.involveSuggestCont}>
              {this.state.rootCausesArray.map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.setState({
                      selectedrootCausesQ: d,
                      rootCausesArray: [],
                      rootCausesArrayA: FiveWhySubMenus,
                    });
                    this.state.rootCausesQA.push({category: d});
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

          {this.state.rootCausesArrayA.length == 0 ? null : (
            <View style={styles.involveSuggestCont}>
              {this.state.rootCausesArrayA.map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.setState({
                      selectedrootCausesA: d,
                      rootCausesArrayA: [],
                    });

                    this.state.rootCausesQA[0]['subCategory'] = [d];
                    this.props.onChangeRiskCause(this.state.rootCausesQA);
                  }}
                  style={[
                    styles.involvePsuggCont,
                    this.state.rootCausesArrayA.length == i + 1
                      ? {borderBottomWidth: wp(0)}
                      : null,
                  ]}>
                  <View>
                    <Text style={styles.involvePSt}>{d}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* </View> */}
        </View>
        {/* Contributory Causes */}
        <View style={styles.rootCauseContainer}>
          <Text style={styles.keyfindingsText}>Contributory Causes</Text>
          <View
            style={[
              styles.involveSuggestCont,
              {padding: wp(0), paddingLeft: wp(3)},
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.setState({contributoryCauseArray: FiveWhyMenus});
              }}
              style={[styles.involvePsuggCont, {borderBottomWidth: wp(0)}]}>
              <View>
                <Text
                  style={[
                    styles.involvePSt,
                    this.state.electedContributoryCauseQ === ''
                      ? {opacity: 0.3, fontSize: wp(3)}
                      : null,
                  ]}>
                  {this.state.selectedContributoryCauseQ === ''
                    ? 'Select Contributory Causes  '
                    : this.state.selectedContributoryCauseQ}
                </Text>
                <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                  {this.state.selectedContributoryCauseA}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* CountriButory Cause QUESTION */}
          {this.state.contributoryCauseArray.length == 0 ? null : (
            <View style={styles.involveSuggestCont}>
              {this.state.contributoryCauseArray.map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.setState({
                      selectedContributoryCauseQ: d,
                      contributoryCauseArray: [],
                      contributoryCauseArrayA: FiveWhySubMenus,
                    });

                    this.state.contributoryCauseAQ.push({
                      category: d,
                    });
                  }}
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
          {this.state.contributoryCauseArrayA.length == 0 ? null : (
            <View style={styles.involveSuggestCont}>
              {this.state.contributoryCauseArrayA.map((d: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.setState({
                      selectedContributoryCauseA: d,
                      contributoryCauseArrayA: [],
                    });
                    this.state.contributoryCauseAQ[0]['subCategory'] = [d];
                    this.props.onChangeCountributory(
                      this.state.contributoryCauseAQ,
                    );
                  }}
                  style={[
                    styles.involvePsuggCont,
                    this.state.contributoryCauseArrayA.length == i + 1
                      ? {borderBottomWidth: wp(0)}
                      : null,
                  ]}>
                  <View>
                    <Text style={styles.involvePSt}>{d}</Text>
                  </View>
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
