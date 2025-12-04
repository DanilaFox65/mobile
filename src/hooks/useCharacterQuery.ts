import { gql, useQuery } from '@apollo/client';

const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin { name }
      location { name }
    }
  }
`;

export const useCharacterQuery = (id: number) => {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  return {
    character: data?.character,
    loading,
    error,
  };
};


