import css from '../styles/footer.module.scss';

export default function Footer() 
{
    return (
        <footer className={css.main}>
            <a className={css.logo} href="/classes">
                <img src="https://global-uploads.webflow.com/5dbb40d6d8c97447e9450447/5e604560e2c5a570b6d92ae1_STEEZY_LOGOMARK.svg" alt=""/>
            </a>
        </footer>
    );
}