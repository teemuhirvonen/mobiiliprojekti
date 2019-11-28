import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Picker, ActivityIndicator } from 'react-native';
import { ListItem, ThemeProvider } from 'react-native-elements';

const Pokedex = (props) => {

  navigationOptions = {title: 'Pokedex'};

  const { navigate } = props.navigation;

  const [pokemonAll, setPokemonAll] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const gameNames = [
    "Red, Blue, Yellow, Fire red and Leaf green Pokedex",
    "Gold, Silver and Crystal Pokedex",
    "Ruby, Sapphire and Emerald Pokedex",
    "Diamond and Pearl Pokedex",
    "Platinum Pokedex",
    "Heart gold and Soul silver Pokedex",
    "Black and White Pokedex",
    "Black 2 and White 2 Pokedex",
  ];

  useEffect(() => 
    fetchPokemon(),
  []);

  const fetchPokemon = () => {
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
      .then(response => response.json())
      .then(responseJson => { 
        setPokemonAll(responseJson.pokemon_entries);
        setIsLoading(false);
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

  if (isLoading) {
    //Loading View while data is loading
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Picker 
          style={{height:30, marginTop: 20, marginBottom: 20, width: '100%'}}
          selectedValue=''
          onValueChange={(label, value) => {
            const game = gameNames[(label - 1)];
            navigate('Game', {
              game: value,
              gameName: game
            })
          }}>
          <Picker.Item 
            label='Choose specific game'
            value='0'/>
          <Picker.Item 
            label={gameNames[0]}
            value='2'/>
          <Picker.Item 
            label={gameNames[1]}
            value='3'/>
          <Picker.Item 
            label={gameNames[2]}
            value='4'/>
          <Picker.Item 
            label={gameNames[3]}
            value='5'/>
          <Picker.Item 
            label={gameNames[4]}
            value='6'/>
          <Picker.Item 
            label={gameNames[5]}
            value='7'/>
          <Picker.Item 
            label={gameNames[6]}
            value='8'/>
          <Picker.Item 
            label={gameNames[7]}
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