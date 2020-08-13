import auth0 from '../../lib/auth0';

export default async function Callback(req, res) 
{
    try 
    {
        await auth0.handleCallback(req, res, { redirectTo: '/' });
    } 
    catch (e) 
    {
        console.error(e);
        res.status(e.status || 500).end(e.message);
    }
}