import { Layout } from "../components";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";
import { useQuery, gql } from "@apollo/client";

/** TRACKS query to retrieve all tracks */
const TRACKS = gql`
    query GetTracks {
        tracksForHome {
            author {
                id
                name
                photo
            }
            id
            title
            thumbnail
            length
            modulesCount
        }
    }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
    const { loading, error, data } = useQuery(TRACKS);

    return (
        <Layout grid>
            <QueryResult error={error} loading={loading} data={data}>
                {data?.tracksForHome?.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </QueryResult>
        </Layout>
    );
};

export default Tracks;
