import { useState, useEffect, useContext, createContext } from 'react';

let userState;

const User = createContext({ user: null, loading: false });

async function fetchUser()
{
    if (userState !== undefined) 
    {
        return userState;
    }

    const res = await fetch('/api/user');
    userState = res.ok ? await res.json() : null;

    return userState;
}

function UserProvider({ value, children })
{
    const { user } = value;

    // If the user was fetched in SSR, add it to userState so we don't fetch it again
    useEffect(() => 
    {
        if (!userState && user) 
        {
            userState = user;
        }
    }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
}

function useUser()
{
    return useContext(User);
}

function useFetchUser()
{
    const [data, setUser] = useState({ user: userState || null, loading: userState === undefined});

    useEffect(() => 
    {
        if (userState !== undefined) 
        {
            return;
        }

        let isMounted = true;

        fetchUser().then((user) => 
        {
            // Only set the user if the component is still mounted
            if (isMounted) 
            {
                setUser({ user, loading: false });
            }
        });

        return () => { isMounted = false; };
    }, [userState]);

    return data;
};

export { fetchUser, UserProvider, useUser, useFetchUser };