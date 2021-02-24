import {colors} from '@theme/colors';
import * as ImagePicker from 'react-native-image-picker/src';

import RNFetchBlob from 'rn-fetch-blob';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {resolvePlugin} from '@babel/core';
export const classifySor: Array<Object> = [
  {
    icon: 'warning',
    type: 'antdesign',
    title: 'concern',
    selected: false,
    color: colors.classify_sor_btns.concern,
  },
  {
    icon: 'check-circle',
    type: 'font-awesome-5',
    selected: false,
    title: 'positive',
    color: colors.classify_sor_btns.positive,
  },
  {
    icon: 'aperture',
    selected: false,
    type: 'ionicon',
    title: 'lsr',
    color: colors.classify_sor_btns.lsr,
  },
  {
    icon: 'centercode',
    selected: false,
    type: 'font-awesome-5',
    title: 'near miss',
    color: colors.classify_sor_btns.nearmiss,
  },
];

export const filterLocation = (str: any) => {
  return str.match(/@\S+/);
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const validatePassword = (password: string): boolean => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(String(password).toLowerCase());
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
export const setAsncStorage = (key: string, d: Array<Object>) => {
  // return AsyncStorage.setItem(key, JSON.stringify(d))
};
export const mapAsyncStorage = (key: string, d: any) => {
  // var arr : []
  // AsyncStorage.getItem(key).then((v: any) => {
  // arr = JSON.parse(v)
  // return arr.push(d)
  // }).catch(err => [err])
};

export const getAsyncStorage = (key: string): any => {
  // AsyncStorage.getItem(key).then(res => {return res})
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
// online
export const checkPermissionOfCamea = async (type: string) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: `Permissions to use camera  ${type}`,
      message: 'Safety Client want to granted access to camera',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'no',
      buttonPositive: 'sure',
    },
  );
};
// Image picker
export const imagePicker = () => {
  return new Promise((resolve, reject) => {
    try {
      ImagePicker.launchImageLibrary(
        {mediaType: 'photo'},
        (res: ImagePicker.ImagePickerResponse) => {
          resolve(res);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

// Camera capture
export const cameraCapture = () => {
  return new Promise((resolve, reject) => {
    try {
      ImagePicker.launchCamera(
        {saveToPhotos: true, mediaType: 'photo'},
        (res: ImagePicker.ImagePickerResponse) => {
          resolve(res);
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

// Doc Type picker
export const DocType = (res: any, attachments: Array<Object>) => {
  return new Promise((resolve, reject) => {});
};
