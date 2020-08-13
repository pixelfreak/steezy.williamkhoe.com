import auth0 from '../../lib/auth0';

export default async function Callback(req, res) 
{
    let redirectTo = '/';

    const state = Buffer.from(req.query.state || '', 'base64').toString('ascii');
    const prefix = 'redirect=';
    const prefixIndex = state.indexOf(prefix);

    if (prefixIndex >= 0)
    {
        redirectTo = state.slice(prefixIndex + prefix.length, state.indexOf('|'));
    }
    
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