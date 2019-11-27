import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

const Pokemon = (props) => {

    navigationOptions= {title: 'Pokemon',};
    const { params } = props.navigation.state;

    const [stats, setStats] = useState([]);
    const [types, setTypes] = useState([]);
    const [number, setNumber] = useState([]);

    const images = [
      { key: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png` },
      { key: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${number}.png` },
    ]
    
    useEffect(() => {
      fetchPokemon()
    },[]);

    const fetchPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`)
        .then(response => response.json())
        .then(responseJson => {
            setStats(responseJson.stats);
            setTypes(responseJson.types);
            setNumber(responseJson.id);
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

    const renderImage = ({item, index}) => {
      return (<Image style={{width: 150, height: 150}} source={{ uri: item.key }}></Image>)
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>{params.pokeName.charAt(0).toUpperCase() + params.pokeName.slice(1)}</Text>
          <View>
            <FlatList
              data={images}
              renderItem={renderImage}
              numColumns={2}
            />
          </View>
          <View style={{width: 400}}>
          <Text style={{fontSize: 20}}>Types: </Text>
          {types.map((getSlot, index) => (
            <ListItem
              key={index}
              title={getSlot.type.name.charAt(0).toUpperCase() + getSlot.type.name.slice(1)}
              bottomDivider
            />
          ))}
          <Text style={{fontSize: 20}}>Base stats: </Text>
          {stats.map((item, index) => (
            <ListItem
              key={index}
              title={(item.stat.name.charAt(0).toUpperCase() + item.stat.name.slice(1)) + ': ' + item.base_stat}
              bottomDivider
            />
          ))}
        </View>
        </ScrollView>      
      </View>
    );
  }

  Pokemon.navigationOptions = ({navigate}) => ({title: 'Pokemon'})


const styles = StyleSheet.create({
    container: {
        flex: 3,
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