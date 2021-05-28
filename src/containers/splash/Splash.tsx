import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import { connect } from 'react-redux';
import {colors, animation} from '@theme';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface SplashProps {}

export default class Splash extends React.Component<SplashProps, any> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.secondary,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <LottieView
            autoPlay={true}
            style={{width: wp(90)}}
            source={animation.loading}
            loop={true}
          />
        </View>
      </View>
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
