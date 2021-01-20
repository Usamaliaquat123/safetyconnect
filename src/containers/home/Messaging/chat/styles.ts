import {StyleSheet} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  header: {
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.4),
  },
  containerAvatar: {
    marginLeft: wp(4),
  },
  headRightIcon: {
    position: 'absolute',
    right: wp(5),
    left: wp(80),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  userNameText: {
    marginLeft: wp(4),
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  exitUser: {},
  userAddIcon: {
    // marginRight: wp(10),
  },
  isonline: {
    position: 'absolute',
    backgroundColor: colors.green,
    borderRadius: wp(5),
    padding: wp(1.3),
    right: wp(0),
    bottom: wp(0),
  },
  sendContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // marginRight: 15,
  },



  // left container message
  leftContainer: {
    backgroundColor: colors.lightBlue,
    borderTopRightRadius: wp(3),
    borderBottomRightRadius: wp(3),
    padding: wp(3),
    alignContent: 'center',
    borderBottomLeftRadius: wp(2),
    borderTopLeftRadius: wp(2),
  },
  // container of arrow
  LeftcontainerOfArrow: {
    width: 0,
    position: 'absolute',
    right: wp(-2),
    top: wp(2),
    borderTopWidth: wp(3),
    borderTopColor: 'transparent',
    borderLeftColor: colors.lightBlue,
    borderLeftWidth: wp(3),
    borderBottomWidth: wp(3),
    borderBottomColor: 'transparent',
  },
  // container of date
  LeftContainerOfDate: {
    fontSize: wp(2.5),
    position: 'absolute',
    bottom: wp(-3.5),
    right: 0,
    marginRight: wp(2),
    opacity: 0.5,
  },

// container OF Imagetainer
containerOfImage : {
  position: 'relative',
  flexWrap: 'wrap',
  width: wp(10),
},
imageTag: {
  width: wp(20),
  height: wp(20),
  borderRadius: wp(3),
  marginRight: wp(2),
},

// container of Text
containerOfDate:  {
  fontSize: wp(2.5), marginLeft: wp(2), opacity: 0.5
},
  // container of arrow
  containerOfArrow:  {
    width: 0,
    position: 'absolute',
    left: wp(-2),
    top: wp(2),
    borderTopWidth: wp(3),
    borderTopColor: 'transparent',
    borderRightColor: colors.lightBlue,
    borderRightWidth: wp(3),
    borderBottomWidth: wp(3),
    borderBottomColor: 'transparent',
  },
  // container of text
  containerOfText: {
    position: 'relative',
    backgroundColor: colors.lightBlue,
    borderTopLeftRadius: wp(3),
    borderBottomLeftRadius: wp(3),
    padding: wp(3),
    // width: wp(50),
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
    alignContent: 'center',
  },
  // message
  messageTimeAndNameContainerRight: {},
  messageTimeAndNameContainerLeft: {},
  messageTime: {},
  messageUsername: {},
});

export default styles;
