import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCharacterQuery } from '../hooks/useCharacterQuery';

type CharacterRouteProp = RouteProp<{ Character: { id: string } }, 'Character'>;

const CharacterDetails: React.FC = () => {
  const route = useRoute<CharacterRouteProp>();
  const { id } = route.params;

  const { character, loading, error } = useCharacterQuery(id);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error) return <Text>Ошибка при загрузке персонажа</Text>;
  if (!character) return <Text>Персонаж не найден</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text>Статус: {character.status}</Text>
      <Text>Вид: {character.species}</Text>
      <Text>Пол: {character.gender}</Text>
      <Text>Происхождение: {character.origin?.name}</Text>
      <Text>Местоположение: {character.location?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default CharacterDetails;
