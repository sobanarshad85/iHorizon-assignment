import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/index.tsx';
import {HOME, POKEMON_DETAILS} from '../constants';
import PokemonDetails from '../screens/PokemonDetails';
import {makeFirstCharCapital} from '../utils';

const Stack = createNativeStackNavigator();

function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E7DF6',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name={HOME}
          component={HomeScreen}
          options={{
            title: 'PokeReact',
          }}
        />
        <Stack.Screen
          name={POKEMON_DETAILS}
          component={PokemonDetails}
          options={({route}) => ({
            title: makeFirstCharCapital(route.params.name),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Screens;
