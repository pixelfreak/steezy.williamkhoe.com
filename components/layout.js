import { useState, useEffect } from 'react';
import { ThemeContext } from '../context/site-context';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) 
{
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className={`theme-${theme}`}>
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap" rel="stylesheet"/>
                </Head>
                <Header/>
                <main>
                    {children}
                </main>
                <Footer/>
            </div>
        </ThemeContext.Provider>
    );
}
