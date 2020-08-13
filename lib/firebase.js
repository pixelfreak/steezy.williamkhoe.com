import FirebaseAdmin from 'firebase-admin';

const serviceAccount = require('../steezy-williamkhoe-com-firebase-adminsdk-r4h0x-84f95af474.json');

try 
{
    FirebaseAdmin.initializeApp(
    {
        credential: FirebaseAdmin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL 
    });
}
catch (error) 
{
    if (!/already exists/u.test(error.message)) 
    {
        console.error('Firebase initialization error', error.stack);
    }
}

export default FirebaseAdmin.firestore();