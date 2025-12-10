import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_CHARACTERS } from '../queries';
import { Character } from '../types/Character';

export const useCharactersQuery = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    if (data?.characters) {
      setCharacters(data.characters.results);
      setHasMore(!!data.characters.info.next);
      setIsLoading(false);
    }
  }, [data]);

  const fetchData = async (pageNumber: number, isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else if (pageNumber === 1) {
        setIsLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const result = await fetchMore({
        variables: { page: pageNumber },
      });

      const newData = result.data.characters;

      if (isRefresh || pageNumber === 1) {
        setCharacters(newData.results);
      } else {
        setCharacters(prev => [...prev, ...newData.results]);
      }

      setHasMore(!!newData.info.next);
    } catch (e) {
      console.log('Ошибка загрузки:', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsFetchingMore(false);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    fetchData(1, true);
  };

  const handleLoadMore = () => {
    if (isFetchingMore || isLoading || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);

    fetchData(nextPage);
  };

  return {
    characters,
    loading: isLoading,
    error,

    handleRefresh,
    isRefreshing,

    handleLoadMore,
    isFetchingMore,
  };
};
