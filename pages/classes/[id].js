

export async function getServerSideProps({ params })
{
    const data = params.id;

    return { props: { data } }
}

export default function Class({ data })
{
    return (
        <div>{data.toString()}</div>
    );
}