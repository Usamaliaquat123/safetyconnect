import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CommonActions} from '@react-navigation/native';
import {StackNavigatorProps} from '@nav';
import {Icon, Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '@actions';
import {AllSorDTO} from '@dtos';
import {
  imagePicker,
  profileUploader,
  suggestInActionsRecommendations,
} from '@utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts, animation, images} from '@theme';
import api from '@service/api';
export interface MainSettingsProps {
  route: MainSettingsRouteProp;
  navigation: MainSettingsNavigationProp;
  reduxActions: any;
  reduxState: any;
}

type MainSettingsNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'MainSettings'
>;
type MainSettingsRouteProp = RouteProp<StackNavigatorProps, 'MainSettings'>;

class MainSettings extends React.Component<MainSettingsProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      email: '',
      department: '',
      industry: '',
      arrayOfYourRole: [],
      arrayofDepartment: [],
      arrayofIndustry: [],
      role: '',
      img_url: '',

      type: '',
      profileupload: false,
      loading: false,
      isEnabled: false,
    };
  }

  componentDidMount() {}

  webRedirection = () => {};
  toggleSwitch = () => {
    this.setState({isEnabled: !this.state.isEnabled});
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name={'arrowleft'}
                  type={'antdesign'}
                  size={wp(5)}
                  color={colors.secondary}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>Settings</Text>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <TouchableOpacity
              style={{
                padding: wp(4),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayBold}}>
                Notifications
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch}
                value={this.state.isEnabled}
              />
            </TouchableOpacity>
            {/* line height */}
            <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} />
            {/* line height */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ChangePassword')}
              style={{padding: wp(4)}}>
              <Text
                style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayBold}}>
                Reset Password
              </Text>
            </TouchableOpacity>
            <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} />
            <TouchableOpacity style={{padding: wp(4)}}>
              <Text
                style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayBold}}>
                Terms and conditions
              </Text>
            </TouchableOpacity>
            <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} />
            <TouchableOpacity style={{padding: wp(4)}}>
              <Text
                style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayBold}}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <View style={{height: wp(1), backgroundColor: '#F6F6F6'}} />
          </View>
        </ScrollView>

        {/* Modal Container */}
        <Modal isVisible={this.state.loading}>
          {this.state.loading == true ? (
            <View>
              <View style={{alignSelf: 'center'}}>
                <LottieView
                  autoPlay={true}
                  style={{width: wp(90)}}
                  source={animation.loading}
                  loop={true}
                />
              </View>
            </View>
          ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainSettings);
