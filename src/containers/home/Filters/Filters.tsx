import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  RefreshControl,
  PanResponder,
  Image,
  TextInput,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {colors, fonts, animation, images, GlStyles} from '@theme';
import {AllSorDTO} from '@dtos';
import {connect} from 'react-redux';
import styles from './styles';
import {bindActionCreators} from 'redux';
// import * as reduxActions from '../../../../store/actions/listSorActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type ViewAllSOrNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Filters'
>;
type ViewAllSOrRouteProp = RouteProp<StackNavigatorProps, 'Filters'>;
// Project Id
export interface FiltersProps {
  route: ViewAllSOrRouteProp;
  navigation: ViewAllSOrNavigationProp;
  reduxActions: any;
  reduxState: AllSorDTO;
  // initial: AllSorDTO;
  initialList: any;
}

export class Filters extends React.Component<FiltersProps, any> {
  constructor(props: FiltersProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <View style={{backgroundColor: colors.secondary, flex: 1}}>
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
                <Text style={styles.title}>Observations and Feedback</Text>
              </View>
            </View>
            <View style={styles.headerSelect}>
              {/* Project selector */}
              <View style={styles.leftSelector}>
                <TouchableOpacity
                  onPress={() => this.setState({project: 'List View'})}
                  style={{width: wp(5), height: wp(5)}}>
                  <Image
                    source={images.listview}
                    style={[
                      GlStyles.images,
                      this.state.project == 'List View'
                        ? {tintColor: colors.green}
                        : {tintColor: colors.lightGrey},
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({project: 'Board View'})}
                  style={{width: wp(5), height: wp(5), marginLeft: wp(5)}}>
                  <Image
                    source={images.boardView}
                    style={[
                      GlStyles.images,
                      this.state.project != 'List View'
                        ? {tintColor: colors.green}
                        : {tintColor: colors.lightGrey},
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.content}></View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Filters);
