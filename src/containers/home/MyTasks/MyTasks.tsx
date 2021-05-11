import * as React from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {colors, GlStyles, images, fonts} from '@theme';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import {classifySor} from '@utils';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, myTasks} from '@service';
import {ListCard} from '@components';
import {route} from '@nav';
import {PieChart} from 'react-native-svg-charts';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import {connect} from '../../decorators/index';
type MyTasksScreenNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'MyTasks'
>;
type MyTasksRouteProp = RouteProp<StackNavigatorProps, 'MyTasks'>;

export interface MyTasksProps {
  route: MyTasksRouteProp;
  navigation: MyTasksScreenNavigationProp;
  reduxActions: any;
  reduxState: any;
}

class MyTasks extends React.Component<MyTasksProps, any> {
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
                <Text style={styles.orgTitle}>My Tasks</Text>
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
            <View style={styles.recentlyAssigned}>
              {/* Search */}
              <View style={styles.searchContrainer}>
                <Icon
                  containerStyle={{marginRight: wp(3)}}
                  name={'search'}
                  type={'Entypo'}
                  color={colors.lightGrey}
                  size={wp(5)}
                />
                <TextInput
                  style={styles.textInput}
                  value={this.state.searchValue}
                  placeholder={'Search tasks'}
                  onChange={(e) =>
                    this.setState({searchValue: e.nativeEvent.text})
                  }
                />
              </View>
              {/* Recently Assigned  */}
              <View style={styles.recentlyContent}>
                <View style={styles.recentlyHeader}>
                  <Text style={styles.recentlyText}>Recently Assigned</Text>
                  <Text style={styles.viewAll}>View All</Text>
                </View>
                <View style={styles.recentlyContentItem}>
                  {myTasks.rercently.map((d, i) => (
                    <ListCard
                      classify={d.classify}
                      styles={
                        myTasks.rercently.length == i + 1
                          ? {borderBottomWidth: wp(0)}
                          : null
                      }
                      user1={d.user1}
                      user2={d.user2}
                      observation={d.observation}
                      username={d.username}
                      iconconf={classifySor.find(
                        (e: any) => e.title == d.classify,
                      )}
                      onPress={() =>
                        this.props.navigation.navigate('ViewSOR', {data: d})
                      }
                      date={d.date}
                    />
                  ))}
                </View>
              </View>
            </View>
            {/* Created By You */}
            <View style={styles.createdByYou}>
              <View style={styles.recentlyContent}>
                <View style={styles.recentlyHeader}>
                  <Text style={styles.recentlyText}>Created by You</Text>
                  <Text style={styles.viewAll}>View All</Text>
                </View>
                <View style={styles.recentlyContentItem}>
                  {myTasks.CreatedByYou.map((d, i) => (
                    <ListCard
                      classify={d.classify}
                      styles={
                        myTasks.rercently.length == i + 1
                          ? {borderBottomWidth: wp(0)}
                          : null
                      }
                      user1={d.user1}
                      user2={d.user2}
                      observation={d.observation}
                      username={d.username}
                      iconconf={classifySor.find(
                        (e: any) => e.title == d.classify,
                      )}
                      onPress={() =>
                        this.props.navigation.navigate('ViewSOR', {data: d})
                      }
                      date={d.date}
                    />
                  ))}
                </View>
              </View>
            </View>
            {/* Involved */}
            <View style={styles.createdByYou}>
              <View style={styles.recentlyContent}>
                <View style={styles.recentlyHeader}>
                  <Text style={styles.recentlyText}>Involved</Text>
                  <Text style={styles.viewAll}>View All</Text>
                </View>
                <View style={styles.recentlyContentItem}>
                  {myTasks.involved.map((d, i) => (
                    <ListCard
                      classify={d.classify}
                      styles={
                        myTasks.rercently.length == i + 1
                          ? {borderBottomWidth: wp(0)}
                          : null
                      }
                      user1={d.user1}
                      user2={d.user2}
                      observation={d.observation}
                      username={d.username}
                      iconconf={classifySor.find(
                        (e: any) => e.title == d.classify,
                      )}
                      onPress={() =>
                        this.props.navigation.navigate('ViewSOR', {data: d})
                      }
                      date={d.date}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    reduxState: state.reducers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // reduxActions: bindActionCreators(reduxActions.default, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);
