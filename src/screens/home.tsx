import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { getCharacters } from '../api/rickAndMortyApi';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../types/Character';

const CharactersScreen = ({ navigation }: any) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCharacters();
      setCharacters(data);
    } catch (error) {
      console.error('Ошибка загрузки персонажей', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={id => navigation.navigate('Character', { id })}
          />
        )}
        refreshing={loading}
        onRefresh={load}
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
});

export default CharactersScreen;
