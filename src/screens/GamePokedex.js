import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { ListItem, ThemeProvider } from 'react-native-elements';
import { Button } from 'react-native-paper';

const GamePokedex = (props) => {

  navigationOptions = {title: 'GamePokedex'};
  const { params } = props.navigation.state;
  const { navigate } = props.navigation;

  const [pokemonAll, setPokemonAll] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  let randTeam = [];

  useEffect(() => 
    fetchPokemon(),
  []);

  const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokedex/${params.game}`)
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

  const getRandomInt = (max) => {
    return (Math.floor((Math.random() * max) + 1))
  }

  const randomTeam = () => {
    for(i = 0; i < 6; i++) {
      randTeam.push(getRandomInt(Object.keys(pokemonAll).length));
    }
    console.log(randTeam);
    navigate('RandomTeam', { game: randTeam });
  }


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
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>{params.gameName}</Text>
            <Button style={{width: '70%', alignSelf: 'center'}} mode='contained' onPress={randomTeam}>
              Generate random team
            </Button>
          </View>
          <View>
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
          </View>
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