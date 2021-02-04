import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {colors, GlStyles, images} from '@theme';
import {Icon} from 'react-native-elements';
import styles from './styles';
import {default as Model} from 'react-native-modal';
export interface CommentsProps {
  openDoc: Function;
  isOpen: boolean;
  attachments: Array<any>;
}

export default class Comments extends React.Component<CommentsProps, any> {
  render() {
    return (
      <Model
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        animationInTiming={1000}
        animationOutTiming={1000}
        isVisible={this.props.isOpen}
        onBackdropPress={() => this.props.isOpen}>
        <View
          style={{
            backgroundColor: colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(8),
            paddingTop: wp(5),
            paddingLeft: wp(4),
            paddingRight: wp(4),
            paddingBottom: wp(5),
          }}>
          <View style={{marginTop: wp(3)}}>
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: 'bold',
                marginBottom: wp(3),
              }}>
              Edit / Discard
            </Text>
          </View>

          <View style={styles.attachmentsContainer}>
            <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>
              Attachments
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignSelf: 'center',
              }}>
              {this.props.attachments.map((d: any, i: number) => {
                if (d.type == 'photo') {
                  return (
                    <TouchableOpacity
                      onPress={() => this.setState({imageViewer: true})}
                      style={[
                        styles.AttchimageContainer,
                        {width: wp(30), borderRadius: wp(1)},
                      ]}>
                      <Image
                        source={{
                          uri: d.url,
                        }}
                        style={[GlStyles.images, {borderRadius: wp(3)}]}
                        resizeMode={'cover'}
                      />
                      {/* {d.upload == 'self' ? ( */}
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: wp(0),
                        }}
                        onPress={() => {
                          var arr = [...this.state.attachments].filter(
                            (b) => b != d,
                          );
                          console.log(arr);
                          this.setState({attachments: arr});
                        }}>
                        <Icon
                          containerStyle={{
                            marginRight: wp(2),
                            marginTop: wp(2),
                            opacity: 0.5,
                          }}
                          name="circle-with-cross"
                          size={wp(5)}
                          type="entypo"
                          color={colors.text}
                        />
                      </TouchableOpacity>
                      {/* ) : null} */}
                    </TouchableOpacity>
                  );
                } else {
                  <View>
                    <View
                      style={[
                        styles.AttchimageContainer,
                        {
                          backgroundColor: colors.secondary,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}>
                      <Image
                        source={
                          d.type == 'pdf'
                            ? images.pdf
                            : d.type == 'doc'
                            ? images.doc
                            : d.type == 'text'
                            ? images.text
                            : d.type == 'doc'
                            ? images.doc
                            : null
                        }
                        style={{width: wp(10), height: wp(10)}}
                      />

                      <Text
                        style={{
                          fontSize: wp(2.5),

                          color: colors.text,
                          marginTop: wp(2),
                        }}>
                        {d.name.split('.')[0].substring(0, 10)}...{' '}
                        {d.name.split('.')[1]}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          var arr = [...this.state.commentAttachment].filter(
                            (j) => j != d,
                          );
                          this.setState({commentAttachment: arr});
                        }}
                        style={{
                          position: 'absolute',
                          right: wp(2),
                          top: wp(2),
                          zIndex: wp(1),
                        }}>
                        <Icon
                          size={wp(5)}
                          name="circle-with-cross"
                          type="entypo"
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>;
                }
              })}
            </View>
          </View>
          <View style={styles.commentTextInput}>
            <TextInput
              style={{fontSize: wp(3), width: wp(50)}}
              multiline={true}
              value={this.state.commentText}
              onChange={(e) => this.setState({commentText: e.nativeEvent.text})}
              placeholder={'Your comment here '}
            />
            <View
              style={{
                top: wp(2.7),
                position: 'absolute',
                right: wp(3),
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => this.openDoc(this.state.commentAttachment)}
                style={{
                  backgroundColor: colors.lightBlue,
                  padding: wp(2),
                  marginRight: wp(2),
                  borderRadius: wp(3),
                }}>
                <Icon
                  size={wp(5)}
                  name="attachment"
                  type="entypo"
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.commentText != '') {
                    var map = [...this.state.comments];

                    map.push({
                      user: 'TestUser',
                      date: Date.now(),
                      image:
                        'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                      comment: this.state.commentText,
                      attachments: this.state.commentAttachment,
                    });
                    this.setState({
                      commentText: '',
                      comments: map,
                      commentAttachment: [],
                    });
                  }
                }}
                style={{
                  padding: wp(2),
                  borderRadius: wp(3),
                  backgroundColor: colors.lightBlue,
                }}>
                <Icon
                  size={wp(5)}
                  name="arrowright"
                  type="antdesign"
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Model>
    );
  }
}
