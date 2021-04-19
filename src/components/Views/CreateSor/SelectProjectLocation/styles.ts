import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { fonts,colors } from "@theme";
const styles = StyleSheet.create({
    selectProjectLocationContainer : {
        paddingLeft : wp(3),
        paddingRight : wp(3),
        marginBottom : wp(5),
        marginTop : wp(5),
        // justifyContent : "space-evenly",
        flexDirection : "row",
      },
      selectProjectContainer : {

    },
    selectProjHead : {
      fontSize :wp(4),
      opacity : .6,
      fontFamily  : fonts.SFuiDisplayMedium
    },
    selectlocationHead: {
      fontSize: wp(4),
      opacity: .6,
      fontFamily: fonts.SFuiDisplayMedium
    },
    selectProj: {
      marginTop: wp(2),
      alignItems: "center",
      paddingLeft: wp(5),
      paddingRight: wp(5),
      borderWidth: wp(0.4),
      paddingTop: wp(3),
      paddingBottom: wp(3),
      borderColor: colors.textOpa,
      borderRadius: wp(1),
      flexDirection: "row",
    },
    downIcon : {
        marginLeft  :wp(7),
    
       opacity : .7
      },
      selectLocationContainer : {
        marginLeft : wp(6),
      },
      projName : {
        fontSize : wp(3),
        opacity : .7,
        fontFamily : fonts.SFuiDisplayMedium
      },
      locaName  : {
        fontSize : wp(3),
        opacity : .7,
        fontFamily : fonts.SFuiDisplayMedium
      },
      selectLocation : {
        marginTop : wp(2),
        alignItems : "center",
        paddingLeft : wp(5),
        paddingRight : wp(5),
        borderWidth : wp(0.4),
        paddingTop : wp(3),
        paddingBottom : wp(3),
        borderColor :colors.textOpa,
        borderRadius : wp(1),
        flexDirection : "row"
      },
});

export default styles;
