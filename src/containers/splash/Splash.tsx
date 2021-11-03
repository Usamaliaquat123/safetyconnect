import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
// import { connect } from 'react-redux';
import {colors, animation} from '@theme';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {savedCurrentOrganization, savedCurrentProject} from '@utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi} from '@service';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {organizationDTO} from '@dtos';
import {images, GlStyles} from '@theme';

export interface SplashProps {
  navigation: SplashNavigationProp;
  route: SplashRouteProp;
  reduxActions: any;
  reduxState: any;
}

type SplashNavigationProp = StackNavigationProp<StackNavigatorProps, 'Splash'>;
type SplashRouteProp = RouteProp<StackNavigatorProps, 'Splash'>;

export default class Splash extends React.Component<SplashProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    AsyncStorage.getItem('email').then((res: any) => {
      this.setState({user: res});
      if (res != null) {
        setTimeout(() => {
          createApi
            .createApi()
            .getUser(res)
            .then((res: any) => {
              // console.log(res);
              AsyncStorage.setItem('user', JSON.stringify(res.data.data));

              console.log('get user api');
              console.log(res);
              if (res.data.data.organizations.length != 0) {
                savedCurrentOrganization(res.data.data.organizations[0]._id);
                if (res.data.data.organizations[0].projects.length != 0) {
                  savedCurrentProject(
                    res.data.data.organizations[0].projects[0].project_id,
                  );
                  this.props.navigation.navigate('Main');
                  // console.log(res.data.data.organizations[0]);
                } else {
                  this.props.navigation.navigate('createProject');
                }
              } else {
                this.props.navigation.navigate('CreateOrganization');
              }
              // this.props.navigation.navigate('CreateOrganization');
            });
        }, 5000);
      } else {
        setTimeout(() => {
          this.props.navigation.navigate('Signup');
        }, 5000);
      }
    });
  }

  render() {
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        style={{flex: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <View style={{width: wp(70), height: wp(13)}}>
            <Image source={images.splashLogo} style={GlStyles.images} />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Splash);
