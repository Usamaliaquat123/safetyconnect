import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View_sor} from '@service';
import {connect} from 'react-redux';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorProps} from '@nav';
import {Avatar, Icon} from 'react-native-elements';
import {colors, images, GlStyles} from '@theme';
import {RouteProp} from '@react-navigation/native';
import {imagePicker, cameraCapture} from '@utils';
import Modal from 'react-native-modal';

type TellAboutYouNavigationProp = StackNavigationProp<
  StackNavigatorProps,
  'CreatePass'
>;
type TellAboutYouRouteProp = RouteProp<StackNavigatorProps, 'CreatePass'>;

export interface TellAboutYouProps {
  navigation: TellAboutYouNavigationProp;
  route: TellAboutYouRouteProp;
  reduxActions: any;
  reduxState: any;
}

class TellAboutYou extends React.Component<TellAboutYouProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploadedImage: '',
      photoModal: false,
      selected: 1,
      photo: '',
    };
  }

  componentDidMount = () => {};

  imgCap = (str: string) => {
    if (str == 'upload') {
      imagePicker()
        .then((res: any) => {
          console.log(res);
          this.setState({photoModal: false, uploadedImage: res.uri});
        })
        .catch((err) => {
          this.setState({photoModal: false});
        });
    } else {
      cameraCapture()
        .then((res: any) => {
          console.log(res);
          this.setState({photoModal: false, uploadedImage: res.uri});
        })
        .catch((err) => {
          this.setState({photoModal: false});
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <View>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.underScrore} />
              </View>
            </View>
          </View>
          {/* content */}
          <View style={styles.content}>
            <Text style={styles.headingContainer}>Tell about yourself</Text>
            {/* Photo Seclector  */}
            <TouchableOpacity style={styles.imageUploadContainer}>
              {this.state.uploadedImage == '' ? (
                <TouchableOpacity
                  onPress={() => this.setState({photoModal: true})}
                  style={styles.imagenotUpoad}>
                  <View style={styles.imagenotuploadContainer}>
                    <Icon
                      size={wp(13)}
                      containerStyle={{opacity: 0.5}}
                      name="camera"
                      type="evilicon"
                      color={colors.text}
                    />
                    <Text style={styles.uploadPicText}>Upload</Text>
                    <Text style={styles.uploadPicText}>Picture</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <Avatar
                  size={'xlarge'}
                  rounded
                  source={{
                    uri: this.state.uploadedImage,
                  }}
                />
              )}
            </TouchableOpacity>
            <View style={styles.inputsContainer}>
              {/*Industry selectionv   */}
              <Text style={styles.emailTextContainer}>Industry</Text>
              <TouchableOpacity
                onPress={() => this.setState({selected: 1})}
                style={[
                  styles.inputContainer,
                  this.state.selected == 1
                    ? {borderColor: colors.green}
                    : {borderColor: colors.textOpa},
                ]}>
                <Text style={styles.selectText}>Design and Architecture</Text>
                <Icon
                  onPress={() => this.props.navigation.goBack()}
                  size={wp(5)}
                  containerStyle={{
                    position: 'absolute',
                    right: wp(3),
                    opacity: 0.5,
                  }}
                  name="down"
                  type="antdesign"
                  color={colors.text}
                />
              </TouchableOpacity>
              {/*Deraprtment selectionv   */}
              <Text style={styles.emailTextContainer}>Department</Text>
              <TouchableOpacity
                onPress={() => this.setState({selected: 2})}
                style={[
                  styles.inputContainer,
                  this.state.selected == 2
                    ? {borderColor: colors.green}
                    : {borderColor: colors.textOpa},
                ]}>
                <Text style={styles.selectText}>Design and Architecture</Text>
                <Icon
                  onPress={() => this.props.navigation.goBack()}
                  size={wp(5)}
                  containerStyle={{
                    position: 'absolute',
                    right: wp(3),
                    opacity: 0.5,
                  }}
                  name="down"
                  type="antdesign"
                  color={colors.text}
                />
              </TouchableOpacity>
              {/*job role selectionv   */}
              <Text style={styles.emailTextContainer}>
                What is your role in the organization ?
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({selected: 3})}
                style={[
                  styles.inputContainer,
                  this.state.selected == 3
                    ? {borderColor: colors.green}
                    : {borderColor: colors.textOpa},
                ]}>
                <Text style={styles.selectText}>Design and Architecture</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.siginBtnContainer}>
              <Text style={styles.signinText}>Continue</Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={this.state.photoModal}
            onBackdropPress={() => this.setState({photoModal: false})}>
            <View
              style={{
                backgroundColor: colors.secondary,
                justifyContent: 'center',
                borderRadius: wp(8),
                padding: wp(10),
              }}>
              <TouchableOpacity
                onPress={() => this.imgCap('take')}
                style={[styles.takeaPhotoContainer, {marginTop: wp(1)}]}>
                <Icon
                  size={wp(5)}
                  name="camerao"
                  type="antdesign"
                  color={colors.primary}
                />
                <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                  Take a photo
                </Text>
                <Icon
                  containerStyle={{position: 'absolute', right: wp(0)}}
                  size={wp(5)}
                  name="right"
                  type="antdesign"
                  color={colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.imgCap('upload')}
                style={styles.takeaPhotoContainer}>
                <Icon
                  size={wp(5)}
                  name="photo"
                  type="font-awesome"
                  color={colors.text}
                />
                <Text style={[styles.selectText, {marginLeft: wp(10)}]}>
                  Upload a photo
                </Text>
                <Icon
                  size={wp(5)}
                  name="right"
                  containerStyle={{position: 'absolute', right: wp(0)}}
                  type="antdesign"
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(TellAboutYou);
