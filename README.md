// Google Cloud Functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.documentWriteListener = functions.firestore.document('classes/{classId}').onWrite((change, context) => 
{
  if (!change.before.exists) 
  {
    // onCreate: add one
    db.collection('metadata').doc('classes').update({count: FieldValue.increment(1)});
  } 
  else if (change.before.exists && change.after.exists) 
  {
    // onUpdate: Do nothing
  } 
  else if (!change.after.exists) 
  {
    // onDelete: subtract one
    db.collection('metadata').doc('classes').update({count: FieldValue.increment(-1)});
  }
});
