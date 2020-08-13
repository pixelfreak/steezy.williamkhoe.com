import auth0 from '../../lib/auth0'

export default async function Logout(req, res) 
{
    try 
    {
        await auth0.handleLogout(req, res);
    } 
    catch (e) 
    {
        console.error(e);
        res.status(e.status || 500).end(e.message);
    }
}