
import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { colors } from "@theme";
const styles = StyleSheet.create({
    listVwCntent: {
        // paddingLeft: wp(),
        paddingTop: wp(4),
        paddingBottom: wp(4),
        borderBottomWidth: wp(0.1),
        borderBottomColor:colors.textOpa 
      }
      ,
      listAvatars: {
        marginTop: wp(-1),
        flexDirection: "row", position: "absolute", right: wp(3)
      },
      listBottomView : {
        flexDirection: "row",
      
        marginLeft: wp(8)
      },
      listUserTimeDate : {
        fontSize: wp(2.5),
        opacity:.5
      }, 
      listMomentLT: {
        marginLeft: wp(3),
        fontSize: wp(2.5),
        opacity: 0.5,
      },
      listMomentDate:  {
        marginLeft: wp(1),
                                  fontSize: wp(2.5),
                                  opacity: 0.5,
      },
      listAvatarLeft: {
        position: 'absolute',
        right: wp(4),
      },
    
      listObDesc : {
        marginLeft: wp(3), fontSize: wp(3)
    
      }
})


export default styles