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
import {StackNavigatorProps, AuthNavigatorProp} from '@nav';
import {RouteProp} from '@react-navigation/native';
import {colors, images, GlStyles} from '@theme';
import {animation} from '@theme';
import LottieView from 'lottie-react-native';
type CreateOrgNavigationProp = StackNavigationProp<AuthNavigatorProp, 'Login'>;
type CreateOrgRouteProp = RouteProp<AuthNavigatorProp, 'Login'>;

export interface CreateOrgProps {
  navigation: CreateOrgNavigationProp;
  route: CreateOrgRouteProp;
  reduxActions: any;
  reduxState: any;
}

class CreateOrg extends React.Component<CreateOrgProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      // Error State
      orgError: false,
    };
  }

  createOrg = () => {};
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
            {this.state.loading ? (
              <View>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: wp(40),
                  }}>
                  <LottieView
                    autoPlay={true}
                    style={{width: wp(90)}}
                    source={animation.loading}
                    loop={true}
                  />
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      opacity: 0.5,
                      textAlign: 'center',
                      marginTop: wp(-5),
                    }}>
                    Connecting...
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.headingContainer}>Create Organization</Text>
                {/* inputs container */}
                <View style={styles.inputsContainer}>
                  {/* Email Container */}
                  <Text style={styles.emailTextContainer}>
                    Organization Name
                  </Text>
                  <View style={[styles.inputContainer]}>
                    <TextInput
                      value={this.state.org}
                      style={styles.authInputs}
                      onChange={(e) => this.setState({org: e.nativeEvent.text})}
                      placeholder={'Enter Organization Name'}
                    />
                  </View>
                </View>
                {/* view all projects */}
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CreateProj')}
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
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CreateProj')}
                  style={styles.siginBtnContainer}>
                  <Text style={styles.signinText}>Create Organization</Text>
                </TouchableOpacity>
              </View>
            )}
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
