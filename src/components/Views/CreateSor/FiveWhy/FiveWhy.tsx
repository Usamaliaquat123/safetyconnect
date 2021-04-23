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
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <View style={this.props.containerStyle}>
        <Text style={styles.conduct5whyanaHeading}>
          Conduct Five WHY analysis
        </Text>

        {/* Five WHY Questionaries Container */}
        <View style={styles.questionandAnswerContainer}>
          {/* Question */}
          <TextInput style={styles.qInputContainer} placeholder={'Add WHY'} />
          {/* Answer */}
          <TextInput
            style={styles.aInputContainer}
            multiline={true}
            placeholder={'Add Answer'}
          />
        </View>
      </View>
    );
  }
}
