import auth0 from '../../lib/auth0';
import Crypto from 'crypto';

export default async function Login(req, res) 
{
    let loginOptions = null;
    if (req.query.redirect)
    {
        const redirectURL = req.query.redirect || '/';
        const state = Buffer.concat([Buffer.from(redirectURL), Buffer.from('|'), Crypto.randomBytes(32)]);
        loginOptions = { authParams: { state: Buffer.from(state).toString('base64') } };
    }

    try 
    {
        await auth0.handleLogin(req, res, loginOptions);
    } 
    catch (e) 
    {
        console.error(e);
        res.status(e.status || 500).end(e.message);
    }
}