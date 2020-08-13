import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) 
{
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap" rel="stylesheet"/>
            </Head>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
}
  