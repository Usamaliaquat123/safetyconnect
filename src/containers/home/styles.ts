import {StyleSheet} from 'react-native';
import { colors, fonts } from '@theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  avatarView: {
    // position: 'absolute',
    // right: 0,  
    flexDirection: "row"
  },


  orgLogo : { backgroundColor: colors.secondary, justifyContent: "center", alignItems:"center", borderRadius: wp(3),padding: wp(2) },
  orgLogoPng : { width: wp(10), height:wp(10)},

  headertle: {flexDirection: 'row'},
  underScrore: {
    backgroundColor: colors.green,
    width: wp(6),
    marginLeft: wp(3),
    padding: wp(0.5),
    borderRadius: 10,
  },
  header: {
    padding: wp(7),
    paddingLeft: wp(4),
    paddingTop: wp(7),
    paddingBottom: wp(7),
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: wp(3.6),
    marginLeft: wp(3),
    color: colors.secondary,
    
  },
  orgTitle : {
    fontSize: wp(5),
    marginLeft: wp(3),
    color : colors.secondary,
    fontWeight: "bold"
  },

  content : {
    // padding: wp(5),
    backgroundColor: colors.darkLightGrey,
    
    // flex: 2,
    // marginTop: wp(80),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },


  // Content

  menu : {
    padding: wp(5),
    backgroundColor :colors.secondary,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  recentActivity:  {
    marginTop :wp(2),
    padding: wp(5),
    backgroundColor:colors.secondary
  },
  perfStats : {
    marginTop :wp(2),
    padding: wp(5),
    backgroundColor: colors.secondary
  },
  actHeading : {  
    fontSize :wp(5),
    fontWeight : "bold",
    color: colors.primary
  },
  recentlyHead : {
    alignItems : "center",
    flexDirection:"row"
  },
  viewAll : {
    fontSize: wp(3.3),
    position: "absolute",
    right: wp(0)
  }
});

export default styles;
