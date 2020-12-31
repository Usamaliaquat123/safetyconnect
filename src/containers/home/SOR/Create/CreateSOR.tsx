import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
// import { connect } from 'react-redux';
import {Create_sor} from '@service/mock';
import styles from './style';
import moment from 'moment';
import {searchInSuggestions, filterLocation, classifySor} from '@utils';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import {Chart, Suggestions} from '@components';

export interface CreateSORProps {
  navigation: any;
}

export default class CreateSOR extends React.Component<CreateSORProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // Animated View | Animations
      initAnim: new Animated.Value(0),
      contentAnim: new Animated.Value(80),
      // *****
      selectP: false,
      selectL: false,
      observationT: '',
      obserLocation: '@Add Location',
      currentlocation: Create_sor.Observation.locations[0],
      project: Create_sor.Observation.projects[0],
      curTime: '',
      suggestions: [],
      involvePersonSuggestions: [],
      actionRecommendations: [],
      filename: '',
      involvePersonText: '',
      actionRecommendationsText: '',
      classifySorbtns: classifySor,
      // esclateTo / submit To
      SelectsubmitTo: false,
      submitTo: Create_sor.Observation.submitTo[0],
      selectEsclateTo: false,
      esclateTo: Create_sor.Observation.esclateTo[0],
    };
  }

  // Document Picker and update the state
  pickupDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      this.setState({
        filename:
          res.name.length > 7
            ? res.name.substring(0, 8) + `...${res.type}`
            : res.name,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  // Extract Locations and Search in Suggestions Array
  extractLocation = (str: string) => {
    var location = filterLocation(str);
    if (location !== null) {
      this.setState({obserLocation: location[0].slice(1)});
    } else {
      this.setState({obserLocation: '@Add Location'});
    }
    var srchArr = searchInSuggestions(str, Create_sor.Observation.suggestions);
    this.setState({suggestions: [...srchArr], observationT: str});
  };
  // Search in InvolvePersons Array
  suggestInvolvePersons = (str: string) => {
    var srchSug = searchInSuggestions(
      str,
      Create_sor.Observation.emailSuggestions,
    );
    if (str == '') {
      this.setState({
        involvePersonSuggestions: [],
        involvePersonText: str,
      });
    } else {
      this.setState({
        involvePersonSuggestions: [...srchSug],
        involvePersonText: str,
      });
    }
  };
  // Search Action / Recommendation Suggestions
  actionRecommendSuggestion = (str: string) => {
    var srchSug = searchInSuggestions(
      str,
      Create_sor.Observation.actionOrRecommended,
    );
    if (str == '') {
      this.setState({
        actionRecommendations: [],
        actionRecommendationsText: str,
      });
    } else {
      this.setState({
        actionRecommendations: [...srchSug],
        actionRecommendationsText: str,
      });
    }
  };

  componentDidMount = () => {
    // Time Update on every seconds
    setInterval(() => {
      this.setState({
        curTime: moment().format('LT'),
        obserLocation: this.state.obserLocation
          ? this.state.obserLocation
          : '@Add Location',
      });
    }, 1000);
    this.AnimatedViews();
  };

  AnimatedViews = () => {
    Animated.timing(this.state.contentAnim, {
      toValue: wp(0),
      duration: 1500,
      easing: Easing.elastic(3),
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.initAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <Animated.View style={[styles.container, {opacity: this.state.initAnim}]}>
        {/* Header */}
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>ABC Systems</Text>
                <View style={styles.underScrore} />
              </View>
              <View style={styles.avatarView}>
                <Avatar
                  rounded
                  source={{
                    uri: Create_sor.user.profile,
                  }}
                />
              </View>
            </View>
            <View style={styles.headerSelect}>
              {/* Project selector */}
              <View style={styles.leftSelector}>
                <Text style={styles.hselectort}> Project : </Text>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.setState({selectP: !this.state.selectP});
                  // }}
                  style={styles.selector}>
                  <Text style={styles.selectorBox}>{this.state.project}</Text>
                </TouchableOpacity>
                <Icon
                  style={{padding: 3}}
                  size={10}
                  name="down"
                  type="antdesign"
                  color={colors.secondary}
                />
                {this.state.selectP == true ? (
                  <View style={styles.slctContainer}>
                    {Create_sor.Observation.projects.map((d, i) => (
                      <Text
                        key={i}
                        onPress={() => this.setState({project: d})}
                        style={styles.itemH}>
                        {d.length > 7 ? d.substring(0, 8) + '...' : d}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
              {/* Location selector */}

              <TouchableOpacity
                onPress={() => console.log('sds')}
                style={styles.rightSelector}>
                <Text style={styles.hselectort}> Location : </Text>
                <TouchableOpacity style={styles.selector}>
                  <Text style={styles.selectorBox}>
                    {this.state.currentlocation}
                  </Text>
                </TouchableOpacity>
                <Icon
                  style={{padding: 3}}
                  size={10}
                  name="down"
                  type="antdesign"
                  color={colors.secondary}
                />
                {this.state.selectL == true ? (
                  <View style={[styles.slctContainer, {left: wp(15)}]}>
                    {Create_sor.Observation.locations.map((d, i) => (
                      <Text
                        key={i}
                        onPress={() => this.setState({currentlocation: d})}
                        style={styles.itemH}>
                        {d.length > 7 ? d.substring(0, 7) + '...' : d}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          {/* content */}
          <Animated.View
            style={[
              styles.content,
              {
                marginTop: this.state.contentAnim,
              },
            ]}>
            <Text style={styles.cnHeading}>Create New SOR</Text>
            {/* Observation Details */}
            <Text style={styles.observationT}>Observation Detail</Text>
            <View style={styles.observationDetail}>
              <Text style={styles.obserttle}>
                On {moment().format('MMMM DD')}, {moment().format('YYYY')} at
                about {this.state.curTime} it was observed that
              </Text>
              <TextInput
                multiline={true}
                value={this.state.observationT}
                underlineColorAndroid="transparent"
                placeholder="Enter your observation here"
                onChange={(t) => this.extractLocation(t.nativeEvent.text)}
                style={styles.obInputText}></TextInput>
              <Text style={styles.obText}>
                at{' '}
                <Text style={{color: colors.primary}}>
                  {this.state.obserLocation}
                </Text>{' '}
                and it happend at
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={{marginTop: wp(1)}}
                  size={15}
                  name="calendar-clock"
                  type="material-community"
                  color={'black'}
                />
                <Text
                  style={{
                    fontSize: wp(3),
                    fontWeight: 'bold',
                    marginTop: wp(1),
                    marginLeft: wp(1),
                  }}>
                  <Text style={{color: colors.primary}}>
                    {moment().format('MMMM DD, YYYY')}
                  </Text>{' '}
                  at about{' '}
                  <Text style={{color: colors.primary}}>
                    {moment().format('LT')}
                  </Text>
                </Text>
              </View>
            </View>
            {/* Suggestions  */}
            {this.state.suggestions.length != 0 ? (
              <Suggestions
                styles={{}}
                arr={this.state.suggestions}
                onPress={(d: any) => this.setState({observationT: d})}
              />
            ) : null}

            {/* Classify SOR */}
            <View style={styles.clasSorContainer}>
              <Text style={styles.clasSorHeading}>Classify SOR</Text>
              <View style={styles.clasSorBtnV}>
                {this.state.classifySorbtns.map((d: any, i: any) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      var classifySorbtns = [...this.state.classifySorbtns];
                      classifySorbtns[i].selected = !this.state.classifySorbtns[
                        i
                      ].selected;
                      classifySorbtns[i];
                      this.setState(classifySorbtns);
                    }}
                    style={[
                      styles.clasSorBtnCont,
                      {borderColor: d.color},
                      d.selected ? {backgroundColor: d.color} : {},
                    ]}>
                    <View style={styles.clasSorBtnWrap}>
                      <Icon
                        size={17}
                        name={d.icon}
                        type={d.type}
                        color={d.selected ? '#fff' : d.color}
                      />
                      <Text
                        style={[
                          styles.clasSorBtnTtl,
                          {
                            color: d.selected ? '#fff' : d.color,
                          },
                        ]}>
                        {d.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Involved Persons */}
            <View style={styles.involvePContainer}>
              <Text style={styles.involvePText}>
                Involved Person{' '}
                <Text style={styles.involvePTextOtional}>(Optional)</Text>
              </Text>
              <TextInput
                value={this.state.involvePersonText}
                style={styles.involvePInput}
                onChangeText={(e) => this.suggestInvolvePersons(e)}
                placeholder={'Enter person name /email'}
              />
              {this.state.involvePersonSuggestions.length != 0 ? (
                <View style={styles.involveSuggestCont}>
                  {this.state.involvePersonSuggestions.map(
                    (d: any, i: number) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() =>
                          this.setState({
                            involvePersonText: d,
                            involvePersonSuggestions: [],
                          })
                        }
                        style={[
                          styles.involvePsuggCont,
                          this.state.involvePersonSuggestions.length == i + 1
                            ? {borderBottomWidth: wp(0)}
                            : null,
                        ]}>
                        <Avatar
                          containerStyle={{marginRight: wp(3)}}
                          rounded
                          source={{
                            uri:
                              'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                          }}
                        />
                        <Text style={styles.involvePSt}>{d}</Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              ) : null}
            </View>

            {/* Attachment / Upload files */}
            <View style={styles.uploadBorder}>
              <View style={styles.uploadBIcmTxt}>
                <Icon
                  style={{padding: 3}}
                  size={wp(10)}
                  name="file-text"
                  type="feather"
                  color={colors.primary}
                />
                <Text style={styles.uplaodText}>
                  Drag and drop your files to start upload{' '}
                </Text>
              </View>
              {this.state.filename != '' ? (
                <Text style={styles.uplaodText}>{this.state.filename}</Text>
              ) : null}

              <TouchableOpacity
                onPress={() => this.pickupDoc()}
                style={styles.uplaodBtn}>
                <Text style={styles.uploadfileText}>Upload File</Text>
              </TouchableOpacity>
            </View>
            {/* Risk Chart*/}
            <View>
              <Text style={styles.RiskHeading}>Risk</Text>
              <Chart
                style={{alignSelf: 'center', marginTop: wp(3)}}
                onPress={(v: number) => console.log(v)}
              />
            </View>
            {/* Actions/Recommendation */}
            <View style={styles.actionContainer}>
              <Text style={styles.actionsRecHeading}>
                Actions / Recommendation
              </Text>
              <TextInput
                style={styles.actionInput}
                value={this.state.actionRecommendationsText}
                onChangeText={(e) => this.actionRecommendSuggestion(e)}
                placeholder={'Enter person name /email'}
              />

              {/* Suggestions  */}
              {this.state.actionRecommendations.length != 0 ? (
                <Suggestions
                  styles={{}}
                  arr={this.state.actionRecommendations}
                  onPress={(d: any) =>
                    this.setState({actionRecommendationsText: d})
                  }
                />
              ) : null}
            </View>
            {/* Submit To / Esclate To */}
            <View style={styles.optnToggleContainer}>
              <View>
                <Text style={styles.sbBtnText}>Submit to</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      SelectsubmitTo: !this.state.SelectsubmitTo,
                    })
                  }
                  style={styles.optnselector}>
                  <Text style={styles.optnselectorText}>
                    {this.state.submitTo}
                  </Text>
                  <Icon
                    // style={{padding: }}
                    size={wp(5)}
                    name="down"
                    type="antdesign"
                    color={colors.primary}
                  />
                </TouchableOpacity>
                {this.state.SelectsubmitTo == true ? (
                  <View style={styles.slctSEContainer}>
                    {Create_sor.Observation.submitTo.map((d, i) => (
                      <Text
                        key={i}
                        onPress={() =>
                          this.setState({submitTo: d, SelectsubmitTo: false})
                        }
                        style={[
                          styles.seitemH,
                          Create_sor.Observation.esclateTo.length == i + 1
                            ? {borderBottomWidth: wp(0)}
                            : null,
                        ]}>
                        {d}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
              <View>
                <Text style={styles.sbBtnText}>Escalate to</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      selectEsclateTo: !this.state.selectEsclateTo,
                    })
                  }
                  style={styles.optnselector}>
                  <Text style={styles.optnselectorText}>
                    {this.state.esclateTo}
                  </Text>
                  <Icon
                    // style={{padding: }}
                    size={wp(5)}
                    name="down"
                    type="antdesign"
                    color={colors.primary}
                  />
                </TouchableOpacity>
                {this.state.selectEsclateTo == true ? (
                  <View style={styles.slctSEContainer}>
                    {Create_sor.Observation.esclateTo.map((d, i) => (
                      <Text
                        key={i}
                        onPress={() => {
                          this.setState({esclateTo: d, selectEsclateTo: false});
                          console.log(i);
                        }}
                        style={[
                          styles.seitemH,
                          Create_sor.Observation.esclateTo.length == i + 1
                            ? {borderBottomWidth: wp(0)}
                            : null,
                        ]}>
                        {d}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>
            {/* Draft And Submit Btns */}
            <View style={styles.submitsorbtn}>
              <Text style={styles.submitsorbtntxt}>Save as Draft</Text>
            </View>
            <View style={styles.submitsorbtnSb}>
              <Text style={styles.submitsorbtnSbtxt}>Submit</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CreateSOR);
