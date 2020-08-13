import Firestore from '../../../lib/firebase';
import auth0 from '../../../lib/auth0';

async function User(req, res)
{
    const { user: { sub, name, ...auth0UserData} } = await auth0.getSession(req);
    const userID = sub.split('|')[1];

    let firestoreUserData = await getUser(userID, name);

    res.json({ ...auth0UserData, ...firestoreUserData});
}

async function getUser(id, email)
{
    let data = null;
    try
    {
        const doc = await Firestore.collection('users').doc(id).get();
        
        if (doc.exists)
        {
            data = { id, ...doc.data() };
        }
        else
        {
            data = { id, email };
            await Firestore.collection('users').doc(id).set({ email });
        }
    }
    catch(e)
    {
        console.error(e.message);
    }

    return data;
}

export { getUser };
export default auth0.requireAuthentication(User);