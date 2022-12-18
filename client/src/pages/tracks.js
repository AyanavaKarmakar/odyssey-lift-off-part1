import React from 'react';
import { Layout } from '../components';
import { useQuery, gql } from "@apollo/client";
import TrackCard from '../containers/track-card';

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  /** TRACKS query to retrieve all tracks */
  const TRACKS = gql`
    query GetTracks {
      tracksForHome {
        id
        length
        modulesCount
        thumbnail
        title
        author {
          id
          name
          photo
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(TRACKS);

  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

  return <Layout grid>
    {data?.tracksForHome?.map(track => (
      <TrackCard key={track.id} track={track} />
    ))}
  </Layout>;
};

export default Tracks;
