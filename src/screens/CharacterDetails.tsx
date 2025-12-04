import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getCharacterById } from '../api/rickAndMortyApi';
import { Character } from '../types/Character';

type CharacterRouteProp = RouteProp<{ Character: { id: number } }, 'Character'>;

const CharacterDetails: React.FC = () => {
  const route = useRoute<CharacterRouteProp>();
  const { id } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (error) {
        console.error('Ошибка при загрузке персонажа:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCharacter();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

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
