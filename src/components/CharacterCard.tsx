import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Character } from '../types/Character';

interface Props {
  character: Character;
  onPress: (id: number) => void;
}

const CharacterCard: React.FC<Props> = ({ character, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(character.id)}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.id}>ID: {character.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  id: {
    marginTop: 8,
    color: '#666',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },
});

export default CharacterCard;
