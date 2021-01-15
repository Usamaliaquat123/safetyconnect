import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Modal,
  Easing,
  BackHandler,
} from 'react-native';
// import MapView from 'react-native-maps';

import moment from 'moment';
import {connect} from 'react-redux';
import {Icon, Avatar, Card} from 'react-native-elements';
import {colors, GlStyles, animation, images} from '@theme';
import {View_sor} from '@service';
import {downloadFile} from '@utils';
import styles from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import ImageViewer from 'react-native-image-zoom-viewer';
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
      imageViewer: false,
      images: [],
      contentAnim: new Animated.Value(80),
    };

    this.animation = React.createRef();
    this.photoAnim = React.createRef();
  }
  componentDidMount = () => {
    this.mapViewSorPhoto();
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

  mapViewSorPhoto = () => {
    View_sor.user.Attachments.map((d, i) => {
      if (d.type == 'photo') {
        this.state.images.push({url: d.url});
      }
    });
  };
  render() {
    // this.handleBackButtonClick();
    console.log(this.state.images);
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
            <View style={styles.involveNortify}>
              <View style={styles.notifiedSec}>
                <Text style={styles.notifyPText}>Notified to : </Text>
                {View_sor.user.InvolvedPersons.map((d, i) => (
                  <View>
                    <Avatar
                      containerStyle={{marginLeft: wp(-(i + 1))}}
                      size={wp(8)}
                      rounded
                      source={{
                        uri: View_sor.user.profile,
                      }}
                    />
                  </View>
                ))}
                <View
                  style={[
                    styles.addCircle,
                    {backgroundColor: colors.lightGrey},
                  ]}>
                  <Icon
                    onPress={() => this.props.navigation.goBack()}
                    size={wp(3.5)}
                    name="plus"
                    type="antdesign"
                    color={colors.primary}
                  />
                </View>
              </View>
              <View style={styles.notifiedSec}>
                <Text style={styles.invpText}>Involved People</Text>
                {View_sor.user.observer.map((d, i) => (
                  <View>
                    <Avatar
                      containerStyle={{marginLeft: wp(-(i + 1))}}
                      size={wp(8)}
                      rounded
                      source={{
                        uri: View_sor.user.profile,
                      }}
                    />
                  </View>
                ))}
                <View style={styles.addCircle}>
                  <Icon
                    onPress={() => this.props.navigation.goBack()}
                    size={wp(3.5)}
                    name="plus"
                    type="antdesign"
                    color={colors.secondary}
                  />
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
              <Text style={styles.sugForYouText}>Suggested for you</Text>
              {View_sor.user.ActionAndRecommendation.map((d, i) => (
                <View
                  style={[
                    styles.actionRecomCon,
                    d.status == 'Completed'
                      ? {
                          borderWidth: wp(0.2),
                          backgroundColor: colors.lightBlue,
                          borderColor: colors.primary,
                        }
                      : {
                          borderWidth: wp(0.3),
                          borderColor: colors.lightGrey,
                        },
                  ]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      onPress={() => this.props.navigation.goBack()}
                      size={wp(3.5)}
                      name="checkcircle"
                      type="antdesign"
                      color={
                        d.status == 'Completed'
                          ? colors.green
                          : colors.lightGrey
                      }
                    />
                    <Text style={styles.statusARText}>{d.status}</Text>
                    <View style={{position: 'absolute', right: wp(3)}}>
                      <Text style={[styles.actionTypeElemAsdmin]}>
                        {d.type}
                      </Text>
                    </View>
                  </View>
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
                      Assigned to:{' '}
                      <Text style={styles.subAssuser}>{d.AssignedTo}</Text>
                    </Text>
                    <Text style={styles.subAssText}>
                      {moment(d.time).format('MMM DD YYYY')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.addActionAndRecommendation}>
              <TextInput
                onChange={(e) => console.log(e)}
                style={styles.textaddActionContainer}
                placeholder={'Add action / recommendation here'}
              />
              <View
                style={{
                  position: 'absolute',
                  right: wp(3),
                  padding: wp(2),
                  borderRadius: wp(2),
                  backgroundColor: colors.lightGrey,
                }}>
                <Icon
                  size={wp(4)}
                  name="arrowright"
                  type="antdesign"
                  color={colors.primary}
                />
              </View>
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
                      <TouchableOpacity
                        onPress={() => this.setState({imageViewer: true})}
                        style={styles.AttchimageContainer}>
                        <Image
                          source={{
                            uri:
                              'https://cdn.technologyadvice.com/wp-content/uploads/2017/08/Fotolia_98303431_Subscription_Monthly_M-699x408.jpg',
                          }}
                          style={[GlStyles.images, {borderRadius: wp(5)}]}
                          resizeMode={'contain'}
                        />
                        <View
                          // onPress={() => {
                          //   this.photoAnim.play();
                          //   downloadFile(d.url, d.type)
                          //     .then((res: any) => {
                          //       console.log(res);
                          //     })
                          //     .catch((err) => console.log(err));
                          // }}
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
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
              {View_sor.user.Attachments.map((d, i) => (
                <View>
                  {d.type == 'file' ? (
                    <View style={styles.attachFileContainer}>
                      <View style={{width: wp(10)}}>
                        <Image
                          source={images.pdf}
                          style={{width: wp(5), height: wp(7)}}
                        />
                      </View>
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
            {/* Map Integration */}
            <View></View>
            {/* comments sections */}
            <View style={styles.commentsSections}>
              {View_sor.user.comments.map((d, i) => (
                <View style={styles.userComments}>
                  <Avatar
                    size={wp(8)}
                    rounded
                    source={{
                      uri: d.image,
                    }}
                  />
                  <View style={styles.commentUser}>
                    <Text style={styles.userCommentName}>{d.user}</Text>
                    <Text style={styles.usercomment}>{d.comment}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
        <Modal visible={this.state.imageViewer} transparent={true}>
          <TouchableOpacity
            onPress={() => this.setState({imageViewer: false})}
            style={{backgroundColor: 'black', alignItems: 'flex-end'}}>
            <Icon
              containerStyle={{marginTop: wp(3), marginRight: wp(3)}}
              name={'cross'}
              type={'entypo'}
              color={colors.lightGrey}
              size={wp(5)}
            />
          </TouchableOpacity>
          <ImageViewer
            flipThreshold={100}
            onCancel={() => console.log('sdsd')}
            imageUrls={this.state.images}
          />
        </Modal>
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
