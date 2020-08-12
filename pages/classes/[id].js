import Head from 'next/head';
import { getClass } from '../api/class/[id]';
import Layout from '../../components/layout';
import ReactPlayer from 'react-player/youtube';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
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

function Class({ data })
{
    function handleProgress({ playedSeconds })
    {
        console.log(`playedSeconds: ${playedSeconds}`);
    }

    return (
        <Layout>
            <Head>
                <title>Classes</title>
            </Head>
            <section id={css.class}>
                <div className={css.player}>
                    <ReactPlayer width="100%" height="100%" url={data.videoURL} onProgress={handleProgress} playing={true} controls={true} config={{onUnstarted: () => {}}}/>
                </div>
                <h1>{data.title}</h1>
            </section>
        </Layout>
    );
}

export default withAuthenticationRequired(Class);
