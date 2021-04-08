import * as Sentry from '@sentry/react-native';
import Amplify from 'aws-amplify';
import {fromCognitoIdentityPool} from '@aws-sdk/credential-provider-cognito-identity';
import {CognitoIdentityClient} from '@aws-sdk/client-cognito-identity';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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

const AmlifyConfigure = () => {
  return new Promise((resolve, reject) => {
    try {
      Amplify.configure({
        Auth: {
          mandatorySignIn: false,
          region: 'us-east-2',
          userPoolId: 'us-east-2_dCVQj7g1N',
          identityPoolId: 'us-east-2:2d678d8d-d65a-42e0-9dd8-b9533c0c3bb1',
          userPoolWebClientId: '5n6tdp3pqcoj0q44ch83963gfp',
        },
        oauth: {
          domain: 'homesafety.auth.us-east-2.amazoncognito.com',
          redirectSignIn: 'http://localhost:3000/view-sor',
          redirectSignOut: 'http://localhost:3000/signin',

          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
        Storage: {
          AWSS3: {
            mandatorySignIn: false,
            identityPoolId: 'us-east-2:2d678d8d-d65a-42e0-9dd8-b9533c0c3bb1',
            bucket: 'safetyconnect-users', //REQUIRED -  Amazon S3 bucket name
            region: 'us-east-2', //OPTIONAL -  Amazon service region
          },
        },
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

export {configSentry, AmlifyConfigure};
