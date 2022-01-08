import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  content: {
    // flex: 2,

    flex: 1,
    backgroundColor: colors.secondary,
    // borderTopLeftRadius: wp(8),
    // borderTopRightRadius: wp(8),
    padding: wp(2),
    // paddingTop: wp(2),
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
  conversationContainer: {
    // marginTop: wp(5),
  },
  ttleConversation: {
    fontFamily: fonts.SFuiDisplayBold,
    color: colors.text,
    fontSize: wp(3.5),
    marginBottom: wp(2),
  },
  line: {
    borderWidth: wp(0.1),
    borderColor: colors.textOpa,
  },

  wrap: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // marginHorizontal: 15,
    overflow: 'hidden',
  },
  buttonStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  topPart: {
    paddingVertical: 50,
    alignItems: 'center',
    padding: 20,
  },
  bottomPart: {
    paddingVertical: 20,
    padding: 20,
    backgroundColor: colors.lightGray,
  },
});

export default styles;
