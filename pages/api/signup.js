import auth0 from '../../lib/auth0';

export default async function SignUp(req, res) 
{
    try 
    {
        await auth0.handleLogin(req, res, { authParams: { screen_hint: 'signup' }});
    } 
    catch (e) 
    {
        console.error(e);
        res.status(e.status || 500).end(e.message);
    }
}