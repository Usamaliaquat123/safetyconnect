import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {connect} from 'react-redux';
import styles from './styles';
import {Create_sor, viewas, all_sor} from '@service';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
      currentlocation: Create_sor.Observation.locations[0],
      project: viewas[0],
      selectP: false,
    };
  }
  _renderItem = ({item, index}) => {
    console.log(item);
    return (
      <View style={styles.slide}>
        {/* // <Text style={styles.title}>{item.title}</Text> */}
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView>
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
            </View>
          </View>
          <View
            style={{
              flex: 2,
              backgroundColor: colors.secondary,
              borderTopLeftRadius: wp(10),
              borderTopRightRadius: wp(10),
              padding: wp(10),
              height: wp(150),
            }}>
            <Icon
              onPress={() => this.props.navigation.navigate('CreateSOR')}
              style={{padding: 3}}
              size={wp(15)}
              name="file-certificate-outline"
              type="material-community"
              color={colors.primary}
            />
            {/* <Chart
            style={{alignSelf: 'center', marginTop: wp(3)}}
            onPress={(v: number) => console.log(v)}
          /> */}
            {/* <ScrollView horizontal={true}>
            <ScrollView>
              <Text>sdsds</Text>
            </ScrollView>
            <ScrollView style={{marginRight: wp(10), marginLeft: wp(10)}}>
              <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardtime}>123</Text>
                  <TouchableOpacity style={styles.cardbadge}>
                    <Text style={styles.cardBadgeText}>4</Text>
                  </TouchableOpacity>
                  <Text style={styles.cardDate}>22/10/2020</Text>
                </View>
                <View>
                  <Text style={styles.cardTitle}>
                    Consequat Lorem qui excepteur pariatur laborum amet
                    officia incididunt dolore.
                  </Text>
                </View>
                <View style={styles.cardBottom}>
                  <View style={styles.cardRisk}>
                    <Icon
                      style={{padding: 3}}
                      size={wp(3)}
                      name="warning"
                      type="antdesign"
                      color={colors.riskIcons.red}
                    />
                    <Text
                      style={[
                        styles.cardBorderText,
                        {color: colors.riskIcons.red},
                      ]}>
                      Concern
                    </Text>
                  </View>
                  <View style={styles.cardLocation}>
                    <Icon
                      style={{padding: 3}}
                      size={15}
                      name="location"
                      type="evilicon"
                      color={colors.primary}
                    />
                    <Text style={styles.cardBorderText}>Lorem ipsum </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <ScrollView>
              <Text>sdsd</Text>
              <Text>sdsd</Text>
              <Text>sdsd</Text>
              <Text>sdsd</Text>
              <Text>sdsd</Text>
            </ScrollView> */}
            {/* </ScrollView> */}

            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              data={all_sor}
              renderItem={this._renderItem}
              sliderWidth={wp(100)}
              itemWidth={wp(30)}
            />
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
