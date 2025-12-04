import { gql, useQuery } from '@apollo/client';

const GET_CHARACTERS = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export const useCharactersQuery = () => {
  const { data, loading, error, refetch } = useQuery(GET_CHARACTERS);

  return {
    characters: data?.characters?.results ?? [],
    loading,
    error,
    refetch,
  };
};

