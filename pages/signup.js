import { useEffect } from 'react';
import Router from 'next/router';

export default function Login()
{
    useEffect(() =>
    {
        Router.push('/api/signup');
    });

    return (
        <div></div>
    );
}
