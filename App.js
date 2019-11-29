import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Pokedex from './src/screens/Pokedex';
import Pokemon from './src/screens/Pokemon';
import GamePokedex from './src/screens/GamePokedex';
import SavedTeams from './src/screens/SavedTeams';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Pokedex
    },
    PokemonDetails: {
      screen: Pokemon
    },
    Game: {
      screen: GamePokedex
    },
    Favourite: {
      screen: SavedTeams
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
      <AppContainer />
  );
}