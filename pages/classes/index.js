import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { Pagination } from '@material-ui/lab';
import { getClasses } from '../api/class/index';
import css from '../../styles/classes.module.scss';

export async function getServerSideProps()
{
    const classCountPerPage = 9;
    const data = await getClasses(1, classCountPerPage);

    return {
        props:
        {
            data,
            classCountPerPage
        }
    };
}

export default function Classes({ data, classCountPerPage })
{
    const [currentClasses, setCurrentClasses] = useState(data);
    const [page, setPage] = useState(1);
    const classesMemoMap = useRef(new Map().set(page, data));

    useEffect(() =>
    {
        async function fetchClasses()
        {
            // TODO: add loading here
            const response = await fetch(`/api/class?start=${page}&count=${classCountPerPage}`);
            const data = await response.json();
            classesMemoMap.current.set(page, data);
            setCurrentClasses(data);
        }

        if (classesMemoMap.current.has(page))
        {
            setCurrentClasses(classesMemoMap.current.get(page));
        }
        else
        {
            fetchClasses();
        }
    }, [page]);

    async function handlePageChange(event, value)
    {
        setPage(value);        
    }

    return (
        <Layout>
            <Head>
                <title>Classes</title>
            </Head>

            <section id={css.classes}>
                <header>
                    <h1>Classes</h1>
                    <div className={css.search}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.75 22L17.5 15.75C18.75 14.125 19.375 12.25 19.375 10.125C19.375 5 15.125 0.75 10 0.75C4.875 0.75 0.75 5 0.75 10.125C0.75 15.25 5 19.5 10.125 19.5C12.25 19.5 14.25 18.75 15.75 17.625L22 23.875L23.75 22ZM3.25 10.125C3.25 6.375 6.375 3.25 10.125 3.25C13.875 3.25 17 6.375 17 10.125C17 13.875 13.875 17 10.125 17C6.375 17 3.25 13.875 3.25 10.125Z" fill="currentColor"></path></svg>
                        <input type="text" placeholder="Search for Artist or Song"/>
                    </div>
                </header>
                <div className={css.classes}>
                    {currentClasses.classes.map(classItem => 
                        <Link key={classItem.id} href={`/classes/${classItem.id}`}>
                            <div className={css.class}>
                                <img src={`https://res.cloudinary.com/pixelfreak/image/upload/v1597016739/${classItem.thumbnailSlug}`} alt="Thumbnail"/>
                                <h2>{classItem.title}</h2>
                                <div className={css.metadata}>
                                    <div>Instructor: <strong>{classItem.instructor}</strong></div>
                                    <div>Level: <strong>{classItem.level}</strong></div>
                                    <div>Song: <strong>{classItem.song}</strong></div>
                                </div>
                                <div className={css.progress}><div>0%</div></div>
                            </div>
                        </Link>
                    )}
                </div>
                <div className={css.pagination}>
                    <Pagination count={Math.ceil(currentClasses.metadata.count / classCountPerPage)} size="large" shape="rounded" onChange={handlePageChange} />
                </div>
            </section>
        </Layout>
    );
}