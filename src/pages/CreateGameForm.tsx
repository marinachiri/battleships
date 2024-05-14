import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Endpoints } from '../constants/Endpoints';
import { Game } from '../types/types';  // Importați tipul Game

export default function CreateGameForm({ onGameCreated }: { onGameCreated: (game: Game) => void }) {
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreateGame = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setError("Token not found");
      return;
    }

    console.log("Creating game with name:", gameName);

    axios.post(Endpoints.CreateGame, { name: gameName }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const createdGame = response.data as Game;  // Asigură-te că tipul este Game
      console.log('Game created:', createdGame);
      setGameName('');
      setError(null);
      onGameCreated(createdGame);  // Trimite jocul nou creat la Lobby
    })
    .catch((error) => {
      console.error('Error creating game:', error);
      setError('Failed to create game');
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Game Name"
        value={gameName}
        onChangeText={setGameName}
      />
      <Button title="Create Game" onPress={handleCreateGame} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
  },
});
