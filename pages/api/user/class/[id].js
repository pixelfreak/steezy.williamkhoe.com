import Firestore from '../../../../lib/firebase';
import auth0 from '../../../../lib/auth0';

async function UserClass(req, res)
{
    const { user } = await auth0.getSession(req);
    const userID = user.sub.split('|')[1];
    
    const props = {};
    if (req.query.playedSeconds) props.playedSeconds = req.query.playedSeconds;
    if (req.query.playedFractions) props.playedFractions = req.query.playedFractions;
    if (req.query.totalTimeSpent) props.totalTimeSpent = req.query.totalTimeSpent;

    await setUserClass(userID, req.query.id, props);

    res.json({});
}

async function setUserClass(userID, classID, props)
{
    let data = [];
    try
    {
        await Firestore.collection('users').doc(userID).collection('classes').doc(classID).set(
        { 
            ...props
        }, { merge: true });
    }
    catch(e)
    {
        console.error(e.message);
    }
}

export { setUserClass };
export default auth0.requireAuthentication(UserClass);