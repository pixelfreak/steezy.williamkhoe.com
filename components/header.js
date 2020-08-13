import { useState,  useEffect } from 'react';
import css from '../styles/header.module.scss';

export default function Header() 
{
    const [user, setUser] = useState(null);

    useEffect(() =>
    {
        async function fetchUser()
        {
            let data = {};
            try
            {
                const response = await fetch(`/api/user`);
                data = await response.json();
            }
            catch(e)
            {

            }
            setUser(data);
        }

        fetchUser();
    }, []);

    return (
        <header className={css.main}>
            <a href="/classes" className={css.logo}>
                <svg id="Layer_1" fill="currentColor" data-name="Layer 1" viewBox="0 0 449.03 87.97"><title>STEEZY_NOT_BLACK</title><path d="M59.25,50a19.74,19.74,0,0,0-6-6h0c-8.69-5.92-21.4-7.14-28.79-10.7-3.6-1.73-5.95-4-5.95-7.66C18.51,19.7,22.73,17,29.7,17c8.79,0,13.3,4,14,11.53L61,24.17C59.44,10,48.93,0,29.65,0,11.63,0,0,10.52,0,25.64,0,31.15,1.33,35.3,3.51,38.5A20.14,20.14,0,0,0,9.2,44h0c9,6.14,22.4,7.22,29.63,11.12C42,56.79,43.94,59,43.94,62.34c0,5.94-4.22,8.68-11.2,8.68-8.58,0-13.07-3.83-13.92-10.92L1.49,64.42C3.27,78.3,13.76,88,32.74,88c18,0,29.66-10.52,29.66-25.64A22.45,22.45,0,0,0,59.25,50Z"></path><polygon points="150.91 86.45 211.67 86.45 211.67 69.47 168.11 69.47 168.11 52.51 211.67 52.51 211.67 35.53 150.91 35.53 150.91 86.45"></polygon><polygon points="72.83 18.52 94.58 18.52 94.58 86.45 111.83 86.45 111.83 18.52 133.59 18.52 133.59 1.54 72.83 1.54 72.83 18.52"></polygon><polygon points="306.95 18.52 343.81 18.52 306.96 69.45 306.95 69.45 306.95 86.43 366.29 86.43 366.29 69.45 329.45 69.45 366.29 18.52 366.29 1.54 306.95 1.54 306.95 18.52"></polygon><polygon points="228.96 86.45 289.72 86.45 289.72 69.47 246.16 69.47 246.16 52.51 289.72 52.51 289.72 35.53 228.96 35.53 228.96 86.45"></polygon><rect x="150.91" y="1.57" width="138.81" height="16.98"></rect><polygon points="428.46 1.54 412.89 35.53 397.31 1.54 376.74 1.54 404.26 52.62 404.26 86.45 421.51 86.45 421.51 53.92 449.03 1.54 428.46 1.54"></polygon></svg>
            </a>
            <nav>
                {user ? user.id ?
                    <a href="/logout" className={css.avatar}>
                        <img src={user.picture} alt="Avatar"/>
                        <span>Logout</span>
                        {/* <svg width="8px" height="8px" viewBox="0 0 19 12" fill="none" ml="2" color="darkGrey"><path d="M1.77075 1.76752L9.49936 9.46464L17.229 1.76752" stroke="currentColor" strokeWidth="3"></path></svg> */}
                    </a>
                    :
                    <>
                        <a href="/login">Login</a>
                        <a href="/signup" className={css.highlight}>Sign up</a>
                    </>
                    :
                    <></>
                }
            </nav>
        </header>
    );
}