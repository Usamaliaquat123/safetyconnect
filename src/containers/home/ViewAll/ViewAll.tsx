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
import {allRecentActivity, createApi} from '@service';
import {classifySor} from '@utils';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, myTasks, recentActivity} from '@service';
import {ListCard} from '@components';
// import {colors} from '@theme';
import {route} from '@nav';
import {PieChart} from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {animation} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

// import {connect} from '../../decorators/index';
// import {color} from 'react-native-reanimated';
type ViewAllNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ViewAll'
>;
type ViewAllRouteProp = RouteProp<StackNavigatorProps, 'ViewAll'>;

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
      reports: [],
      data: this.props.route.params.title,
      searchValue: '',
      bottomWidth: wp(100),
    };
  }

  componentDidMount = async () => {
    this.setState({loading: true});

    console.log(this.state.data);
    await createApi
      .createApi()
      .filterSors({
        project: '604b13d114ba138bd23d7f75',
        limit: 100,
        page: 0,
        query: {status: [this.props.route.params.data]},
      })
      .then(async (res: any) => {
        console.log(res.data.data);
        if (res.data.data.involved_persons !== undefined) {
          await AsyncStorage.setItem(
            'involved_persons',
            JSON.stringify(res.data.data.involved_persons),
          );
          this.setState({loading: false});
        } else {
          this.setState({loading: false});
        }
        this.setState({reports: res.data.data.report});
      })
      .catch((err) => console.log(err));
  };

  componentWillUnmount = () => {
    this.setState({reports: []});
  };

  render() {
    console.log(this.state.reports);
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
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
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.orgTitle}>
                  {this.props.route.params.title}
                </Text>
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
            {this.state.loading == true ? (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: wp(40),
                  marginBottom: wp(40),
                }}>
                <LottieView
                  // ref={(animation) => {
                  //   this.photoAnim = animation;
                  // }}
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
                <Text
                  style={{
                    fontSize: wp(3),
                    opacity: 0.5,
                    textAlign: 'center',
                    marginTop: wp(-5),
                  }}>
                  loading...
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: colors.secondary,
                  padding: wp(3),
                  // paddingBottom: this.state.bottomWidth,
                  paddingLeft: wp(5),

                  paddingRight: wp(3),
                  borderTopLeftRadius: wp(4),
                  borderTopRightRadius: wp(4),
                }}>
                {this.props.route.params.data.map((d, i) => (
                  <ListCard
                    classify={d.sor_type}
                    styles={
                      myTasks.rercently.length == i + 1
                        ? {borderBottomWidth: wp(0)}
                        : null
                    }
                    user1={d.user1}
                    user2={d.user2}
                    observation={d.details}
                    username={d.created_by}
                    iconconf={classifySor.find(
                      (e: any) => e.title == d.sor_type,
                    )}
                    onPress={() =>
                      this.props.navigation.navigate('ViewSOR', {data: d})
                    }
                    date={d.occured_at}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ViewAll;
