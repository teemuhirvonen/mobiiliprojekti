import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';

import Firebase from '../components/Firebase';
import Separator from '../components/Separator'

const GamePokedex = (props) => {

  Firebase.database().ref('teams/')

  navigationOptions = {title: 'GamePokedex'};
  const { params } = props.navigation.state;
  const { navigate } = props.navigation;

  const [pokemonAll, setPokemonAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
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
    setIsVisible(true);
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
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{params.gameName}</Text>
          <Separator/>
          <View>
            <Button buttonStyle={{height: 50}} title='Generate random team' onPress={randomTeam}/>
          </View>
          <Separator/>
          <View>
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
                  rightIcon={() => {
                    return(
                    <Icon
                        name='chevron-right'
                        type='feather'
                        color='#517fa4'
                    />    
                    );
                }}
                />
              ))}
          </View>
        </ScrollView> 
        <Modal
          animationIn='fadeInUp'
          animationOut="fadeInDown"
          transparent={false}
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          style={{ backgroundColor: 'white', marginVertical: 250, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{flex: 1, marginVertical: "7%"}}>
            <View style={{marginBottom: 5}}>
              <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Your randomly generated team: </Text>
              <Text style={styles.text}>{randTeam[0]}</Text>
              <Text style={styles.text}>{randTeam[1]}</Text>
              <Text style={styles.text}>{randTeam[2]}</Text>
              <Text style={styles.text}>{randTeam[3]}</Text>
              <Text style={styles.text}>{randTeam[4]}</Text>
              <Text style={styles.text}>{randTeam[5]}</Text>
            </View>
            <Separator/>
            <View style={styles.buttonStyle}>
              <Button buttonStyle={{width: 100}} title="Save" 
              onPress={() => {
                saveItem();
                setIsVisible(false)
                }}/>
              <Button buttonStyle={{width: 100}} title="Close" onPress={() => setIsVisible(false)}/>
            </View>
          </View>
        </Modal>
    </View>
  );
}

GamePokedex.navigationOptions = ({navigate}) => ({title: 'Game specific pokedex'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  }
});

export default GamePokedex;