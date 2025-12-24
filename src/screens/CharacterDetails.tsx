import React from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCharacterQuery } from '../hooks/useCharacterQuery';
import { getNotificationPermission } from '../hooks/notifications/getNotificationPermission';
import { requestNotificationsPermission } from '../hooks/notifications/requestPermission';
import { showLocalNotification } from '../hooks/notifications/showLocalNotification';
import { AuthorizationStatus } from '@notifee/react-native';

type CharacterRouteProp = RouteProp<{ Character: { id: string } }, 'Character'>;

const CharacterDetails: React.FC = () => {
  const route = useRoute<CharacterRouteProp>();
  const { id } = route.params;

  const { character, loading, error } = useCharacterQuery(id);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error) return <Text>Ошибка при загрузке персонажа</Text>;
  if (!character) return <Text>Персонаж не найден</Text>;

  const onRemindPress = async () => {
    const status = await getNotificationPermission();

    if (status === AuthorizationStatus.NOT_DETERMINED) {
      const granted = await requestNotificationsPermission();
      if (!granted) {
        Alert.alert(
          'Уведомления отключены',
          'Вы не сможете получать напоминания',
        );
        return;
      }
    }

    if (status === AuthorizationStatus.DENIED) {
      Alert.alert(
        'Уведомления отключены',
        'Пожалуйста, разрешите уведомления в настройках устройства',
        [
          { text: 'Отмена', style: 'cancel' },
          {
            text: 'Открыть настройки',
            onPress: () => {},
          },
        ],
      );
      return;
    }

    if (
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL
    ) {
      await showLocalNotification(id);
      Alert.alert('Напоминание создано', 'Вы получите уведомление о персонаже');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text>Статус: {character.status}</Text>
      <Text>Вид: {character.species}</Text>
      <Text>Пол: {character.gender}</Text>
      <Text>Происхождение: {character.origin?.name}</Text>
      <Text>Местоположение: {character.location?.name}</Text>

      <TouchableOpacity style={styles.button} onPress={onRemindPress}>
        <Text style={styles.buttonText}>Напомнить о персонаже</Text>
      </TouchableOpacity>
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
  image: { width: 200, height: 200, borderRadius: 100, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  button: {
    backgroundColor: '#0000CD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '500' },
});

export default CharacterDetails;
