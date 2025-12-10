import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { useCharactersQuery } from '../hooks/useCharactersQuery';

const CharactersScreen = ({ navigation }: any) => {
  const {
    characters,
    loading,
    error,
    isRefreshing,
    isFetchingMore,
    handleRefresh,
    handleLoadMore,
  } = useCharactersQuery();

  if (loading && characters.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Ошибка загрузки</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={id => navigation.navigate('Character', { id })}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0000CD',
  },
  errorText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    fontSize: 20,
  },
});

export default CharactersScreen;
