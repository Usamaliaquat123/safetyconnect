import {colors} from '@theme/colors';
import RNFetchBlob from 'rn-fetch-blob';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PermissionsAndroid} from 'react-native';
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
    }
  }
  return strArr;
};
// Messaging part
export const searchInObjects = (k: string, arr: Array<any>) => {
  var strArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === k) {
      strArr.push(arr[i]);
    }
    return strArr;
  }
};

export const setHeaderAllign = {
  HEADER_MAX_HEIGHT: wp(65),
  HEADER_MIN_HEIGHT: wp(70),
};

export const createAction = (actionType: string) => (payload?: any) => ({
  type: actionType,
  payload: payload,
});

const {config, fs} = RNFetchBlob;
const d: Date = new Date();
const PictureDir = fs.dirs.PictureDir;
const options = {
  fileCache: true,
  addAndroidDownloads: {
    useDownloadManager: true,
    notification: false,
    path: PictureDir + '/me_' + Math.floor(d.getMinutes() + d.getSeconds() / 2),
    description: 'Downloading File',
  },
};

const checkPermission = async (type: string) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: `Permission to download ${type}`,
      message:
        'Safety Client want to download some' + `${type} we need to access`,
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'no',
      buttonPositive: 'sure',
    },
  );
  return new Promise((resolve, reject) => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};
export const downloadFile = (file: string, typee: string) => {
  return new Promise((resolve, reject) => {
    checkPermission(typee)
      .then((res) =>
        config(options)
          .fetch('GET', file)
          .then((res: any) => resolve(res))
          .catch((err: any) => reject(err)),
      )
      .catch((err) => reject(err));
  });
};
