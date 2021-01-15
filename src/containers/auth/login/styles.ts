import { colors, fonts } from '@theme';
import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
 const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.primary
    },
    header: {
        padding: wp(7),
        paddingTop: wp(10),
        paddingBottom: wp(8),
        backgroundColor: colors.primary,
      },
      title: {
        fontSize: wp(5),
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
    //  content
    content: {
        padding: wp(5),
        backgroundColor: colors.secondary,
        borderTopLeftRadius: wp(7),
        borderTopRightRadius: wp(7),
      },
      headingContainer : {
          fontSize: wp(4.4),
          color: colors.primary,
          fontWeight: "bold"
      },
      inputsContainer: {
        marginTop :wp(7),
      },
      emailTextContainer: { 
        fontSize: wp(3.5),
        fontWeight: "bold"
      },
      inputContainer: {
          marginTop: wp(2),
          borderColor: colors.green,
          borderWidth: wp(0.3),
          paddingLeft: wp(3),
          borderRadius: wp(3),
          flexDirection: "row",
alignItems:"center"          
      },
      passTextContainer : {
          marginTop: wp(4),
        fontSize: wp(3.5),
        fontWeight: "bold"
      },
      authInputs : {
          fontSize: wp(3)
      },
      forgetPassText:  {
        fontSize: wp(3),
        marginTop: wp(5),
      },
      eyeIconContainer : {
        position: "absolute",
        right: wp(3)
      },
      signinText:  {
        fontSize: wp(3.4),
        fontWeight:"bold",
        color: colors.secondary
      },
      signinTextGoogle:  {
        fontSize: wp(3.4),
        fontWeight:"bold",
        color: colors.primary
      },
      siginBtnContainer:  {
          marginTop: wp(10),
          alignSelf:"center",
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        width: wp(70),
        padding: wp(4),
        borderRadius: wp(3)
      },
      siginwithGoogle:  {
          marginTop: wp(10),
          alignSelf:"center",
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        width: wp(70),
        padding: wp(4),
        flexDirection: "row",
        borderWidth: wp(0.2),
        borderColor: colors.primary,
        borderRadius: wp(3)
      },
      orContainer:  {
          marginTop: wp(5),
          justifyContent: "center",
          flexDirection: "row"
      },
      line: {
          width: wp(40),
            borderTopWidth: wp(0.1),
            marginTop: wp(2.3)
       },
       orText:  {
           fontSize: wp(3),
           marginLeft: wp(3),
           marginRight: wp(3)
       }
 });


 export default styles