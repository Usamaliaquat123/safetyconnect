import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {colors, GlStyles, images} from '@theme';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
import {classifySor} from '@utils';
import {Avatar, Icon} from 'react-native-elements';
import {View_sor, recentActivity} from '@service';
import {ListCard} from '@components';
import {} from '@theme';
import {bindActionCreators} from 'redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import {connect} from '../../decorators/index';
type HomeScreenNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Home'
>;
type HomeRouteProp = RouteProp<StackNavigatorProps, 'Home'>;

export interface HomeProps {
  route: HomeRouteProp;
  navigation: HomeScreenNavigationProp;
  reduxActions: any;
  reduxState: any;
}

class Home extends React.Component<HomeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View style={styles.orgLogo}>
                <Image
                  source={images.organizationLogo}
                  style={styles.orgLogoPng}
                />
              </View>
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.title}>Welcome Waseem!</Text>
                <Text style={styles.orgTitle}>Sandan</Text>
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
            <View style={styles.menu}></View>
            <View style={styles.recentActivity}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Recently Activity</Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>
              <View style={{marginTop: wp(3)}}>
                {recentActivity.map((d, i) => (
                  <ListCard
                    classify={d.classify}
                    styles={
                      recentActivity.length == i + 1
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
                    onPress={
                      () => {}
                      // this.props.navigation.navigate('home', {
                      //   data: d,
                      // })
                      // this.props.navigation.navigate('home')
                    }
                    date={d.date}
                  />
                ))}
              </View>
            </View>
            <View style={styles.perfStats}>
              <View style={styles.recentlyHead}>
                <Text style={styles.actHeading}>Performance Statistics</Text>
                <Text style={styles.viewAll}>View All</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
