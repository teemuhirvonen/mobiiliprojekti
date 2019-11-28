import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, Button } from 'react-native';
import { ListItem, ThemeProvider, Overlay } from 'react-native-elements';
import Firebase from '../components/Firebase';

const GamePokedex = (props) => {

  Firebase.database().ref('teams/')

  navigationOptions = {title: 'GamePokedex'};
  const { params } = props.navigation.state;
  const { navigate } = props.navigation;

  const [pokemonAll, setPokemonAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [randTeam, setRandTeam] = useState([]);

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

  const saveItem = () => {
    Firebase.database().ref('teams/').push(
      {
      'gameName': params.gameName,
      'pokemon1': randTeam[0],
      'pokemon2': randTeam[1],
      'pokemon3': randTeam[2],
      'pokemon4': randTeam[3],
      'pokemon5': randTeam[4],
      'pokemon6': randTeam[5],
      }
    );
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
    let arr = [];
    for(i = 0; i < 6; i++) {
      const pokemonNumber = getRandomInt(Object.keys(pokemonAll).length);
      const pokemonConvert = Object.values(pokemonAll[pokemonNumber].pokemon_species);
      const pokemon = pokemonConvert[0];
      arr.push(pokemon);
    };
    setRandTeam(arr);
    console.log(randTeam)
    setVisible(true);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <ScrollView>
          <View style={{alignSelf: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{params.gameName}</Text>
            <Button style={{width: 150}} title='Generate random team' onPress={randomTeam}/>
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
        <Overlay
          style={{height: 400}}
          isVisible={visible}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Your randomly generated team: </Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>{randTeam[0]}</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>{randTeam[1]}</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>{randTeam[2]}</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>{randTeam[3]}</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>{randTeam[4]}</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>{randTeam[5]}</Text>
          <View style={styles.buttonStyle}>
            <Button style={{marginRight: 5}} title="Save" onPress={() => {
              saveItem();
              setVisible(false)
              }}/>
            <Button style={{marginLeft: 5}}title="Close" onPress={() => setVisible(false)}/>
          </View>
        </Overlay>
    </View>
  );
}

GamePokedex.navigationOptions = ({navigate}) => ({title: 'Game'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    flex: 1,
    width: 200,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'space-around',
    padding: 20,
  }
});

export default GamePokedex;