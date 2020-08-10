import Firebase from '../../../lib/firebase';

export default async(req, res) => 
{
    switch(req.method)
    {
        case 'POST':
            const [, ...csv] = req.body.split(/\r?\n/);

            try
            {
                const batch = Firebase.batch();
                for (let item of csv)
                {
                    if (item.trim() !== '')
                    {
                        let data = {};
                        [data.title, data.instructor, data.level, data.song, data.videoURL, data.thumbnailSlug] = item.split(',');

                        const docRef = Firebase.collection('classes').doc();
                        batch.set(docRef, data);
                    }
                }
                await batch.commit();
            }
            catch(e)
            {
                return res.status(500).json({ error: e.message });
            }

            return res.json({ success: true });

        default:
            const start = parseInt(req.query.start);
            const count = parseInt(req.query.count);

            let data;
            try
            {
                data = await Firebase.collection('classes').orderBy('title').startAt(start).limit(count).get();
                data = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
            catch(e)
            {
                return res.status(500).json({ error: e.message });
            }

            return res.json(data);
    }
    
}