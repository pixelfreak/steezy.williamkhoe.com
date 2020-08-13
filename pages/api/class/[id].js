import Firestore from '../../../lib/firebase';

async function Class(req, res)
{
    const data = await getClass(req.query.id);

    res.json(data);
}

async function getClass(id)
{
    let data;
    try
    {
        data = await Firestore.collection('classes').doc(id).get();
        
        if (data.exists)
        {
            data = { id, ...data.data() };
        }
        else
        {
            data = null;
        }
    }
    catch(e)
    {
        console.error(e.message);
    }

    return data;
}

export { getClass };
export default Class;