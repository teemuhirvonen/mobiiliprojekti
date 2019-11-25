import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { ListItem, ThemeProvider } from 'react-native-elements';

const Pokedex = (props) => {

  navigationOptions = {title: 'Calculator'};

  const { navigate } = props.navigation;

  const [pokemonAll, setPokemonAll] = useState([]);

  useEffect(() => 
    fetchPokemon(),
  []);

  const fetchPokemon = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=964')
      .then(response => response.json())
      .then(responseJson => { 
        setPokemonAll(responseJson.results);
      })
      .catch(error => { 
        Alert.alert(error); 
    });    
  }

  const theme = {
    ListItem: {
      containerStyle: {
        backgroundColor: 'red',
        width: 450,
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ThemeProvider theme={theme}>
        {pokemonAll.map((item, index) => (
          <ListItem
            key={index}
            /*leftAvatar={{ source: { uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1) + '.png' } }}*/
            title={"#" + (index + 1) + " " + item.name}
            bottomDivider
            onPress={ () => {
              navigate('PokemonDetails', {
                pokeId: index,
              })
            }}
          />
        ))}
        </ThemeProvider>
      </ScrollView>      
    </View>
  );
}

Pokedex.navigationOptions = ({navigate}) => ({title: 'Pokedex'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Pokedex;