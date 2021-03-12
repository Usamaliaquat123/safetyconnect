import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {default as Model} from 'react-native-modal';
import {colors, GlStyles, images} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackNavigatorProps} from '@nav';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type BottomPopNavigationProp = StackNavigationProp<StackNavigatorProps, ''>;
type BottomPopRouteProp = RouteProp<StackNavigatorProps, ''>;

export interface BottomPopProps {}

class BottomPop extends React.Component<BottomPopProps, any> {
  render() {
    console.log('asd');
    return (
      <View>
        <Model
          isVisible={true}
          onBackdropPress={
            () => console.log('Test')
            // this.setState({createModal: false, loading: false})
          }>
          <View
            style={{
              backgroundColor: colors.secondary,
              borderRadius: wp(3),
              padding: wp(5),
            }}>
            {/* Create New sor */}
            <View style={styles.containerOfIcon}>
              <View
                style={{
                  padding: wp(3),
                  backgroundColor: colors.lightGreen,
                  width: wp(12),
                  height: wp(12),
                  borderRadius: wp(3),
                }}>
                <Image source={images.bottomTab.note} style={GlStyles.images} />
              </View>

              <Text
                style={{
                  paddingLeft: wp(2),
                  fontSize: wp(3),
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                New SOR
              </Text>
            </View>
            {/* Audit and Inspection */}
            <View style={styles.containerOfIcon}>
              <View
                style={{
                  padding: wp(3),
                  backgroundColor: colors.lightGreen,
                  width: wp(12),
                  height: wp(12),
                  borderRadius: wp(3),
                }}>
                <Image
                  source={images.homeIcon.auditAndReporting}
                  style={GlStyles.images}
                />
              </View>
              <Text style={styles.auditReportText}>
                Audit and Inspection Report
              </Text>
            </View>
            {/* Incident and Accident Report */}
            <View style={styles.containerOfIcon}>
              <View
                style={{
                  padding: wp(3),
                  backgroundColor: colors.lightGreen,
                  width: wp(12),
                  height: wp(12),
                  borderRadius: wp(3),
                }}>
                <Image
                  source={images.homeIcon.incidentreporting}
                  style={GlStyles.images}
                />
              </View>
              <Text style={styles.auditReportText}>
                Incident & Accident Report
              </Text>
            </View>
          </View>
        </Model>
      </View>
    );
  }
}

export default BottomPop;
