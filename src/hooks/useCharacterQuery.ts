import { useQuery } from '@apollo/client';
import { GET_CHARACTER_BY_ID } from '../queries';

export const useCharacterQuery = (id: string) => {
  const { data, loading, error } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  return {
    character: data?.character || null,
    loading,
    error,
  };
};
