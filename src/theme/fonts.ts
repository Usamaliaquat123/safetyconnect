import {Platform} from 'react-native';

export const fonts = {
  SFuiDisplayBlack:
    Platform.OS == 'ios' ? 'SF UI Display Black' : 'SFuiDisplayBlack',
  SFuiDisplayBold:
    Platform.OS == 'ios' ? 'SF UI Display Bold' : 'SFuiDisplayBold',
  SfuiDisplayHeavy:
    Platform.OS == 'ios' ? 'Sf UI Display Heavy' : 'SfuiDisplayHeavy',
  SFuiDisplayLight:
    Platform.OS == 'ios' ? 'SF UI Display Light' : 'SFuiDisplayLight',
  SFuiDisplayMedium:
    Platform.OS == 'ios' ? 'SF UI Display Medium' : 'SFuiDisplayMedium',
  SFuiDisplaySemiBold:
    Platform.OS == 'ios' ? 'SF UI Display Semibold' : 'SFuiDisplaySemiBold',
  SFuiDisplayThin:
    Platform.OS == 'ios' ? 'SF UI Display Thin' : 'SFuiDisplayThin',
  SFuiDisplayUltraLight:
    Platform.OS == 'ios' ? 'SF UI Display Ultralight' : 'SFuiDisplayUltraLight',
};
