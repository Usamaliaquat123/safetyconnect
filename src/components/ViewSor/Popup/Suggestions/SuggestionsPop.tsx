import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {default as Model} from 'react-native-modal';
import {Icon} from 'react-native-elements';
import styles from './styles';
import {Tags, Suggestions} from '@components';
import {colors, fonts} from '@theme';
import {Avatar} from 'react-native-elements';
import {Create_sor} from '@service';
import {searchInSuggestions} from '@utils';
import {involved_persons} from '@typings';
import moment from 'moment';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
export interface SuggestionsPopProps {
  onClose: Function;
  isOpen: boolean;
  suggestions: Array<any>;
  save: Function;
  discard: Function;
  suggestedUsers: Array<involved_persons>;
  allSuggestions: Array<any>;
}

export default class SuggestionsPop extends React.Component<
  SuggestionsPopProps,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      suggestedUsers: props.suggestedUsers,
      observation: props.suggestions.content,
      submittedTo: props.suggestions.SubmittedTo,
      type: props.suggestions.category,
      status: props.suggestions.status,
      suggestions: [],
      is_complete: props.suggestions.is_complete,
      is_selected: props.suggestions.is_selected,
      AssignedTo:
        typeof props.suggestions.assigned_to == 'string'
          ? [props.suggestions.assigned_to]
          : props.suggestions.assigned_to,
      actionsText: '',
      selectedInput: 0,
    };
  }

  componentDidMount = () => {};

  render() {
    // console.log(this.props.suggestions.status);
    return (
      <Model
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        animationInTiming={1000}
        animationOutTiming={1000}
        isVisible={this.props.isOpen}
        onBackdropPress={() => this.props.onClose()}>
        <View style={styles.containerPopup}>
          <View style={styles.containerText}>
            <Icon
              style={{}}
              size={wp(5)}
              name="checkcircle"
              onPress={() => this.setState({status: !this.state.status})}
              type="antdesign"
              color={
                this.state.is_complete == true ? colors.green : colors.lightGrey
              }
            />
            <Text style={styles.containerTextString}>
              Action / Recommendation
            </Text>
          </View>
          {/* Content */}
          <View style={{alignSelf: 'flex-start', marginTop: wp(5)}}>
            <Text style={styles.recommendationsHead}>Recommendations</Text>
          </View>
          <View
            style={[
              styles.commentTextInput,
              this.state.selectedInput == 1
                ? {borderColor: colors.green, borderWidth: wp(0.3)}
                : {borderColor: colors.lightGrey},
            ]}>
            <TextInput
              // maxLength={20}
              onFocus={() => this.setState({selectedInput: 1})}
              style={styles.textInputPopup}
              multiline={true}
              value={this.state.observation}
              onChange={(e) => {
                // console.log(e.nativeEvent.text);
                this.setState({observation: e.nativeEvent.text});
              }}
              placeholder={
                this.state.observation === ''
                  ? 'Type your recommendations here '
                  : this.state.observation
              }
            />
          </View>
          {this.state.AssignedTo != undefined && (
            <>
              {this.state.AssignedTo.length >= 1 && (
                <View style={{alignSelf: 'center'}}>
                  <Text style={styles.assignersHead}>Assigners</Text>
                </View>
              )}
              {this.state.AssignedTo.length < 1 && (
                <View>
                  {/* Assdigned to */}
                  <View style={{alignSelf: 'flex-start'}}>
                    <Text style={styles.tagAssigners}>Tag Assigners</Text>
                  </View>
                  {/* Assigners */}
                  {this.state.AssignedTo.length < 1 && (
                    <Text
                      style={{
                        fontSize: wp(3),
                        marginBottom: wp(3),
                        color: colors.error,
                      }}>
                      You have to assign someone..
                    </Text>
                  )}
                  <View
                    style={[
                      styles.commentTextInput,
                      this.state.selectedInput == 2
                        ? {borderColor: colors.green, borderWidth: wp(0.3)}
                        : {borderColor: colors.lightGrey},
                    ]}>
                    <TextInput
                      maxLength={500}
                      onFocus={() => this.setState({selectedInput: 2})}
                      style={styles.textInputPopup}
                      multiline={true}
                      value={this.state.actionsText}
                      onChange={(e) => {
                        this.setState({
                          suggestions: searchInSuggestions(
                            e.nativeEvent.text,
                            this.state.suggestedUsers,
                          ),
                        });
                        this.setState({actionsText: e.nativeEvent.text});
                      }}
                      placeholder={'Type assigner email address'}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        this.state.AssignedTo.push(this.state.actionsText);
                        this.setState({actionsText: ''});
                      }}
                      style={styles.arrowRightAssigners}>
                      <Icon
                        size={wp(5)}
                        name="arrowright"
                        type="antdesign"
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* Suggestions  */}
                  {this.state.suggestions.length != 0 ? (
                    // <Suggestions
                    //   styles={{}}
                    //   arr={this.state.suggestions}
                    //   onPress={(d: string) => this.setState({observationT: d})}
                    // />

                    // {this.state.involvePersonSuggestions.length != 0 ? (
                    <View style={styles.involveSuggestCont}>
                      {this.state.suggestions.map(
                        (d: involved_persons, i: number) => (
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
                              this.state.suggestions.length == i + 1
                                ? {borderBottomWidth: wp(0)}
                                : null,
                            ]}>
                            <Avatar
                              containerStyle={{marginRight: wp(3)}}
                              rounded
                              source={{
                                uri: d.img_url,
                              }}
                            />
                            <View>
                              <Text style={styles.involvePSt}>{d.name}</Text>
                              <Text style={{fontSize: wp(2.5)}}>{d.email}</Text>
                            </View>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  ) : // ) : null}

                  null}
                </View>
              )}
              <View style={styles.tagsContainer}>
                {this.state.AssignedTo.length != 0 ? (
                  <Tags
                    type={'suggAndRecommendationsPopup'}
                    onClose={(d: any) => {
                      this.setState({
                        AssignedTo: [],
                      });
                    }}
                    tags={this.state.AssignedTo}
                  />
                ) : null}
              </View>
              {/* Elimination / Administrative */}
              <Text style={styles.selectYourElemination}>
                Select your elimination / Administrative
              </Text>
              <View style={styles.eleminationAndAdministrativeContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({type: 'Elimination'});
                  }}
                  style={{marginLeft: wp(2), marginRight: wp(2)}}>
                  <Icon
                    //@ts-ignore
                    size={wp(7)}
                    name="team"
                    type="antdesign"
                    color={
                      this.state.type == 'Elimination'
                        ? colors.green
                        : colors.lightGrey
                    }
                  />
                  <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                    Elimination
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({type: 'Admin'});
                  }}
                  style={{marginLeft: wp(2), marginRight: wp(2)}}>
                  <Icon
                    size={wp(7)}
                    name="admin-panel-settings"
                    type="material"
                    color={
                      this.state.type == 'Admin'
                        ? colors.green
                        : colors.lightGrey
                    }
                  />
                  <Text style={{fontSize: wp(2.5), opacity: 0.5}}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({type: 'Substitution'});
                  }}
                  style={{marginLeft: wp(2), marginRight: wp(2)}}>
                  <Icon
                    size={wp(7)}
                    name="unlink"
                    type="font-awesome"
                    color={
                      this.state.type == 'Substitution'
                        ? colors.green
                        : colors.lightGrey
                    }
                  />
                  <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                    Substitution
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({type: 'Engineering'});
                  }}
                  style={{marginLeft: wp(2), marginRight: wp(2)}}>
                  <Icon
                    size={wp(7)}
                    name="engineering"
                    type="material"
                    color={
                      this.state.type == 'Engineering'
                        ? colors.green
                        : colors.lightGrey
                    }
                  />
                  <Text style={{fontSize: wp(2.5), opacity: 0.5}}>
                    Engineering
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({type: 'PPE'});
                  }}
                  style={{marginLeft: wp(2), marginRight: wp(2)}}>
                  <Icon
                    size={wp(7)}
                    name="engineering"
                    type="material"
                    color={
                      this.state.type == 'PPE' ? colors.green : colors.lightGrey
                    }
                  />
                  <Text
                    style={{
                      fontSize: wp(2.5),
                      opacity: 0.5,
                      textAlign: 'center',
                    }}>
                    PPE
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.discard();
                  }}
                  style={styles.btnDiscard}>
                  <Text style={styles.btnDiscardText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.AssignedTo.length != 0) {
                      var sugg = {
                        // status: this.state.status,
                        content: this.state.observation,
                        assigned_to: this.state.AssignedTo[0],
                        date: moment().format('YYYY-MM-DD'),
                        is_complete: this.state.is_complete,
                        is_selected: this.state.is_selected,
                        category: this.state.type,
                      };
                      this.props.save(sugg);
                    }
                  }}
                  style={styles.saveBtn}>
                  <Text style={styles.sveBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Model>
    );
  }
}
