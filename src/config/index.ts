

import * as Sentry from "@sentry/react-native";
// import { withAuthenticator } from 'aws-amplify-react-native';



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


// configure aws auth







export  {configSentry};
