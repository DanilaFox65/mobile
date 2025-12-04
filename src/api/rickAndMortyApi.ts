import axios from 'axios';
import { Character } from '../types/Character';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (): Promise<Character[]> => {
  const response = await axios.get(API_URL, { params: { page: 1 } });
  return response.data.results;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

