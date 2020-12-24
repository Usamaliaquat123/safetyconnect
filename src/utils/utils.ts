import {colors} from '@theme/colors';
export const classifySor: Array<any> = [
  {
    icon: 'warning',
    type: 'antdesign',
    title: 'Concern',
    selected: false,
    color: colors.classify_sor_btns.concern,
  },
  {
    icon: 'check-circle',
    type: 'font-awesome-5',
    selected: false,
    title: 'Positive',
    color: colors.classify_sor_btns.positive,
  },
  {
    icon: 'aperture',
    selected: false,
    type: 'ionicon',
    title: 'LSR',
    color: colors.classify_sor_btns.lsr,
  },
  {
    icon: 'centercode',
    selected: false,
    type: 'font-awesome-5',
    title: 'Near Miss',
    color: colors.classify_sor_btns.nearmiss,
  },
];

export const filterLocation = (str: any) => {
  return str.match(/@\S+/);
};

export const searchInSuggestions = (
  str: string,
  strArray: Array<string>,
): Array<string> => {
  var strArr = [];
  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].match(str)) {
      strArr.push(strArray[j]);
      return strArr;
    }
  }
  return [];
};
