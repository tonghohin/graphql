import { gql, useQuery } from "@apollo/client";
import { Layout, QueryResult } from "../components";
import { useParams } from "react-router-dom";
import TrackDetail from "../components/track-detail";

/** TRACK query to retrieve one track */
const TRACK = gql`
    query GetTrack($trackId: ID!) {
        track(id: $trackId) {
            id
            title
            author {
                id
                name
                photo
            }
            thumbnail
            length
            modulesCount
            numberOfViews
            modules {
                id
                title
                length
            }
            description
        }
    }
`;

const Track = () => {
    const { trackId } = useParams();
    const { loading, error, data } = useQuery(TRACK, {
        variables: { trackId }
    });

    return (
        <Layout>
            <QueryResult error={error} loading={loading} data={data}>
                <TrackDetail track={data?.track} />
            </QueryResult>
        </Layout>
    );
};

export default Track;
