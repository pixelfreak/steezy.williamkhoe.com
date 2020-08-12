module.exports = 
{
    async redirects() 
    {
        return [
            {
                source: '/',
                destination: '/classes',
                permanent: false,
            },
        ]
    },
}