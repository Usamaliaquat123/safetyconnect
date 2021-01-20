import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {RouteProp} from '@react-navigation/native';
import styles from './styles';
type CreateProjectNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'Login'
>;
type CreateProjectRouteProp = RouteProp<StackNavigatorProps, 'Login'>;

export interface CreateProjectProps {
  navigation: CreateProjectNavigationProp;
  route: CreateProjectRouteProp;
  reduxActions: any;
  reduxState: any;
}

class CreateProject extends React.Component<CreateProjectProps, any> {
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
            <Text style={styles.headingContainer}>Create Project</Text>
            {/* inputs container */}
            <View style={styles.inputsContainer}>
              {/* Email Container */}
              <Text style={styles.emailTextContainer}>Project Name</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  placeholder={'Enter Project Name'}
                />
              </View>
              {/* Add Team Members */}
              <Text style={styles.emailTextContainer}>Add Team Members</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  // placeholder={}
                />
              </View>
              {/* Asssign Supervisor */}
              <Text style={styles.emailTextContainer}>
                {' '}
                Assign Suppervisors
              </Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  // placeholder={}
                />
              </View>
              {/* Asssign Leaders */}
              <Text style={styles.emailTextContainer}> Assign Leaders</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  // placeholder={}
                />
              </View>
              {/* Assign Locations */}
              <Text style={styles.emailTextContainer}> Assign Locations</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={styles.authInputs}
                  onChange={(e) => console.log(e)}
                  // placeholder={}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Create Project</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
