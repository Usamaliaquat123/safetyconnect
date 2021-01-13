import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  header: {
    padding: wp(5),
    paddingRight: wp(7),
    paddingLeft: wp(7),
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(4),
    marginLeft: wp(5),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(5),
    padding: wp(0.5),
    borderRadius: 10,
  },
  headertle: {flexDirection: 'row'},
  headerSelect: {
    marginTop: wp(10),
    flexDirection: 'row',
    // alignContent: 'stretch',
    justifyContent: 'space-between',
    width: wp(100),
  },
  content: {
    flex: 2,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
  },
  hselectort: {color: colors.secondary, fontWeight: 'bold', fontSize: wp(3)},
  selectorBox: {color: colors.secondary, fontSize: wp(3)},
  rightSelector: {flexDirection: 'row', marginRight: wp(12)},
  leftSelector: {flexDirection: 'row'},
  selector: {
    paddingLeft: 3,
    width: wp(20),
  },

  slctContainer: {
    // position: 'absolute',
    top: wp(5),
    zIndex: wp(5),
    // left: wp(13),
    backgroundColor: colors.secondary,
    // padding: wp(5),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    paddingTop: wp(1),
    paddingBottom: wp(1),
    // width: wp(22),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  itemH: {
    color: 'black',
    fontSize: wp(3),
    padding: wp(1),
  },
  avatarView: {
    position: 'absolute',
    right: 0,
  },
  // cards
  notifiedTextContaienr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(10),
    paddingRight: wp(5),
    marginBottom: wp(3),
  },
  notifiedText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  cardConatiner: {
    marginLeft: wp(5),
    marginBottom: wp(5),
    marginRight: wp(1),
  },
  // draft
  draftTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(8),
    paddingRight: wp(5),
    marginBottom: wp(3),
  },
  draftText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  draftCardContainer: {
    marginLeft: wp(1),
    marginBottom: wp(5),
    marginRight: wp(1),
  },
  // submite
  submitTextContaienr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp(3),
    paddingLeft: wp(6),
    paddingRight: wp(12),
  },
  submitText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
  },
  submitCardContainer: {
    marginLeft: wp(1),
    marginBottom: wp(5),
    marginRight: wp(7),
  },

    listHeader: {
    flexDirection : "row",
      paddingLeft: wp(3)
  },
  listDraftText: {
    fontSize: wp(3.5),
    fontWeight: "bold",
    color: colors.text,
    marginTop :wp(-1),
    marginLeft: wp(5)
  },
  listViewContent: {
marginTop: wp(5),
marginLeft: wp(3),
  },
 


});

export default styles;
