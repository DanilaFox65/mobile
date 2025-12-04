import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../queries';

export const useCharactersQuery = () => {
  const { data, loading, error, refetch } = useQuery(GET_CHARACTERS);

  return {
    characters: data?.characters?.results || [],
    loading,
    error,
    refetch,
  };
};
