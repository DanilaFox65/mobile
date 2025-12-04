import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CharactersScreen from './src/screens/home.tsx';
import CharacterDetails from './src/screens/CharacterDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
  );
};

export default App;
