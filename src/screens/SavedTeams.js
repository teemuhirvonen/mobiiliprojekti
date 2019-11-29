import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from '../components/Firebase';
import { ListItem, Icon } from 'react-native-elements';
import Constants from 'expo-constants';


const SavedTeams = () => {

    navigationOptions = {title: 'SavedTeams'};

    const [id, setId] = useState([]);
    const [teams, setTeams] = useState([]);

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