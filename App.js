import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Pokedex from './src/screens/Pokedex';
import Pokemon from './src/screens/Pokemon';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Pokedex
    },
    PokemonDetails: {
      screen: Pokemon
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
      <AppContainer style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});