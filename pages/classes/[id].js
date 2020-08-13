import { useState, useEffect, useRef, useCallback } from 'react';
import auth0 from '../../lib/auth0';
import Head from 'next/head';
import { getClass } from '../api/class/[id]';
import { getUserClasses } from '../api/user/[classes]';
import Layout from '../../components/layout';
import ReactPlayer from 'react-player/youtube';
import css from '../../styles/class.module.scss';

export async function getServerSideProps({ req, res, query })
{
    const session = await auth0.getSession(req);

    if (!session || !session.user) 
    {
        res.writeHead(302, { Location: '/api/login' });
        res.end();
        return {
            props:
            {
                classData: null,
                userClassData: null
            }
        };
    }

    // TODO: Consolidate all user object
    const userID = session.user.sub.split('|')[1];

    const classData = await getClass(query.id);
    const userClassData = await getUserClasses(userID, [query.id]);

    return {
        props:
        {
            classData,
            userClassData
        }
    };
}

function Class({ classData, userClassData })
{
    const player = useRef(null);
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(parseInt(userClassData[0]?.playedSeconds) || 0);
    const [playedFractions, setPlayedFractions] = useState(parseFloat(userClassData[0]?.playedFractions) || 0);
    const [totalTimeSpent, setTotalTimeSpent] = useState(parseInt(userClassData[0]?.totalTimeSpent) || 0);

    useEffect(() =>
    {
        function updateUserClass()
        {
            try
            {
                fetch(`/api/user/class/${classData.id}?playedSeconds=${playedSeconds}&playedFractions=${playedFractions}`);
            }
            catch(e)
            {

            }
        }

        updateUserClass();

    }, [playedSeconds]);

    const handleUnload = useCallback(e =>
    {
        navigator.sendBeacon(`/api/user/class/${classData.id}?totalTimeSpent=${totalTimeSpent}`);
    }, [totalTimeSpent]);
    
    useEffect(() =>
    {
        if (started)
        {
            const interval = window.setInterval(() => setTotalTimeSpent((timeSpent) => timeSpent + 1), 1000);

            window.addEventListener('unload', handleUnload);
            return () => 
            {
                window.clearInterval(interval);
                window.removeEventListener('unload', handleUnload);
            }
        }
    }, [started, handleUnload]);

    function handleReady()
    {
        player.current.seekTo(playedSeconds, 'seconds');
        setPlaying(true);
    }

    function handleStart()
    {
        setStarted(true);
    }

    function handleProgress({ playedSeconds, played })
    {
        if (started)
        {
            setPlayedSeconds(Math.round(playedSeconds));
            setPlayedFractions(played);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Classes</title>
            </Head>
            <section id={css.class}>
                <div className={css.player}>
                    <ReactPlayer ref={player} width="100%" height="100%" url={classData.videoURL} playing={playing} onReady={handleReady} onStart={handleStart} onProgress={handleProgress} controls={true} config={{onUnstarted: () => {}}}/>
                </div>
                <h1>{classData.title}</h1>
                <div className="metadata">
                    <h2>User Data</h2>
                    <div>Played Seconds: <strong>{playedSeconds}s</strong></div>
                    <div>Played Fractions: <strong>{Math.round(playedFractions*100)}%</strong></div>
                    <div>Total Time Spent: <strong>{totalTimeSpent}s</strong></div>
                </div>
            </section>
        </Layout>
    );
}

export default Class;
