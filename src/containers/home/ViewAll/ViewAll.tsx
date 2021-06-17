import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  TextInput,
  Animated,
} from 'react-native';
import {colors, GlStyles, images, fonts} from '@theme';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import * as reduxActions from '../../../store/actions/listSorActions';

import styles from './styles';
import {allRecentActivity, createApi} from '@service';
import {classifySor, filterAndMappingPersons, getCurrentProject} from '@utils';
import {Avatar, Icon} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {View_sor, myTasks, recentActivity} from '@service';
import {ListCard} from '@components';
// import {colors} from '@theme';
import {route} from '@nav';
import {PieChart} from 'react-native-svg-charts';
import {AllSorDTO} from '@dtos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {animation} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {report} from '@typings';
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
  reduxState: AllSorDTO;
}
class ViewAll extends React.Component<ViewAllProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedStats: 1,
      reports: [],
      data: this.props.route.params.title,
      searchValue: '',
      refreshing: false,
      user: {},
      projectId: '',
      bottomWidth: wp(100),
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('email').then((email: any) => {
      createApi
        .createApi()
        .getUser(email)
        .then((user: any) => {
          this.setState({user: user.data.data});
        });
    });

    getCurrentProject().then((currentProj: any) => {
      this.setState({projectId: currentProj});

      createApi
        .createApi()
        .getProject({projectid: currentProj})
        .then((currentProj: any) => {
          var data = {
            project: this.state.currentProj,
            limit: 100000,
            page: 0,
            query: {status: [this.props.route.params.data]},
          };

          createApi
            .createApi()
            .filterSors(data)
            .then((res: any) => {
              var sors = [];
              for (let i = 0; i < res.data.data.report.length; i++) {
                var rep = filterAndMappingPersons(
                  res.data.data.report[i],
                  currentProj.data.data.involved_person,
                );

                sors.push(rep);
              }

              this.setState({loading: false});

              this.setState({reports: sors});
            })
            .catch((err) => {
              this.setState({loading: false});
            });
        });

      this.setState({loading: true});
    });
  }

  _onRefresh = () => {
    this.setState({
      draft: [],
      submitted: [],
      exclated: [],
      inprogress: [],
      completed: [],
    });
    this.componentDidMount();
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this._onRefresh()}
              refreshing={this.state.refreshing}
            />
          }>
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
                    uri: this.state.user.img_url,
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
                {this.state.reports.map((d: any, i: number) => (
                  <ListCard
                    key={i}
                    classify={d.sor_type}
                    styles={
                      myTasks.rercently.length == i + 1
                        ? {borderBottomWidth: wp(0)}
                        : null
                    }
                    user1={
                      d.involved_persons.length == 0
                        ? ''
                        : d.involved_persons[0].img_url
                    }
                    user2={
                      d.submit_to.length == 0 ? '' : d.submit_to[0].img_url
                    }
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

const mapStateToProps = (state: AllSorDTO) => ({
  reduxState: state.allSors,
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);
