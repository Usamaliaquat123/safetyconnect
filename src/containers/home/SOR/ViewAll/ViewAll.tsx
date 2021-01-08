import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {connect} from 'react-redux';
import styles from './styles';
import {Create_sor, viewas, notified, submitted, draft} from '@service';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';

import {Card} from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Isor} from '@typings';

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
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function dp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = dp(80);
const itemHorizontalMargin = dp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const SLIDER_1_FIRST_ITEM = 1;
class ViewAll extends React.Component<ViewAllProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentlocation: Create_sor.Observation.locations[0],
      project: viewas[0],
      selectP: false,
      draft: draft,
      notified: notified,
      submitted: submitted,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>View SOR Reports</Text>
                <View style={styles.underScrore} />
              </View>
              <View style={styles.avatarView}>
                <Avatar
                  rounded
                  source={{
                    uri: Create_sor.user.profile,
                  }}
                />
              </View>
            </View>
            <View style={styles.headerSelect}>
              {/* Project selector */}
              <View style={styles.leftSelector}>
                {/* <Text style={styles.hselectort}> Board View</Text> */}
                <TouchableOpacity
                  style={styles.selector}
                  // onPress={() => {
                  //   this.setState({selectP: !this.state.selectP});
                  // }}>
                >
                  <Text style={styles.selectorBox}>{this.state.project}</Text>
                </TouchableOpacity>
                <Icon
                  style={{padding: 3}}
                  size={10}
                  name="down"
                  type="antdesign"
                  color={colors.secondary}
                />
                {this.state.selectP == true ? (
                  <View style={styles.slctContainer}>
                    {Create_sor.Observation.projects.map((d, i) => (
                      <Text
                        key={i}
                        onPress={() => this.setState({project: d})}
                        style={styles.itemH}>
                        {d.length > 7 ? d.substring(0, 8) + '...' : d}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
              <View style={styles.rightSelector}>
                <Icon
                  onPress={() => this.props.navigation.navigate('CreateSOR')}
                  style={{padding: 3}}
                  size={20}
                  name="address-card"
                  type="font-awesome-5"
                  color={colors.secondary}
                />
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView
              style={{marginTop: wp(15)}}
              showsHorizontalScrollIndicator={false}
              snapToInterval={wp(83)}
              decelerationRate="fast"
              horizontal>
              <View style={{paddingBottom: wp(10)}}>
                <View style={styles.notifiedTextContaienr}>
                  <Text style={styles.notifiedText}>Notified</Text>
                  <Icon
                    size={22}
                    name="filter"
                    type="ionicon"
                    color={colors.primary}
                  />
                </View>
                {this.state.notified.map((d: Isor, i: number) => (
                  <Card
                    data={d}
                    onPress={(d: Isor) =>
                      this.props.navigation.navigate('ViewSOR', {data: d})
                    }
                    date={d.date}
                    risk={d.risk}
                    observation={d.observation}
                    classify={d.classify}
                    location={d.location}
                    style={styles.cardConatiner}
                  />
                ))}
              </View>
              <View>
                <View style={styles.draftTextContainer}>
                  <Text style={styles.draftText}>Draft</Text>
                  <Icon
                    size={22}
                    name="filter"
                    type="ionicon"
                    color={colors.primary}
                  />
                </View>
                {this.state.draft.map((d: Isor, i: number) => (
                  <Card
                    data={d}
                    onPress={(d: Isor) =>
                      this.props.navigation.navigate('ViewSOR', {data: d})
                    }
                    date={d.date}
                    risk={d.risk}
                    observation={d.observation}
                    classify={d.classify}
                    location={d.location}
                    style={styles.draftCardContainer}
                  />
                ))}
              </View>
              <View>
                <View style={styles.submitTextContaienr}>
                  <Text style={styles.submitText}>Submitted</Text>
                  <Icon
                    size={22}
                    name="filter"
                    type="ionicon"
                    color={colors.primary}
                  />
                </View>
                {this.state.submitted.map((d: Isor, i: number) => (
                  <Card
                    data={d}
                    onPress={(d: Isor) =>
                      this.props.navigation.navigate('ViewSOR', {data: d})
                    }
                    date={d.date}
                    risk={d.risk}
                    observation={d.observation}
                    classify={d.classify}
                    location={d.location}
                    style={styles.submitCardContainer}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: unknown) => {
  return {};
};

const mapDispatchToProps = (dispatch: unknown) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);
