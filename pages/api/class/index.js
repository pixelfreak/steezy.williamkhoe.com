import Firestore from '../../../lib/firebase';

async function Classes(req, res)
{
    const start = parseInt(req.query.start);
    const count = parseInt(req.query.count);

    const classes = await getClasses(start, count);

    return res.json(classes);
}

async function getClasses(start, count)
{
    let data = { metadata: await getClassesMetadata() };
    try
    {
        const snapshot = await Firestore.collection('classes').limit(count).offset((start - 1) * count).get();
        data.classes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    catch(e)
    {
        console.error(e.message);
    }

    return data;
}

async function getClassesMetadata()
{
    let data = await Firestore.collection('metadata').doc('classes').get();
    
    if (data.exists)
    {
        return data.data();
    }

    return null;
}

export { getClasses };
export default Classes;