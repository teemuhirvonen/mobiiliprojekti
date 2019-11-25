import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';
import { ListItem, ThemeProvider } from 'react-native-elements';

const Pokemon = (props) => {

    navigationOptions= {title: 'Pokemon',};
    const { params } = props.navigation.state;

    const [pokemon, setPokemon] = useState('');
    const [stats, setStats] = useState([]);
    const [types, setTypes] = useState([]);
    const [chain, setChain] = useState([]);
    
    useEffect(() => {
      fetchPokemon()
      fetchEvolution()
    },[]);

    const fetchPokemon = () => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + (params.pokeId + 1))
        .then(response => response.json())
        .then(responseJson => { 
            setPokemon(responseJson.name);
            setStats(responseJson.stats);
            setTypes(responseJson.types);
        })
        .catch(error => { 
            Alert.alert(error); 
        });    
      }

    const fetchEvolution = () => {
      fetch('https://pokeapi.co/api/v2/evolution-chain/' + (params.pokeId + 1))
      .then(response => response.json())
      .then(responseJson => { 
          setChain(responseJson.chain);
      })
      .catch(error => { 
          Alert.alert(error); 
      });    
    }

    var sortBy = (fn) => {
      return function (a, b) {
        var fa = fn(a)
        var fb = fn(b)
        return -(fa < fb) || +(fa > fb)
      }
    }

    let getSlot = (o) => { return o.slot};
    var sortBySlot = sortBy(getSlot);
    types.sort(sortBySlot);

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>{pokemon}</Text>
          <View style={{width: 400}}>
          <Text style={{fontSize: 20}}>Types: </Text>
          {types.map((getSlot, index) => (
            <ListItem
              key={index}
              title={getSlot.type.name}
              bottomDivider
            />
          ))}
          <Text style={{fontSize: 20}}>Base stats: </Text>
          {stats.map((item, index) => (
            <ListItem
              
              key={index}
              title={item.stat.name + ': ' + item.base_stat}
              bottomDivider
            />
          ))}
        </View>
        </ScrollView>      
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    text: {
      fontSize: 28,
      textAlign: 'left'
    }
});

export default Pokemon;