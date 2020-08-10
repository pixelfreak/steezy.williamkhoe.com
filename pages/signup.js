import Head from 'next/head';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

function Signup()
{
    const { user } = useAuth0();

    return (
        <div>
            <Head>
                <title>Classes</title>
            </Head>
            <ul>
                <li>Name: {user.nickname}</li>
                <li>E-mail: {user.email}</li>
            </ul>
        </div>
    );
}

export default withAuthenticationRequired(Signup, 
{ 
    onRedirecting: () => (<div>Redirecting you to the login page...</div>),
    loginOptions: 
    {
        screen_hint: 'signup'
    } 
});
