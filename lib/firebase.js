import Firebase from 'firebase-admin';

const serviceAccount = require('../steezy-williamkhoe-com-firebase-adminsdk-r4h0x-84f95af474.json');

try 
{
    Firebase.initializeApp(
    {
        credential: Firebase.credential.cert(serviceAccount), 
        databaseURL: process.env.FIREBASE_URL 
    });
}
catch (error) 
{
    /*
    * We skip the "already exists" message which is
    * not an actual error when we're hot-reloading.
    */
    if (!/already exists/u.test(error.message)) 
    {
        // eslint-disable-next-line no-console
        console.error('Firebase Firebase initialization error', error.stack);
    }
}
  
export default Firebase.firestore();