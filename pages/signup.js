import { useEffect } from 'react';
import Router from 'next/router';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function Signup()
{
    const { user, isAuthenticated } = useAuth0();

    useEffect(() =>
    {
        if (isAuthenticated)
        {
            Router.push('/classes');
        }
    }, [isAuthenticated]);

    return (
        <div></div>
    );
}

export default withAuthenticationRequired(Signup, 
{ 
    onRedirecting: () => (<div className="redirect-notice">Redirecting to the signup page...</div>),
    loginOptions: 
    {
        screen_hint: 'signup'
    } 
});
