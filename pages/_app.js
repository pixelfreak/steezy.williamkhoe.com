import { Auth0Provider } from "@auth0/auth0-react";
import Router from 'next/router';
import '../styles/app.scss';

export default function App({ Component, pageProps }) 
{
    return (
        <Auth0Provider domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN} clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID} redirectUri={typeof window !== 'undefined' && window.location.origin} onRedirectCallback={(appState) => Router.replace(appState?.returnTo || '/')}>
            <Component {...pageProps} />
        </Auth0Provider>
    );
}