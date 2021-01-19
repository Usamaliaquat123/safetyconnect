

import * as Sentry from "@sentry/react-native";
// import { Auth } from 'aws-amplify';



// configure Sentry
const configSentry = () => {
    return new Promise((resolve, reject) => {
    try {
        Sentry.init({
            dsn: "https://67f8a7e80a9c4b2a9579b6b2cf191312@o503166.ingest.sentry.io/5587869",
          });
          resolve(true)
    } catch (error) {
        reject(error)
    }        
    })
}


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


export    {configSentry}
