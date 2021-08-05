import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {colors, fonts} from '@theme';
import {Icon} from 'react-native-elements';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, submitted} from '@service';

interface Props {
  navigation: any;
  selectedProject: string;
  selectedLocation: Array<any>;
  projects?: Array<any>;
  orgnaization?: string;
}

const Selector = (props: Props) => {
  const [selectionProj, setselectionProj] = React.useState(false);
  const [selectionLocation, setselectionLocation] = React.useState(false);
  // all projects and organizations
  const [selectedProj, setselectedProj] = React.useState();
  const [allproj, setallproj] = React.useState(props.projects);
  const [allLocations, setAllLocations] = React.useState(
    props.selectedLocation,
  );

  console.log(props.projects);
  // user
  // AsyncStorage.getItem('getCurrentProject').then((projId: any) => {
  //   createApi
  //     .createApi()
  //     .getProject({projectid: projId})
  //     .then((resp: any) => {
  //       console.log(resp);
  //       // setselectedProj(resp )

  //       // setselectionProj()
  //       // console.log(resp);
  //     });
  // });

  return (
    <View style={styles.selectProjectLocationContainer}>
      {/* Select Project */}
      <View style={styles.selectProjectContainer}>
        <Text style={styles.selectProjHead}>Select Project :</Text>
        <TouchableOpacity
          onPress={() => setselectionProj(!selectionProj)}
          style={styles.selectProj}>
          {/* <Text style={styles.projName}>{selectedProj.project_name}</Text> */}
          <Icon
            // onPress={() => props.navigation.goBack()}
            size={wp(3)}
            containerStyle={styles.downIcon}
            name="down"
            type="antdesign"
            // color={colo}
          />
        </TouchableOpacity>

        {selectionProj == true && (
          <ScrollView
            style={{
              // top: wp(20),
              borderRadius: wp(1),
              borderColor: colors.textOpa,
              width: wp(42),
              borderWidth: wp(0.2),
              // position: 'absolute',
              // paddingTop: 60,
              // marginTop: 0,

              backgroundColor: colors.secondary,
              maxHeight: wp(40),
            }}>
            {props.projects.map((d: any) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: wp(3),
                }}
                onPress={() => {
                  setselectedProj(d.project_id._id);

                  console.log(d);

                  createApi
                    .createApi()
                    .getLocations({projectid: d.project_id._id})
                    .then((resp: any) => {
                      setAllLocations(resp.data.data.p_locations);
                      setselectionProj(false);
                    });
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
                  {d.project_name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Select location */}
      <View style={styles.selectLocationContainer}>
        <Text style={styles.selectlocationHead}>Select Location :</Text>
        <TouchableOpacity
          onPress={() => setselectionLocation(!selectionLocation)}
          style={styles.selectLocation}>
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

        {selectionLocation == true && (
          <ScrollView
            style={{
              // top: wp(20),
              borderRadius: wp(1),
              borderColor: colors.textOpa,
              width: wp(42),
              borderWidth: wp(0.2),
              // position: 'absolute',
              // paddingTop: 60,
              // marginTop: 0,

              backgroundColor: colors.secondary,
              maxHeight: wp(40),
            }}>
            {props.selectedLocation.map((d: any) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: wp(3),
                }}
                onPress={() => {
                  setselectedProj(d.project_id._id);

                  console.log(d);

                  createApi
                    .createApi()
                    .getLocations({projectid: d.project_id._id})
                    .then((resp: any) => {
                      setAllLocations(resp.data.data.p_locations);
                      setselectionProj(false);
                    });
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
                  {d.project_name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Selector;
