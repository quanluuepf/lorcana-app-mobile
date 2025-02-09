import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch('https://lorcana.brybry.fr/api/sets')
      .then((response) => {
        return response.json();
      }).then((response) => {
        setSets(response.data)
      }).catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  return (
    <View style={styles.container}>
      <Text>Chapitres</Text>
      {sets.map((set) => {
        return <TouchableOpacity key={set.id} onPress={() => {
          router.push(`/cardList?id=${set.id}`);
        }} >
          <View style={styles.setElement}>
            <Text key={set.id}>{set.code} - {set.name}</Text>
          </View>
        </TouchableOpacity>
      })}


      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  setElement: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
