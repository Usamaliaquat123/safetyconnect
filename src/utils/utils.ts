import {colors} from '@theme/colors';
import * as ImagePicker from 'react-native-image-picker/src';
import {Auth} from 'aws-amplify';

import RNFetchBlob from 'rn-fetch-blob';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {resolvePlugin} from '@babel/core';
import {involved_persons, report, orgnaization} from '@typings';
import Amplify, {Storage} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const mainPass: string = 'Safety_Connect1';
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

// export const filterEmailsAndSave = (str: Array<any>): Array<any> => {
//   for (let i = 0; i < str.length; i++) {

//     if (validateEmail(str.name)) {
//       AsyncStorage.getItem('invitedEmails').then((emails) => {
//         if (emails == null) {
//           AsyncStorage.setItem('invitedEmails', JSON.stringify([str]));
//         } else {
//           var emil = [...emails];
//           emil.push(str);
//           AsyncStorage.setItem('invitedEmails', JSON.stringify(emil));
//         }
//       });
//       return [];
//     } else {
//       return [];
//     }

//   }

// };
export const filterLocation = (str: any) => {
  return str.match(/@\S+/);
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const validatePassword = (password: string): boolean => {
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})$/

  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/;
  return re.test(String(password));
};

// Saved current project id with current organization id
export const savedCurrentProjectAndOrganizations = async (
  pid: string,
  orgId: string,
) => {
  await AsyncStorage.setItem('projectId', pid);
  await AsyncStorage.setItem('organizationId', orgId);
};
// Get current project
export const getCurrentProject = () => {
  return new Promise((resolve, reject) => {
    try {
      var projId = AsyncStorage.getItem('projectId');
      resolve(projId);
    } catch (e) {
      reject(e);
    }
  });
};
// Get current organization
export const getCurrentOrganization = () => {
  return new Promise((resolve, reject) => {
    try {
      var orgId = AsyncStorage.getItem('organizationId');
      resolve(orgId);
    } catch (e) {
      reject(e);
    }
  });
};

// Suggest in Actions an recommendations
export const suggestInActionsRecommendations = (
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
// Search in Involved Persons
export const searchInSuggestions = (
  str: string,
  strArray: Array<involved_persons>,
): Array<Object> => {
  var strArr = [];
  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].email.toLowerCase().match(str)) {
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

// Getting files from S3 STORAGE BUCKET RETURN Arr<str>
export const getFiles = (userId: string, dir: string): Array<string> => {
  var arr: Array<string> = [];
  Storage.list(`${dir}/${userId}/`, {
    customPrefix: `public/`,
  }).then((res) => {
    res.forEach((result: any, i: number) => {
      if (i !== 0) {
        Storage.get(result.key.split('/')[2]).then((uri: any) => {
          arr.push(uri);
        });
      }
    });
  });
  return arr;
};
// Saving files to S3 STORAGE
// export const saveFiles = (userId : string, dir: string)

export const setHeaderAllign = {
  HEADER_MAX_HEIGHT: wp(65),
  HEADER_MIN_HEIGHT: wp(70),
};

export const createAction = (actionType: string) => (payload?: any) => ({
  type: actionType,
  payload: payload,
});

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Mapping projects and organization and save in local
export const mappProjectOrg = (organizations: string, project: string) => {
  AsyncStorage.getItem('user').then((res: any) => {
    var user = JSON.parse(res);
    if (organizations !== '') {
      mapAllOrganizations(user.organizations, organizations);
    } else if (project !== '') {
      mapAllProjects(
        user.organizations.filter((d: any) => d.selected == true)[0].projects,
        project,
      );
    }
    AsyncStorage.setItem('user', JSON.stringify(user));
  });
};

//  Manageing Projects
export const mapAllProjects = (
  projects: Array<any>,
  currentProject: string,
): Array<any> => {
  return projects.map((d: any) => {
    if (d._id == currentProject) {
      d['selected'] = true;
    } else {
      d['selected'] = false;
    }
  });
};
// Managing Organizations
export const mapAllOrganizations = (
  organizations: any,
  selectedOrganizations: string,
) => {
  return organizations.map((d: any) => {
    if (d._id == selectedOrganizations) {
      d['selected'] = true;
    } else {
      d['selected'] = false;
    }
  });
};
// filtering and mapping involved persons data
export const filterAndMappingPersons = (
  report: report,
  persons: Array<any>,
): Object => {
  report.submit_to?.map;
  report.submit_to?.map((emails: any, i: number) => {
    report.submit_to = persons.filter((d: any) => d.email == emails);
  });
  report.esclate_to?.map((emails: any, i: number) => {
    report.esclate_to = persons.filter((d: any) => d.email == emails);
  });
  report.involved_persons?.map((id: any, i: number) => {
    report.involved_persons = persons.filter((d: any) => d._id == id);
  });

  return report;
};
// suffix of numbers
export const suffixThNd = (i: number): string => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const imageAndVideoObjectMap = (
  attachments: Array<string>,
): Array<Object> => {
  var arr = [];
  for (let i = 0; i < attachments.length; i++) {
    arr.push({
      type: attachments[i].split('.').pop(),
      name: attachments[i].split('/').pop()?.split('.')[0],
      url: attachments[i],
    });
  }
  return arr;
};

export const sorProjectMapper = () => {};

export const imageVideoDetector = (attachments: any): Array<Object> => {
  var arr = attachments;
  for (let i = 0; i < arr.length; i++) {
    if (
      attachments.type == 'png' ||
      attachments.type == 'jpg' ||
      attachments.type == 'jpeg'
    ) {
      arr[i].type = 'photo';
    } else if (
      attachments.type == 'mp4' ||
      attachments.type == 'mov' ||
      attachments.type == 'mkv'
    ) {
      arr[i].type = 'video';
    } else if (attachments.type == 'pdf') {
      arr[i].type = 'pdf';
    } else if (attachments.type == 'txt') {
      arr[i].type = 'text';
    }
  }

  return arr;
};

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
// Search in involved persons
export const searchInInVolvedPersons = (k: string, arr: Array<any>) => {
  var strArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === k) {
      strArr.push(arr[i]);
    }
    return strArr;
  }
};

export const getLinkParam = (param: string, url: string) => {
  // if (!url) url = location.href;
  param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\?&]' + param + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
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

export const redirectDynamiclink = (link: any, navigation: any) => {
  console.log(link);
  // console.log(link);
  if (link != null) {
    if (link.url.split('/')[3].split('?')[0] == 'user-info') {
      navigation.navigate('CreatePass', {
        email: link.url
          .split('/')[3]
          .split('?')[1]
          .split('email=')[1]
          .split('&')[0],
        code: link.url.split('/')[3].split('?')[1].split('&')[1].split('=')[1],
        type: 'verify',
      });
    } else if (link.url.split('/')[3].split('?')[0] == 'change-password') {
      console.log(link);
      navigation.navigate('ChangePassword', {
        email: link.url
          .split('/')[3]
          .split('?')[1]
          .split('email=')[1]
          .split('&')[0],
        code: link.url.split('/')[3].split('?')[1].split('&')[1].split('=')[1],
      });
    }
  }
};

// Google Authentications
export const GOOGLE_AUTH = () => {
  return new Promise((resolve, reject) => {
    try {
      var data = Auth.federatedSignIn({provider: 'Google'});

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const APPLE_AUTH = async (navigator: any, page: string) => {
  return null;
};

// Doc Type picker
export const DocType = (res: any, attachments: Array<Object>) => {
  return new Promise((resolve, reject) => {});
};
