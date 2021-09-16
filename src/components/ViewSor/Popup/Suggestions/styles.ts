import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  containerPopup: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4),
    paddingTop: wp(5),
    paddingLeft: wp(1),
    paddingRight: wp(1),
    paddingBottom: wp(5),
  },
  containerText: {
    // justifyContent: "space-between",
    // flexDirection: 'row',
    marginTop: wp(2),
    // marginRight: wp(20),
  },
  involveSuggestCont: {
    // borderColor: colors.green,
    borderRadius: wp(3),
    padding: wp(3),
    paddingTop: wp(2),
    paddingBottom: wp(2),
    borderWidth: wp(0.1),
    borderColor: colors.lightGrey,
    marginTop: wp(1),
  },
  involvePSt: {
    fontSize: wp(3),
  },
  involvePsuggCont: {
    borderColor: colors.textOpa,
    borderBottomWidth: wp(0.1),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerTextString: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    // marginLeft: wp(25),
    textAlign: 'center',
    // alignSelf: 'center',
    marginBottom: wp(3),
  },
  commentTextInput: {
    width: wp(80),
    backgroundColor: colors.secondary,
    borderRadius: wp(4),
    alignItems: 'center',
    borderWidth: wp(0.2),
    // padding: wp(1),
    flexDirection: 'row',
    paddingLeft: wp(3),
    borderColor: colors.lightGrey,
  },
  textInputPopup: {
    fontSize: wp(3),
    width: wp(67),
  },
  pickerIcon: {
    top: wp(2.7),
    position: 'absolute',
    right: wp(3),
    flexDirection: 'row',
  },
  pickerIconStyle: {
    backgroundColor: colors.lightBlue,
    padding: wp(2),
    marginRight: wp(2),
    borderRadius: wp(3),
  },

  recommendationsHead: {
    fontSize: wp(3),
    // textAlign: 'left',
    marginLeft: wp(4),
    marginBottom: wp(2),
  },
  assignersHead: {
    fontSize: wp(3),
    // textAlign: 'left',
    // marginLeft: wp(7),
    marginTop: wp(3),
    fontWeight: 'bold',
    marginBottom: wp(2),
  },
  AttchimageContainer: {
    width: wp(40),
    height: wp(30),

    borderRadius: wp(3),
    margin: wp(1),
  },
  tagAssigners: {
    fontSize: wp(3),
    textAlign: 'left',
    marginTop: wp(3),
    marginBottom: wp(2),
  },
  arrowRightAssigners: {
    backgroundColor: colors.lightBlue,
    padding: wp(2),
    marginRight: wp(2),
    borderRadius: wp(3),
    position: 'absolute',
    right: wp(0),
  },
  tagsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: wp(3),
    marginRight: wp(3),
    marginLeft: wp(3),
  },
  selectYourElemination: {
    fontSize: wp(3),
    fontWeight: 'bold',
    opacity: 0.5,
    marginTop: wp(5),
  },
  eleminationAndAdministrativeContainer: {
    marginTop: wp(5),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp(3),
  },

  // Discard and save container

  btnsContainer: {
    marginBottom: wp(5),
    flexDirection: 'row',
    marginTop: wp(7),
  },
  btnDiscard: {
    marginRight: wp(3),
    paddingLeft: wp(15),
    paddingRight: wp(15),
    paddingTop: wp(4),
    borderColor: colors.primary,
    borderWidth: wp(0.2),
    paddingBottom: wp(4),
    borderRadius: wp(3),
  },
  btnDiscardText: {
    fontSize: wp(3),
    color: colors.primary,
  },
  saveBtn: {
    paddingLeft: wp(15),
    paddingRight: wp(15),
    paddingTop: wp(4),
    borderRadius: wp(3),
    // borderColor: colors.text, ,
    borderWidth: wp(0.2),
    paddingBottom: wp(4),
    backgroundColor: colors.primary,
  },
  sveBtnText: {
    fontSize: wp(3),
    color: colors.secondary,
  },

  justificationContainer: {},
  justificationtext: {
    fontSize: wp(3),

    color: colors.primary,
    fontFamily: fonts.SFuiDisplayMedium,
  },
  justificationHeadingText: {
    marginBottom: wp(2),
    fontSize: wp(3),
    fontFamily: fonts.SFuiDisplayMedium,
  },
  justificationtextOptional: {
    fontStyle: 'italic',
    fontSize: wp(3),

    fontFamily: fonts.SFuiDisplayUltraLight,
    opacity: 0.3,
  },
});

export default styles;
