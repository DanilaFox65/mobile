import * as React from 'react';
import { Linking, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client/react';

import CharactersScreen from './src/screens/home';
import CharacterDetails from './src/screens/CharacterDetails';
import { client } from './src/apollo/client';
import notifee, { EventType } from '@notifee/react-native';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['voronchukdaniil://'],
  config: {
    screens: {
      Home: 'characters',
      Character: 'character/:id',
    },
  },
};

const App = () => {
  React.useEffect(() => {
    // Обработка кликов на уведомления в foreground
    const unsubscribeForeground = notifee.onForegroundEvent(
      ({ type, detail }) => {
        const deepLink = detail.notification?.data?.deepLink;
        if (type === EventType.PRESS && deepLink) {
          Linking.openURL(String(deepLink)).catch(() =>
            Alert.alert('Ошибка', 'Не удалось открыть экран персонажа'),
          );
        }
      },
    );

    // Обработка кликов на уведомления в background
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const deepLink = detail.notification?.data?.deepLink;
      if (type === EventType.PRESS && deepLink) {
        Linking.openURL(String(deepLink)).catch(() =>
          console.warn('Не удалось открыть deep link из фонового уведомления'),
        );
      }
    });

    // Отписка только от foreground
    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={CharactersScreen}
            options={{ title: 'Персонажи' }}
          />
          <Stack.Screen
            name="Character"
            component={CharacterDetails}
            options={{ title: 'Информация о персонаже' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
