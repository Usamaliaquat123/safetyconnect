import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { colors } from "@theme";
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.primary
    },
    header: {
        padding: wp(1),
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
        height:hp(100),
        padding: wp(5),
        paddingBottom: hp(20),
        backgroundColor: colors.secondary,
        borderTopLeftRadius: wp(7),
        borderTopRightRadius: wp(7),
      },
      headingContainer : {
          fontSize: wp(5),
          color: colors.primary,
          fontWeight: "bold"
      },
      inputsContainer: {
        marginTop :wp(1),
      },
      emailTextContainer: { 
        fontSize: wp(3.8),
        marginTop: wp(5),
        fontWeight: "bold",
        opacity: .7
      },
      inputContainer: {
          marginTop: wp(1),
          borderColor: colors.green,
          borderWidth: wp(0.3),
          paddingLeft: wp(3),
          padding: wp(4),
          borderRadius: wp(3),
          flexDirection: "row",
alignItems:"center"          
      },
      selectText: {
        opacity: .5,
        textAlignVertical: "top",
        fontWeight:"bold"
      },
      passTextContainer : {
        fontSize: wp(3.5),
        fontWeight: "bold"
      },
      authInputs : {
          fontSize: wp(4)
      },
      signinText:  {
        fontSize: wp(4),
        fontWeight:"bold",
        color: colors.secondary
      },
      signinTextGoogle:  {
        fontSize: wp(4),
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
          marginTop: wp(5),
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
           fontSize: wp(3.8),
           opacity: .5,
           marginLeft: wp(3),
           marginRight: wp(3)
       },
       dontHaveAccount: {
           fontSize: wp(3.5 ),
           color: colors.text,
           opacity: .5,
           marginTop: wp(3),
           fontWeight: "bold"
       },
       createNewAccount: {
           color: colors.text,
           opacity: .7,
           fontSize: wp(3.4),
           fontWeight: "bold",
           textAlign: "center"
       },
       createnewaccountContainer: {
           marginTop: wp(3)
       },
       eyeIconContainer: {
        position: "absolute",
        right: wp(3)
       },
      // image upload container
      imageUploadContainer: {
        alignItems: "center",
        marginTop: wp(3)
      },
      imagenotuploadContainer : {
        position:"absolute",
        alignSelf: "center",
        marginTop: wp(5)
      },
      uploadPicText:  {
        fontSize: wp(3.8),
        color: colors.text,
        opacity: .5,
        fontWeight: "bold"
      },

      imagenotUpoad : {
        backgroundColor: "#F0F8EE",
        borderRadius: wp(20),
        width:wp(32),
        height: wp(32),
      }
      ,



  // modal configuration

  takeaPhotoModal : {
    fontSize: wp(4),
    fontWeight: "bold",
    marginLeft: wp(10)
  },
  takeaPhotoContainer: {
    marginTop: wp(10),

    flexDirection: 'row',
  },
  avatarPencil: {
    
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
  involveSuggestCont: {
    borderColor: colors.green,
    borderRadius: wp(3),
    padding: wp(3),
    borderWidth: wp(0.3),
    marginTop: wp(1),
  },
})

export default styles