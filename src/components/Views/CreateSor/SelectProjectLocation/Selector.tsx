import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

interface Props {
  navigation: any;
  selectedProject: string;
  selectedLocation: string;
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
