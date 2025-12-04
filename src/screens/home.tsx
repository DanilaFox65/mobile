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
  const { characters, loading, refetch, error } = useCharactersQuery();

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Ошибка загрузки персонажей</Text>;
  }

  if (!characters.length) {
    return <Text style={styles.errorText}>Персонажи не найдены</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={item => item.id!.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={id =>
              navigation.navigate('Character', { id: id.toString() })
            }
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
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
    fontSize: 18,
  },
});

export default CharactersScreen;
