import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Picker } from 'react-native';
import { ListItem, ThemeProvider } from 'react-native-elements';

const Pokedex = (props) => {

  navigationOptions = {title: 'Pokedex'};

  const { navigate } = props.navigation;

  const [pokemonAll, setPokemonAll] = useState([]);

  useEffect(() => 
    fetchPokemon(),
  []);

  const fetchPokemon = () => {
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
      .then(response => response.json())
      .then(responseJson => { 
        setPokemonAll(responseJson.pokemon_entries);
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
        <Picker 
          style={{height:30, marginTop: 20, marginBottom: 20, width: '100%'}}
          selectedValue=''
          onValueChange={ (value) => {
            navigate('Game', {
              game: value
            })
          }}>
          <Picker.Item 
            style={{}}
            label='Choose specific game'
            value='0'/>
          <Picker.Item 
            label='Red, Blue, Yellow, Fire red and Leaf green Pokedex'
            value='2'/>
          <Picker.Item 
            label='Gold, Silver and Crystal Pokedex'
            value='3'/>
          <Picker.Item 
            label='Ruby, Sapphire and Emerald Pokedex'
            value='4'/>
          <Picker.Item 
            label='Diamond and Pearl Pokedex'
            value='5'/>
          <Picker.Item 
            label='Platinum Pokedex'
            value='6'/>
          <Picker.Item 
            label='Heart gold and Soul silver Pokedex'
            value='7'/>
          <Picker.Item 
            label='Black and White Pokedex'
            value='8'/>
          <Picker.Item 
            label='Black 2 and White 2 Pokedex'
            value='9'/>
        </Picker>
        <ThemeProvider theme={theme}>
          {pokemonAll.map((item, index) => (
            <ListItem
              key={index}
              //leftAvatar={{ source: { uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png` } }}
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

Pokedex.navigationOptions = ({navigate}) => ({title: 'Pokedex'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Pokedex;