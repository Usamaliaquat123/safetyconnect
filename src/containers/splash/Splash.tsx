import React, {useEffect, useState} from 'react';
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
import {RouteProp, CommonActions} from '@react-navigation/native';
import {organizationDTO} from '@dtos';
import {images, GlStyles} from '@theme';
// import Splash from './Splash';

export interface SplashProps {
  navigation: SplashNavigationProp;
  route: SplashRouteProp;
  reduxActions: any;
  reduxState: any;
}

type SplashNavigationProp = StackNavigationProp<StackNavigatorProps, 'Splash'>;
type SplashRouteProp = RouteProp<StackNavigatorProps, 'Splash'>;

export const Splash: React.FC<{props: SplashProps}> = async (
  props: SplashProps,
) => {
  // Initial Render
  useEffect(() => {
    AsyncStorage.getItem('email').then((email: any) => {
      if (email != null) {
        setTimeout(() => {
          createApi
            .createApi()
            .getUser(email)
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
                  props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        {
                          name: 'Main',
                        },
                      ],
                    }),
                  );
                  // console.log(res.data.data.organizations[0]);
                } else {
                  props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        {
                          name: 'createProject',
                        },
                      ],
                    }),
                  );
                }
              } else {
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: 'CreateOrganization',
                      },
                    ],
                  }),
                );
              }
              // this.props.navigation.navigate('CreateOrganization');
            });
        }, 5000);
      } else {
        setTimeout(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'Welcome',
                },
              ],
            }),
          );
        }, 5000);
      }
    });
  }, []);

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
};
// export default class Splash extends React.Component<SplashProps, any> {
//   constructor(props: any) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {

//   }

//   render() {
//     return (
//       <LinearGradient
//         colors={['#4c669f', '#3b5998', '#192f6a']}
//         start={{x: 1, y: 1}}
//         end={{x: 0, y: 0}}
//         style={{flex: 1, justifyContent: 'center'}}>
//         <View style={{alignItems: 'center'}}>
//           <View style={{width: wp(70), height: wp(13)}}>
//             <Image source={images.splashLogo} style={GlStyles.images} />
//           </View>
//         </View>
//       </LinearGradient>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Splash);
