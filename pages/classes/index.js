import { useState, useRef } from 'react';
import auth0 from '../../lib/auth0';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { Pagination } from '@material-ui/lab';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, connectSearchBox, connectPagination, connectHits, connectStateResults } from 'react-instantsearch-dom';
import css from '../../styles/classes.module.scss';

const classCountPerPage = 9;
const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API);

export async function getServerSideProps({ req, res, query })
{
    // TODO: Consolidate all user object
    const session = await auth0.getSession(req)
    let userID = 0;
    if (!session || !session.user) 
    {
        return {
            props:
            {
                userID
            }
        };
    }

    userID = session.user.sub.split('|')[1];

    return {
        props:
        {
            userID
        }
    };
}

const ClassesPagination = connectPagination(({ currentRefinement, nbPages, refine, createURL }) =>
{
    return (
        <div className={css.pagination}>
            <Pagination count={nbPages} size="large" shape="rounded" onChange={(e, value) => refine(value)}/>
        </div>
    );
});

const ClassesHits = connectHits(({ hits }) => (
    <div className={css.classes}>
        {hits.map(hit =>
        <Link key={hit.objectID} href={`/classes/${hit.objectID}`}>
            <div className={css.class}>
                <img src={`https://res.cloudinary.com/pixelfreak/image/upload/v1597016739/${hit.thumbnailSlug}`} alt="Thumbnail"/>
                <div className={css.metadata}>
                    <header>
                        <h2>{hit.title}</h2>
                        <h3>{hit.instructor}</h3>
                    </header>
                    <div>Level: <strong>{hit.level}</strong></div>
                    <div>Song: <strong>{hit.song}</strong></div>
                </div>
                <div className={css.progress}><div>0%</div></div>
            </div>
        </Link>
        )}
    </div>
));

const ClassesSearchBox = connectSearchBox(({ currentRefinement, refine, delay, placeholder }) =>
{
    const [query, setQuery] = useState(currentRefinement);
    const timeout = useRef(null);

    function handleChangeDebounced(e)
    {
        const value = e.currentTarget.value;

        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => refine(value), delay);

        setQuery(value);
    }

    return (
        <div className={css.search}>
            <form role="search">
                <input type="search" value={query} onChange={handleChangeDebounced} placeholder={placeholder} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" required="" maxLength="512"/>
                <button type="submit" title="Submit your search query."><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 40 40"><path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path></svg></button>
            </form>
        </div>
    );
});

const Results = connectStateResults(({ searchState, searchResults, children, isSearchStalled }) =>
{
    if (isSearchStalled)
    {
        return <div className={css.loading}>Loading...</div>;
    }

    if (searchResults && searchResults.nbHits !== 0)
    {
        return children;
    }
    else
    {
        return <div>No results found for {searchState.query}</div>;
    }
});

export default function Classes({ userID })
{
    return (
        <Layout>
            <Head>
                <title>Classes</title>
            </Head>

            <section id={css.classes}>
                <InstantSearch searchClient={searchClient} indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}>
                    <Configure hitsPerPage={classCountPerPage}/>
                    <header>
                        <h1>Classes</h1>
                        <ClassesSearchBox placeholder="Search for Title/Artist/Song" delay={300}/>
                    </header>
                    <Results><ClassesHits /></Results>
                    <ClassesPagination />
                </InstantSearch>
            </section>
        </Layout>
    );
}
