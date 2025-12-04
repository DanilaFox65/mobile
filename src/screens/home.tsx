import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { useCharactersQuery } from '../hooks/useCharactersQuery';

const CharactersScreen = ({ navigation }: any) => {
  const { characters, loading, refetch } = useCharactersQuery();

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
        onRefresh={refetch}
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
