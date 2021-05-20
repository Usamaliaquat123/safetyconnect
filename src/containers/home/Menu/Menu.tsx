import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {GlStyles, images} from '@theme';
interface Props {}

const Menu = (props: Props) => {
  return (
    <View style={styles.createNewpopcontaienr}>
      {/* Create New sor */}
      <TouchableOpacity
        onPress={() => {
          //   this.setState({createModal: false});
          //   this.props.navigation.navigate('CreateSOR');
        }}
        style={styles.containerOfIcon}>
        <View style={styles.newsorContainer}>
          <Image source={images.bottomTab.note} style={GlStyles.images} />
        </View>

        <Text style={styles.createNewText}>New SOR</Text>
      </TouchableOpacity>
      {/* Audit and Inspection */}
      <TouchableOpacity
        onPress={() => {
          //   this.setState({createModal: false});
          //   this.props.navigation.navigate('CreateOrganization');
        }}
        style={styles.containerOfIcon}>
        <View style={styles.auditAndReportContainer}>
          <Image
            source={images.homeIcon.auditAndReporting}
            style={GlStyles.images}
          />
        </View>
        <Text style={styles.auditReportText}>Create Organization</Text>
      </TouchableOpacity>
      {/* Incident and Accident Report */}
      <TouchableOpacity
        onPress={() => {
          //   this.setState({createModal: false});
          //   this.props.navigation.navigate('createProject');
        }}
        style={styles.containerOfIcon}>
        <View style={styles.incidentContaineR}>
          <Image
            source={images.homeIcon.incidentreporting}
            style={GlStyles.images}
          />
        </View>
        <Text style={styles.auditReportText}>Create Project</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
