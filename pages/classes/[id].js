import Head from 'next/head';
import { getClass } from '../api/class/[id]';
import Layout from '../../components/layout';
import ReactPlayer from 'react-player/youtube';
import css from '../../styles/class.module.scss';

export async function getServerSideProps({ query })
{
    const data = await getClass(query.id);

    return {
        props:
        {
            data
        }
    };
}

export default function Class({ data })
{
    return (
        <Layout>
            <Head>
                <title>Classes</title>
            </Head>
            <section id={css.class}>
                <div className={css.player}>
                    <ReactPlayer url={data.videoURL} width="100%" height="100%" config={
                        { 
                            youtube: 
                            { 
                                onUnstarted: () => { console.log('test'); }
                            } 
                        }
                    }/>
                </div>
                <h1>{data.title}</h1>
            </section>
        </Layout>
    );
}