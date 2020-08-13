import auth0 from '../../lib/auth0';

export default async function Callback(req, res) 
{
    const state = Buffer.from(req.query.state || '', 'base64').toString('ascii');
    const redirectTo = state.slice(0, state.indexOf('|'))
    
    try
    {
        await auth0.handleCallback(req, res, { redirectTo });
    } 
    catch (e) 
    {
        console.error(e);
        res.status(e.status || 500).end(e.message);
    }
}