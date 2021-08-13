import * as Sentry from '@sentry/react-native';
import Amplify, {Auth, Hub} from 'aws-amplify';
import {fromCognitoIdentityPool} from '@aws-sdk/credential-provider-cognito-identity';
import {CognitoIdentityClient} from '@aws-sdk/client-cognito-identity';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import OneSignal from 'react-native-onesignal';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import jwt_decode from 'jwt-decode';
import {createApi, submitted} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Load the SDK for JavaScript
// var AWS = require('aws-sdk');
// // Set the Region
// AWS.config.update({region: 'us-west-2'});

// OneSignal Configuration

const oneSignalConfig = () => {
  /* O N E S I G N A L   S E T U P */
  OneSignal.setAppId('df570e2e-881b-406d-b974-885ff8f31be3');
  OneSignal.setLogLevel(6, 0);
  OneSignal.setRequiresUserPrivacyConsent(false);
  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    // this.OSLog("Prompt response:", response);
    console.log(response);
  });

  /* O N E S I G N A L  H A N D L E R S */
  OneSignal.setNotificationWillShowInForegroundHandler((notifReceivedEvent) => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notifReceivedEvent,
    );
    let notif = notifReceivedEvent.getNotification();

    const button1 = {
      text: 'Cancel',
      onPress: () => {
        notifReceivedEvent.complete();
      },
      style: 'cancel',
    };

    const button2 = {
      text: 'Complete',
      onPress: () => {
        notifReceivedEvent.complete(notif);
      },
    };
  });
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal: notification opened:', notification);
  });
  OneSignal.setInAppMessageClickHandler((event) => {
    console.log('OneSignal IAM clicked:', event);
  });
  OneSignal.addEmailSubscriptionObserver((event) => {
    console.log('OneSignal: email subscription changed: ', event);
  });
  OneSignal.addSubscriptionObserver((event) => {
    console.log('OneSignal: subscription changed:', event);
    // this.setState({isSubscribed: event.to.isSubscribed});
  });
  OneSignal.addPermissionObserver((event) => {
    console.log('OneSignal: permission changed:', event);
  });

  // const deviceState = await OneSignal.getDeviceState();

  // this.setState({
  //   isSubscribed: deviceState.isSubscribed,
  // });
};

// configure Sentry
const configSentry = () => {
  return new Promise((resolve, reject) => {
    try {
      Sentry.init({
        dsn:
          'https://67f8a7e80a9c4b2a9579b6b2cf191312@o503166.ingest.sentry.io/5587869',
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

// const googleSignInSetup = () => {
//   GoogleSignin.configure({
//     scopes:[]
//   })

// }

const urlOpener = async (url: any, redirectUrl: any) => {
  await InAppBrowser.isAvailable();
  console.log(url);
  console.log(redirectUrl);

  // InAppBrowser.open
  // const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
  //   showTitle: false,
  //   // enableUrlBarHiding: false,
  //   // enableDefaultShare: false,
  //   ephemeralWebSession: false,
  // }).catch((error) => {
  //   console.log('line 114');
  //   console.log(error);
  // });
  // console.log(type, url, newUrl);

  // if (type === 'success') {
  console.log('adh');

  // try {
  //   Auth.currentSession()
  //     .then((user: any) => {
  //       console.log('session', user.accessToken);
  //       var data = jwt_decode(user.accessToken.jwtToken);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log('there is error');
  //     });
  //   Auth.currentAuthenticatedUser().then((user) => {
  //     createApi
  //       .createApi()
  //       .getUser(user.signInUserSession.idToken.payload.email)
  //       .then((data: any) => {
  //         // if(data.success)
  //         console.log(data.data.success);
  //         if (data.data.success == false) {
  //         } else {
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   });
  // } catch (error) {
  //   console.log('sasta');
  //   console.log(error);
  // }
  // Linking.openURL(newUrl);
  // } else {
  // }
};

const AmlifyConfigure = () => {
  return new Promise((resolve, reject) => {
    try {
      Amplify.configure({
        Auth: {
          mandatorySignIn: true,
          region: 'us-east-2',
          userPoolId: 'us-east-2_dCVQj7g1N',
          // identityPoolId: '÷',
          userPoolWebClientId: '5n6tdp3pqcoj0q44ch83963gfp',
        },
        oauth: {
          // scopes: ['email', 'openId'],
          domain: 'homesafety.auth.us-east-2.amazoncognito.com',
          redirectSignIn: 'safetyconnect://chat/Eri',
          redirectSignOut: 'safetyconnect://chat/Eri',
          urlOpener,
          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
        // GoogleSignin: {},
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

// configure aws auther
//  export const authSignup = async (email :string, password: string) => {
//     return new Promise((resolve, reject) => {
//          Auth.signUp({
//             username: email,
//             password: password,
//             attributes: {
//               email: email
//             }
//           }).then(res => {
//             resolve(res);
//     }).catch(err => reject(err))
// })
//  }

export {configSentry, AmlifyConfigure, oneSignalConfig};
