import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';
import {Icon, Avatar, Card} from 'react-native-elements';
import {colors, GlStyles, animation} from '@theme';
import {View_sor} from '@service';
import {downloadFile} from '@utils';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
type ViewSORNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'ViewSOR'
>;
type ViewSORRouteProp = RouteProp<StackNavigatorProps, 'ViewSOR'>;

export interface ViewSORProps {
  route: ViewSORRouteProp;
  navigation: ViewSORNavigationProp;
  reduxActions: any;
  reduxState: any;
}

class ViewSOR extends React.Component<ViewSORProps, any> {
  public animation: any;
  public photoAnim: any;
  constructor(props: any) {
    super(props);
    this.state = {
      initAnim: new Animated.Value(0),
      contentAnim: new Animated.Value(80),
    };
    this.animation = React.createRef();
    this.photoAnim = React.createRef();
    console.log(this.props.route.params.data);
  }

  componentDidMount = () => {
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
  render() {
    console.log(this.state.contentAnim);
    return (
      <Animated.View style={[styles.container, {opacity: this.state.initAnim}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                <Text style={styles.title}>SOR Report</Text>
                <View style={styles.underScrore} />
              </View>
              <View style={styles.avatarView}>
                <Avatar
                  rounded
                  source={{
                    uri: View_sor.user.profile,
                  }}
                />
              </View>
            </View>
          </View>
          <Animated.View
            // <.View
            style={[styles.content, {marginTop: this.state.contentAnim}]}>
            <View style={styles.classittleicon}>
              <Icon
                size={wp(6)}
                name={
                  View_sor.user.classifyType == 'LSR'
                    ? 'aperture'
                    : View_sor.user.classifyType == 'positive'
                    ? 'check-circle'
                    : View_sor.user.classifyType == 'concern'
                    ? 'warning'
                    : View_sor.user.classifyType == 'nearmiss'
                    ? 'centercode'
                    : 'frowno'
                }
                type={
                  View_sor.user.classifyType == 'LSR'
                    ? 'ionicon'
                    : View_sor.user.classifyType == 'positive'
                    ? 'font-awesome-5'
                    : View_sor.user.classifyType == 'concern'
                    ? 'antdesign'
                    : View_sor.user.classifyType == 'nearmiss'
                    ? 'font-awesome-5'
                    : 'antdesign'
                }
                color={colors.text}
              />
              <Text style={styles.clasifyT}>{View_sor.user.classifyType}</Text>
            </View>
            <View style={styles.obserContainer}>
              <Text style={styles.observationText}>
                {View_sor.user.observation}
              </Text>
              <Text style={styles.observationDate}>
                {moment(View_sor.user.date).format('Do MMM, YYYY')}
              </Text>
            </View>
            <View style={styles.subContainer}>
              <View style={styles.submittedTo}>
                <Text style={styles.subText}>Submitted to : </Text>
                <Text style={styles.obvText}>
                  {View_sor.user.observer[0].name}
                </Text>
              </View>
              <View style={styles.observerTo}>
                <Text style={styles.obvText}>Observer : </Text>
                <Text style={styles.obvText}>
                  {View_sor.user.submittedTo[0].name}{' '}
                </Text>
              </View>
            </View>
            <View style={styles.tabs}>
              <View style={styles.tabsContainer}>
                {/* Observer */}
                <View style={styles.tbsCont}>
                  <View style={styles.iconNametbs}>
                    <Avatar
                      size={wp(7)}
                      rounded
                      source={{
                        uri: View_sor.user.profile,
                      }}
                    />
                    <Text style={styles.obname}>
                      {View_sor.user.observer[0].name}
                    </Text>
                  </View>
                  <Text style={styles.obType}>Observer</Text>
                </View>
                {/* Submitted to */}
                <View style={styles.tbsCont}>
                  <View style={styles.iconNametbs}>
                    <Avatar
                      size={wp(7)}
                      rounded
                      source={{
                        uri: View_sor.user.profile,
                      }}
                    />
                    <Text style={styles.obname}>
                      {View_sor.user.submittedTo[0].name}
                    </Text>
                  </View>
                  <Text style={styles.obType}>Submitted To</Text>
                </View>
              </View>
              <View style={styles.tabsContainer}>
                {/* Esclated to */}
                <View style={styles.tbsCont}>
                  <View style={styles.iconNametbs}>
                    <Avatar
                      size={wp(7)}
                      rounded
                      source={{
                        uri: View_sor.user.profile,
                      }}
                    />
                    <Text style={styles.obname}>
                      {View_sor.user.EscalatedTo[0].name}
                    </Text>
                  </View>
                  <Text style={styles.obType}>Escalated To</Text>
                </View>
                {/* Involved Person */}
                <View style={styles.tbsCont}>
                  <View style={styles.iconNametbs}>
                    <Avatar
                      size={wp(7)}
                      rounded
                      source={{
                        uri: View_sor.user.profile,
                      }}
                    />
                    <Text style={styles.obname}>
                      {View_sor.user.InvolvedPersons[0].name}
                    </Text>
                  </View>
                  <Text style={styles.obType}>Involved Person</Text>
                </View>
              </View>
            </View>
            <View style={styles.risk}>
              <Text style={styles.riskText}>
                Risk{' '}
                <Text style={styles.riskttle}>(Severity x Likelihood)</Text>
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.riskIcon}>
                  <Text style={styles.riskIconText}>{View_sor.user.Risk}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>Action / Recommendation</Text>
              {View_sor.user.ActionAndRecommendation.map((d, i) => (
                <View
                  style={[
                    styles.actionRecomCon,
                    d.status == 'Completed'
                      ? {backgroundColor: colors.lightGreen}
                      : null,
                  ]}>
                  <Text style={styles.inProgrssText}>{d.status}</Text>
                  <Text
                    style={[
                      styles.obvTextAction,
                      d.status == 'Completed'
                        ? {color: colors.text, opacity: 0.5}
                        : null,
                    ]}>
                    {d.observation}
                  </Text>
                  <View style={styles.subAss}>
                    <Text style={styles.subAssText}>
                      Submitted by{'   '}
                      <Text style={styles.subAssuser}>{d.SubmittedTo}</Text>
                    </Text>
                    <Text style={styles.subAssText}>
                      Assigned by{'   '}
                      <Text style={styles.subAssuser}>{d.AssignedTo}</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.attachmentsContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignSelf: 'center',
                }}>
                {View_sor.user.Attachments.map((d, i) => {
                  if (d.type == 'photo') {
                    return (
                      <View style={styles.AttchimageContainer}>
                        <Image
                          source={{
                            uri:
                              'https://cdn.technologyadvice.com/wp-content/uploads/2017/08/Fotolia_98303431_Subscription_Monthly_M-699x408.jpg',
                          }}
                          style={[GlStyles.images, {borderRadius: wp(5)}]}
                          resizeMode={'contain'}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            this.photoAnim.play();
                            downloadFile(d.url, d.type)
                              .then((res: any) => {
                                console.log(res);
                              })
                              .catch((err) => console.log(err));
                          }}
                          style={{
                            position: 'absolute',
                            right: wp(-2),
                            top: wp(2),
                            zIndex: wp(1),
                          }}>
                          <LottieView
                            ref={(animation) => {
                              this.photoAnim = animation;
                            }}
                            style={{width: wp(11)}}
                            source={animation.download}
                            loop={false}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
              </View>
              {View_sor.user.Attachments.map((d, i) => (
                <View>
                  {d.type == 'file' ? (
                    <View style={styles.attachFileContainer}>
                      <Icon
                        name={'file-pdf'}
                        type={'font-awesome-5'}
                        size={wp(5)}
                      />
                      <Text style={styles.attchFileText}>Untitled1.pdf</Text>

                      <TouchableOpacity
                        onPress={() => {
                          this.animation.play();
                          downloadFile(d.url, d.type)
                            .then((res: any) => {
                              console.log(res);
                            })
                            .catch((err) => console.log(err));
                        }}
                        style={{
                          position: 'absolute',
                          right: wp(1),
                          top: wp(1.5),
                        }}>
                        <LottieView
                          ref={(animation) => {
                            this.animation = animation;
                          }}
                          style={{width: wp(15)}}
                          source={animation.download}
                          loop={false}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state: unknown) => {
  return {};
};

const mapDispatchToProps = (dispatch: unknown) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSOR);
