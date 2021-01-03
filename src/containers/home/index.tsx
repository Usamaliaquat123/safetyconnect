import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme';
import {Create_sor, View_sor, all_sor, viewas} from '@service';
import {connect} from 'react-redux';
import * as reduxActions from '../../store/Actions/AppActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {Chart} from '@components';
import {bindActionCreators} from 'redux';
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
        <ScrollView></ScrollView>
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
    reduxActions: bindActionCreators(reduxActions.default, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
