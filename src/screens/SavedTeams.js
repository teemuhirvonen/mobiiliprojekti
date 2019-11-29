import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';

import Firebase from '../components/Firebase';
import Separator from '../components/Separator';

const SavedTeams = (props) => {

    navigationOptions = {title: 'SavedTeams'};

    const { navigate } = props.navigation;

    const [id, setId] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [pokemonTeam, setPokemonTeam] = useState([]);
    const arr = [];

    useEffect(() => {
        Firebase.database().ref('teams/').on('value', snapshot => {
        const data = snapshot.val();
        const prods = Object.values(data);
        const keys = Object.keys(data);
        setTeams(prods);
        setId(keys);
        });
    }, []);

    Firebase.database().ref('teams/')

    const deleteItem = (index) => {
        Firebase.database().ref('teams/' + id[index]).remove();
        }
    
    const showModal = (team) => {
        for(i = 1; i < 7; i++) {
            const getPokemon = Object.values(team)[i];
            const pokemon = getPokemon;
            arr.push(pokemon);
        };
        setPokemonTeam(arr);
        setIsVisible(true);
    }    

    return (
        <View style={styles.container}>
            
            <View style={styles.listContainer}>
                {
                teams.map((item, index) => (
                    <ListItem
                        key={index}
                        title={() => {
                            return <Text style={{fontWeight: 'bold'}}>{item.gameName.slice(0,-8)}</Text>;
                            }}
                        subtitle={() => {
                            return(
                            <View>
                                <Text>
                                    {item.pokemon1.charAt(0).toUpperCase() + item.pokemon1.slice(1)}
                                </Text>
                                <Text>
                                    {item.pokemon2.charAt(0).toUpperCase() + item.pokemon2.slice(1)}
                                </Text>
                                <Text>
                                    {item.pokemon3.charAt(0).toUpperCase() + item.pokemon3.slice(1)}
                                </Text>
                                <Text>
                                    {item.pokemon4.charAt(0).toUpperCase() + item.pokemon4.slice(1)}
                                </Text>
                                <Text>
                                    {item.pokemon5.charAt(0).toUpperCase() + item.pokemon5.slice(1)}
                                </Text>
                                <Text>
                                    {item.pokemon6.charAt(0).toUpperCase() + item.pokemon6.slice(1)}
                                </Text>
                            </View>
                            );
                        }
                        }
                        onLongPress={() => showModal(item)}
                        rightIcon={() => {
                            return(
                            <Icon
                                name='trash-2'
                                type='feather'
                                color='#517fa4'
                                onPress={() => deleteItem(index)}
                            />    
                            );
                        }}
                        bottomDivider
                    >
                    </ListItem>
                )) 
                }
            <Modal
            animationIn='fadeInUp'
            animationOut="fadeInDown"
            transparent={false}
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            style={{ backgroundColor: 'white', marginVertical: 160, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={{flex: 1, marginVertical: "7%"}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Show pokemon info</Text>
                <Separator/>
                <View style={{marginBottom: 10, width: 350}}>
                    {pokemonTeam.map((item, index) => (
                        <ListItem
                        key={index}
                        title={item.charAt(0).toUpperCase() + item.slice(1)}
                        rightIcon={() => {
                            return(
                            <Icon
                                name='chevron-right'
                                type='feather'
                                color='#517fa4'
                            />    
                            );
                        }}
                        onPress={ () => {
                            setIsVisible(false)
                            navigate('PokemonDetails', {
                              pokeName: item
                            })
                          }}
                        bottomDivider>
                    </ListItem>
                    ))}
                </View>
                <View >
                    <Button title="Close" onPress={() => setIsVisible(false)}/>
                </View>
            </View>
        </Modal>
            </View>
        </View>
    );
}

SavedTeams.navigationOptions = ({navigate}) => ({title: 'Saved pokemon teams'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
   },
   listContainer: {
     flex: 3,
   }
});

export default SavedTeams;