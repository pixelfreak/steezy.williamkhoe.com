import { useEffect } from 'react';
import Router from 'next/router';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function Login()
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

export default withAuthenticationRequired(Login, 
{ 
    onRedirecting: () => (<div className="redirect-notice">Redirecting to the login page...</div>)
});
