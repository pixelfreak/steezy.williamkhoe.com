import FirebaseAdmin from 'firebase-admin';
import Firestore from '../../../lib/firebase';
import auth0 from '../../../lib/auth0';

async function UserClasses(req, res)
{
    const { user } = await auth0.getSession(req);
    const userID = user.sub.split('|')[1];

    let classes = req.query.classes.split(',');

    // Dedupe and truncate to first 10 (TODO: Firestore limitation, split queries)
    classes = [...new Set(classes)].slice(0, 10);

    classes = await getUserClasses(userID, classes);

    res.json(classes);
}

async function getUserClasses(id, classes)
{
    let data = [];
    try
    {
        const snapshot = await Firestore.collection('users').doc(id).collection('classes').where(FirebaseAdmin.firestore.FieldPath.documentId(), 'in', classes).get();
        data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    catch(e)
    {
        console.error(e.message);
    }

    return data;
}

export { getUserClasses };
export default auth0.requireAuthentication(UserClasses);