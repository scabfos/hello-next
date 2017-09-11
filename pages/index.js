import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const ShowLink = (props) => (
    <li>
        <Link as={`/p/${props.show.id}`} href={`/post?id=${props.show.id}`}>
            <a>{props.show.name}</a>
        </Link>
    </li>
)

const Index = (props) => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {props.shows.map(({ show }) => (
                <ShowLink key={show.id} show={show} />
            ))}
        </ul>
    </Layout>
);

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data
    };
}

export default Index;
