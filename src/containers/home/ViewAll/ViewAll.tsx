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
import {ListCard, Card} from '@components';
// import {colors} from '@theme';
import {route} from '@nav';
import {PieChart} from 'react-native-svg-charts';
import {AllSorDTO} from '@dtos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {animation} from '@theme';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {report, involved_persons} from '@typings';
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
      repeatedSors: [],
      involvedPerson: [],
      repeatedSorModal: false,
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

    if (typeof this.props.route.params.data == 'number') {
      getCurrentProject().then((currentProj: any) => {
        console.log(currentProj);
        this.setState({projectId: currentProj});

        createApi
          .createApi()
          .getProject({projectid: currentProj})
          .then((currentProj: any) => {
            var data = {
              project: currentProj.data.data._id,
              limit: 100000,
              page: 0,
              query: {status: [this.props.route.params.data]},
            };

            console.log(currentProj.data.data.involved_persons);

            // AsyncStorage.setItem(
            //   'involved_person',
            //   JSON.stringify(this.state.involvedPerson),
            // );
            // });

            createApi
              .createApi()
              .filterSors(data)
              .then((res: any) => {
                console.log(res);
                // console.log(currentProj.data.data.);
                var sors = [];
                for (let i = 0; i < res.data.data.report.length; i++) {
                  console.log(res.data.data.report[i]);

                  var rep = filterAndMappingPersons(
                    res.data.data.report[i],
                    currentProj.data.data.involved_persons,
                  );

                  console.log(res.data.data.report[i]);
                  sors.push(rep);
                }
                console.log('sors');
                console.log(sors);

                this.setState({loading: false});

                this.setState({reports: sors});
              })
              .catch((err) => {
                this.setState({loading: false});
              });
          });

        this.setState({loading: true});
      });
    } else {
      this.setState({reports: this.props.route.params.data});
    }
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
  getAllRepeatedSor = (e: any) => {
    this.setState({repeatedSors: []});
    for (let i = 0; i < e.length; i++) {
      createApi
        .createApi()
        .getSors(this.state.projectId, e[i])
        .then((res: any) => {
          console.log(res.data.data.report[0]);
          this.state.repeatedSors.push(res.data.data.report[0]);
          this.setState({});
        });
    }

    setTimeout(() => {
      this.setState({repeatedSorModal: true});
    }, 2000);
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
                    location={d.location}
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
                    repeated={d.repeatedSor}
                    iconconf={classifySor.find(
                      (e: any) => e.title == d.sor_type,
                    )}
                    onPress={() =>
                      this.props.navigation.navigate('ViewSOR', {data: d})
                    }
                    date={d.occured_at}
                    onPressRepeated={(e) => this.getAllRepeatedSor(e)}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
        <Modal
          animationInTiming={1000}
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          animationOutTiming={1000}
          useNativeDriver={true}
          onBackdropPress={() => this.setState({repeatedSorModal: false})}
          isVisible={this.state.repeatedSorModal}>
          <View
            style={{
              padding: wp(5),
              backgroundColor: colors.secondary,
              borderRadius: wp(2),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: wp(4),
                  fontFamily: fonts.SFuiDisplayBold,
                  marginBottom: wp(3),
                }}>
                Repeated SOR
              </Text>
              <Icon
                onPress={() => this.setState({repeatedSorModal: false})}
                name={'cross'}
                size={wp(5)}
                type={'entypo'}
              />
            </View>
            {this.state.repeatedSors.map((d: Isor, i: number) => (
              <Card
                key={i}
                // type={'all'}
                data={d}
                onPress={(d: Isor) =>
                  this.props.navigation.navigate('ViewSOR', {
                    data: d,
                  })
                }
                name={d.created_by}
                date={d.occured_at}
                risk={d.risk.severity * d.risk.likelihood}
                viewPortWidth={80}
                observation={d.details}
                classify={d.sor_type}
                iconConf={classifySor.find((e: any) => e.title == d.sor_type)}
                location={d.location}
                style={[
                  styles.draftCardContainer,
                  // {marginBottom: wp()},
                ]}
                user1={d.user1}
                user2={d.user2}
              />
            ))}
          </View>
        </Modal>
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
