import * as Sentry from '@sentry/react-native';
import Amplify from 'aws-amplify';

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

const AmlifyConfigure = () => {
  return new Promise((resolve, reject) => {
    try {
      Amplify.configure({
        Auth: {
          mandatorySignIn: true,
          region: 'us-east-2',
          userPoolId: 'us-east-2_dCVQj7g1N',
          userPoolWebClientId: '5n6tdp3pqcoj0q44ch83963gfp',
        },
        oauth: {
          domain: 'homesafety.auth.us-east-2.amazoncognito.com',
          redirectSignIn: 'http://localhost:3000/signin',
          redirectSignOut: 'http://localhost:3000/signup',
          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
        Storage: {
          AWSS3: {
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
