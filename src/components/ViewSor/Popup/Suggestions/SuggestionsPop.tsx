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
    console.log(props.suggestions.AssignedTo);
  }

  componentDidMount = () => {};

  render() {
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
              size={wp(3.5)}
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
          <View style={{alignSelf: 'flex-start'}}>
            <Text
              style={{
                fontSize: wp(3),
                textAlign: 'left',
                marginLeft: wp(7),
                marginBottom: wp(2),
              }}>
              Recommendations
            </Text>
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
          {/* Assdigned to */}
          <View style={{alignSelf: 'flex-start'}}>
            <Text
              style={{
                fontSize: wp(3),
                textAlign: 'left',
                marginLeft: wp(7),
                marginTop: wp(3),
                marginBottom: wp(2),
              }}>
              Tag Assigners
            </Text>
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
          </View>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            <Tags
              onClose={(d: any) => {
                this.setState({
                  AssignedTo: this.state.AssignedTo.filter((v: any) => v !== d),
                });
              }}
              tags={this.state.AssignedTo}
            />
          </View>
        </View>
      </Model>
    );
  }
}
