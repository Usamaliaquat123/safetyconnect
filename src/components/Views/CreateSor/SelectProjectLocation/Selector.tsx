import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {colors, fonts} from '@theme';
import {Icon} from 'react-native-elements';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

interface Props {
  navigation: any;
  selectedProject: string;
  selectedLocation: string;
  projects?: Array<any>;
}

const Selector = (props: Props) => {
  return (
    <View style={styles.selectProjectLocationContainer}>
      {/* Select Project */}
      <View style={styles.selectProjectContainer}>
        <Text style={styles.selectProjHead}>Select Project :</Text>
        <TouchableOpacity style={styles.selectProj}>
          <Text style={styles.projName}>{props.selectedProject}</Text>
          <Icon
            onPress={() => props.navigation.goBack()}
            size={wp(3)}
            containerStyle={styles.downIcon}
            name="down"
            type="antdesign"
            // color={colo}
          />
        </TouchableOpacity>
        <View
          style={{
            // padding: wp(3),
            top: wp(20),
            zIndex: 1,
            // height: wp(100),
            width: wp(42),
            borderRadius: wp(1),
            position: 'absolute',
            backgroundColor: colors.secondary,
            borderWidth: wp(0.2),
            // height: wp(70),
            borderColor: colors.textOpa,
          }}>
          <ScrollView>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: wp(3),
              }}>
              <Icon
                name={'stats-chart-sharp'}
                type={'ionicon'}
                color={colors.text}
                size={wp(3)}
                containerStyle={{marginRight: wp(3)}}
              />
              <Text
                style={{fontSize: wp(3), fontFamily: fonts.SFuiDisplayMedium}}>
                asdsd
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Select location */}
      <View style={styles.selectLocationContainer}>
        <Text style={styles.selectlocationHead}>Select Location :</Text>
        <TouchableOpacity style={styles.selectLocation}>
          <Text style={styles.locaName}>{props.selectedLocation}</Text>
          <Icon
            onPress={() => props.navigation.goBack()}
            size={wp(3)}
            containerStyle={styles.downIcon}
            name="down"
            type="antdesign"
            // color={colo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Selector;
