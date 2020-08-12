import Firebase from '../../../lib/firebase';

async function Classes(req, res)
{
    switch(req.method)
    {
        // case 'POST':
        //     try
        //     {
        //         const batch = Firebase.batch();
        //         for (let { objectID, ...data } of req.body)
        //         {
        //             const docRef = Firebase.collection('classes').doc(objectID);
        //             batch.set(docRef, data);
        //         }
        //         await batch.commit();
        //     }
        //     catch(e)
        //     {
        //         return res.status(500).json({ error: e.message });
        //     }

        //     return res.json({ success: true });
        default:
            const start = parseInt(req.query.start);
            const count = parseInt(req.query.count);

            const classes = await getClasses(start, count);

            return res.json(classes);
    }
}

async function getClasses(start, count)
{
    let data = { metadata: await getClassesMetadata() };
    try
    {
        const classes = await Firebase.collection('classes').orderBy('title').limit(count).offset((start - 1) * count).get();
        data.classes = classes.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    catch(e)
    {
        
    }

    return data;
}

async function getClassesMetadata()
{
    let data = await Firebase.collection('metadata').doc('classes').get();
    
    if (data.exists)
    {
        return data.data();
    }

    return null;
}

export { getClasses };
export default Classes;