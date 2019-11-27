import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { ListItem, ThemeProvider } from 'react-native-elements';

const GamePokedex = (props) => {

  navigationOptions = {title: 'GamePokedex'};
  const { params } = props.navigation.state;
  const { navigate } = props.navigation;

  const [pokemonAll, setPokemonAll] = useState([]);
  const [dexName, setDexName] = useState('');

  useEffect(() => 
    fetchPokemon(),
  []);

  const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokedex/${params.game}`)
      .then(response => response.json())
      .then(responseJson => { 
        setPokemonAll(responseJson.pokemon_entries);
        setDexName(responseJson.descriptions[0].description);
      })
      .catch(error => { 
        Alert.alert(error); 
    });    
  }

  const theme = {
    ListItem: {
      containerStyle: {
        width: 450,
      }
    }
  };

  return (
    <View style={styles.container}>
        <ScrollView>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 12}}>{dexName}</Text>
        <ThemeProvider theme={theme}>
          {pokemonAll.map((item, index) => (
            <ListItem
              key={index}
              title={`#${item.entry_number} ${item.pokemon_species.name.charAt(0).toUpperCase() + item.pokemon_species.name.slice(1)}`}
              bottomDivider
              onPress={ () => {
                navigate('PokemonDetails', {
                  pokeName: item.pokemon_species.name
                })
              }}
            />
          ))}
        </ThemeProvider>
        </ScrollView> 
    </View>
  );
}

GamePokedex.navigationOptions = ({navigate}) => ({title: 'Game'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GamePokedex;