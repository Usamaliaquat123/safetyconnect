
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { colors } from "@theme";

const styles =  StyleSheet.create({

    attachmentsContainer: {
        marginTop: wp(5),
        marginBottom: wp(10),
      },
      AttchimageContainer: {
        width: wp(43),
        height: wp(30),
       
        borderRadius: wp(3),
        margin: wp(1),
      },    
      commentTextInput: {
        width: wp(80),
        backgroundColor: colors.secondary,
        borderRadius: wp(4),
        alignItems: "center",
        borderWidth : wp(0.2),
        // padding: wp(1),
        flexDirection: "row",
        paddingLeft: wp(3),
       borderColor: colors.lightGrey 
      },


      containerText:  {
        marginTop: wp(3)
      },
    containerPopup:  {
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: wp(8),
      paddingTop: wp(5),
      paddingLeft: wp(1),
      paddingRight: wp(1),
      paddingBottom: wp(5),
    },
    containerTextString:  {
      fontSize: wp(4),
      fontWeight: 'bold',
      marginBottom: wp(3),
    },
    textInputPopup : {
      fontSize: wp(3), width: wp(50)
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
    attachmentContainerContent:  {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
    },
    iconWithCircle: { 
      marginRight: wp(2),
      marginTop: wp(2),
      opacity: 0.5,
    },

    AttchfileContainer: {
      height: wp(30),
     
      borderRadius: wp(3),
      margin: wp(1), width: wp(40),
      borderWidth: wp(0.2),
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },  
    imageFile:  {
      width: wp(10), height: wp(10)
    },
    fileNameTxt: {
      fontSize: wp(2.5),

      color: colors.text,
      marginTop: wp(2),
    },

    circleWithCrossFile :  {
      position: 'absolute',
      right: wp(2),
      top: wp(2),
      zIndex: wp(1),
    },
    
    // buttons container
    buttonContainer : {
      flexDirection: 'row', marginTop: wp(3)
    },
    discardContainer: {
      backgroundColor: colors.secondary,
      paddingLeft: wp(13),
      paddingRight: wp(13),
      borderWidth: wp(0.2),
      marginRight: wp(3),
      borderRadius: wp(2),
      padding: wp(3),
      borderColor: colors.primary,
    },
    discardText:  {
      fontSize: wp(3), color: colors.text
    },
    saveContainer : {
      backgroundColor: colors.primary,
      padding: wp(3),
      borderRadius: wp(2),
      paddingLeft: wp(14),
      paddingRight: wp(14),
    },
    saveContainerText:  {
      fontSize: wp(3),
                  color: colors.secondary,
                  fontWeight: 'bold',
    }
})

export default styles