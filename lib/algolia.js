import algoliaSearch from 'algoliasearch';

const client = algoliaSearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API);
const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);
export default index;
