import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {colors, fonts, colros} from '@theme';
import {Icon} from 'react-native-elements';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
  selectedProject: string;
  selectedLocation: string;
  projects?: string;
  orgnaization?: string;
}

const Selector = (props: Props) => {
  const [allProjects, setallProjects] = React.useState([]);
  const [allOrg, setallOrg] = React.useState([]);
  AsyncStorage.getItem('user').then((user: any) => {
    var usr = JSON.parse(user);
    setallOrg(usr.organizations);
  });
  return (
    <View style={styles.selectProjectLocationContainer}>
      {/* Select Project */}
      <View style={styles.selectProjectContainer}>
        <Text style={styles.selectProjHead}>Select Organization :</Text>
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

        <ScrollView
          style={{
            top: wp(20),
            borderRadius: wp(1),
            borderColor: colors.textOpa,
            width: wp(42),
            borderWidth: wp(0.2),
            position: 'absolute',
            // paddingTop: 60,
            // marginTop: 0,
            backgroundColor: colors.secondary,
            maxHeight: wp(40),
          }}>
          {allOrg.map((d: any) => (
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
                style={{
                  fontSize: wp(3),
                  fontFamily: fonts.SFuiDisplayMedium,
                }}>
                {d.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Select location */}
      <View style={styles.selectLocationContainer}>
        <Text style={styles.selectlocationHead}>Select Project :</Text>
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
