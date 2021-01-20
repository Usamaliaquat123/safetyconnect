import * as React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {colors, images, GlStyles} from '@theme';
import {RouteProp} from '@react-navigation/native';

type CreateOrgNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Login'
>;
type CreateOrgRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface CreateOrgProps {
  navigation: CreateOrgNavigationProp;
  route: CreateOrgRouteProp;
  reduxActions: any;
  reduxState: any;
}

class CreateOrg extends React.Component<CreateOrgProps, any> {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>Create organization</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            <Text style={styles.headingContainer}>Create Organization</Text>
            {/* inputs container */}
            <View style={styles.inputsContainer}>
              {/* Email Container */}
              <Text style={styles.emailTextContainer}>Organization Name</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  placeholder={'Enter Organization Name'}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => console.log('create orga')}
              style={{flexDirection: 'row'}}>
              <Icon
                containerStyle={{marginTop: wp(3), marginRight: wp(3)}}
                onPress={() => this.props.navigation.goBack()}
                size={15}
                name="plus"
                type="antdesign"
                color={colors.primary}
              />
              <Text style={styles.dontHaveAccount}>Add Project</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Create Organization</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrg);
