import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from '../components/Firebase';
import { ListItem } from 'react-native-elements';


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
            <Text style={{fontSize: 20, textAlign: "center"}}>Saved pokemon teams</Text>
            <View style={styles.listContainer}>
                {
                teams.map((item, index) => (
                    <ListItem
                        key={index}
                        title={item.gameName}
                        subtitle={`${item.pokemon1}\n${item.pokemon2}\n${item.pokemon3}\n${item.pokemon4}\n${item.pokemon5}\n${item.pokemon6}`}
                        onLongPress={() => deleteItem(index)}
                        bottomDivider
                    />
                )) 
                }
            </View>
        </View>
    );
}

SavedTeams.navigationOptions = ({navigate}) => ({title: 'Saved teams'})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
   },
   listContainer: {
     flex: 2
   }
});

export default SavedTeams;