import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import {colors, GlStyles, images, fonts} from '@theme';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import {classifySor} from '@utils';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, myTasks, recentActivity} from '@service';
import {ListCard} from '@components';
import {route} from '@nav';
import {PieChart} from 'react-native-svg-charts';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import {connect} from '../../decorators/index';
type ViewAllNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'MyTasks'
>;
type ViewAllRouteProp = RouteProp<StackNavigatorProps, 'MyTasks'>;

export interface ViewAllProps {
  route: ViewAllRouteProp;
  navigation: ViewAllNavigationProp;
  reduxActions: any;
  reduxState: any;
}

class ViewAll extends React.Component<ViewAllProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedStats: 1,
      searchValue: '',
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.orgTitle}>Recently Activity</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: wp(0),
                  alignSelf: 'center',
                }}>
                <Avatar
                  rounded
                  source={{
                    uri: View_sor.user.profile,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.content}>
            {/* <Text style={styles.recentlyText}>Recently Activity</Text> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ViewAll;
