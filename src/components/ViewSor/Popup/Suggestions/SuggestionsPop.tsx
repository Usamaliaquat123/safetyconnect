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
import {Tags} from '@components';
import {colors} from '@theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
export interface SuggestionsPopProps {
  onClose: Function;
  isOpen: boolean;
  suggestions: Array<any>;
  save: Function;
  discard: Function;
}

export default class SuggestionsPop extends React.Component<
  SuggestionsPopProps,
  any
> {
  constructor(props: any) {
    super(props);

    this.state = {
      observation: props.suggestions.observation,
      submittedTo: props.suggestions.SubmittedTo,
      type: props.suggestions.type,
      status: props.suggestions.status,

      AssignedTo: props.suggestions.AssignedTo,
      actionsText: '',
    };
  }

  componentDidMount = () => {};

  render() {
    console.log(this.props.suggestions);
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
              style={{marginRight: wp(15)}}
              size={wp(5)}
              name="checkcircle"
              type="antdesign"
              color={
                this.state.status == 'Completed'
                  ? colors.green
                  : colors.lightGrey
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
          <View style={styles.commentTextInput}>
            <TextInput
              style={styles.textInputPopup}
              multiline={true}
              value={this.state.observation}
              onChange={(e) => {
                this.setState({observation: e.nativeEvent.text});
              }}
              placeholder={'Type your recommendations here '}
            />
          </View>
          {this.state.AssignedTo != undefined && (
            <>
              {this.state.AssignedTo.length >= 5 && (
                <View style={{alignSelf: 'center'}}>
                  <Text style={styles.assignersHead}>Assigners</Text>
                </View>
              )}
              {this.state.AssignedTo.length < 5 && (
                <View>
                  {/* Assdigned to */}
                  <View style={{alignSelf: 'flex-start'}}>
                    <Text style={styles.tagAssigners}>Tag Assigners</Text>
                  </View>
                  <View style={[styles.commentTextInput]}>
                    <TextInput
                      style={styles.textInputPopup}
                      multiline={true}
                      value={this.state.actionsText}
                      onChange={(e) => {
                        this.setState({actionsText: e.nativeEvent.text});
                      }}
                      placeholder={'Type assigner email address'}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        console.log(this.state.actionsText);
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
                </View>
              )}
              <View style={styles.tagsContainer}>
                <Tags
                  onClose={(d: any) => {
                    this.setState({
                      AssignedTo: this.state.AssignedTo.filter(
                        (v: any) => v !== d,
                      ),
                    });
                  }}
                  tags={this.state.AssignedTo}
                />
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
                  style={{marginRight: wp(20)}}>
                  <Icon
                    size={wp(10)}
                    name="team"
                    type="antdesign"
                    color={
                      this.state.type == 'Elimination'
                        ? colors.green
                        : colors.lightGrey
                    }
                  />
                  <Text style={{fontSize: wp(3), opacity: 0.5}}>
                    Elimination
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({type: 'Administrative'});
                  }}>
                  <Icon
                    size={wp(10)}
                    name="admin-panel-settings"
                    type="material"
                    color={
                      this.state.type == 'Administrative'
                        ? colors.green
                        : colors.lightGrey
                    }
                  />
                  <Text style={{fontSize: wp(3), opacity: 0.5}}>
                    Administrative
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.btnDiscard}>
                  <Text style={styles.btnDiscardText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn}>
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
