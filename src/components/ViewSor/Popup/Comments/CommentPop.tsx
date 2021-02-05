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
export interface CommentPopProps {
  openDoc: Function;
  onClose: Function;
  isOpen: boolean;
  attachments: Array<any>;
  deleteAttachment: Function;
  commentAttachmentOnChange: Function;
  commentAttachmentArr: Array<any>;
  submitComment: Function;
  commentTextString: String;
  commentIndex: number;
  comments: Array<any>;
  editDiscardComment: any;
  commentTextStringOnChange: Function;
}

export default class CommentPop extends React.Component<CommentPopProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      comments: props.comments,
    };
  }
  render() {
    return (
      <Model
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        animationInTiming={1000}
        animationOutTiming={1000}
        isVisible={this.props.isOpen}
        onBackdropPress={() => this.props.onClose()}>
        <View style={styles.containerPopup}>
          <View style={styles.containerText}>
            <Text style={styles.containerTextString}>Edit / Discard</Text>
          </View>
          <View style={styles.commentTextInput}>
            <TextInput
              style={styles.textInputPopup}
              multiline={true}
              value={this.props.editDiscardComment}
              onChange={(e) => {
                this.props.commentTextStringOnChange(e.nativeEvent.text);
              }}
              placeholder={'Your comment here '}
            />
            <View style={styles.pickerIcon}>
              <TouchableOpacity
                onPress={() => this.props.openDoc(this.props.attachments)}
                style={styles.pickerIconStyle}>
                <Icon
                  size={wp(5)}
                  name="attachment"
                  type="entypo"
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          {this.props.attachments.length != 0 && (
            <View style={styles.attachmentsContainer}>
              <View style={styles.attachmentContainerContent}>
                {this.props.attachments.map((d: any, i: number) => {
                  if (d.type == 'photo') {
                    return (
                      <View
                        style={[
                          styles.AttchimageContainer,
                          {width: wp(40), borderRadius: wp(1)},
                        ]}>
                        <Image
                          source={{
                            uri: d.url,
                          }}
                          style={[GlStyles.images, {borderRadius: wp(3)}]}
                          resizeMode={'cover'}
                        />
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            right: wp(0),
                          }}
                          onPress={() => {
                            var arr = [...this.props.attachments].filter(
                              (b) => b != d,
                            );
                            console.log(arr);
                            this.props.deleteAttachment(arr);
                          }}>
                          <Icon
                            containerStyle={styles.iconWithCircle}
                            name="circle-with-cross"
                            size={wp(5)}
                            type="entypo"
                            color={colors.text}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }
                  if (d.type != 'photo') {
                    return (
                      <View>
                        <View style={[styles.AttchfileContainer]}>
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
                            style={styles.imageFile}
                          />

                          <Text style={styles.fileNameTxt}>
                            {d.name.split('.')[0].substring(0, 10)}...{' '}
                            {d.name.split('.')[1]}
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              var arr = [...this.props.attachments].filter(
                                (j) => j != d,
                              );
                              console.log(arr);
                              this.props.deleteAttachment(arr);
                            }}
                            style={styles.circleWithCrossFile}>
                            <Icon
                              size={wp(5)}
                              name="circle-with-cross"
                              type="entypo"
                              color={colors.text}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.props.onClose()}
              style={styles.discardContainer}>
              <Text style={styles.discardText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.submitComment()}
              style={styles.saveContainer}>
              <Text style={styles.saveContainerText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Model>
    );
  }
}
