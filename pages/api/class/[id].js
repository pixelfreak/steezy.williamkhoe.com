import Firebase from '../../../lib/firebase';

export default async(req, res) => 
{
    let data;
    try
    {
        data = await Firebase.collection('classes').doc(req.query.id).get();
        if (data.exists)
        {
            data = { id: req.query.id, ...data.data() };
        }
        else
        {
            data = null;
        }
    }
    catch(e)
    {
        return res.status(500).json({ error: e.message });
    }

    res.json(data);
}