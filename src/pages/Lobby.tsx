import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Endpoints } from '../constants/Endpoints';
import CreateGameForm from './CreateGameForm';
import { Game } from '../types/types';  // Importați tipul Game

export default function Lobby() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setError("Token not found");
      setIsLoading(false);
      return;
    }

    axios.get(Endpoints.GetGames, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log('Response data:', response.data);
      setGames(response.data.games.reverse());  // Inversăm ordinea jocurilor
      setIsLoading(false);
    })
    .catch((error) => {
      console.log('Error fetching games:', error);
      setError('Failed to fetch games');
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleJoinGame = async (gameId: string) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setError("Token not found");
      return;
    }

    axios.post(Endpoints.JoinGame.replace('+', gameId), {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log('Joined game:', response.data);
      showAlert("Success", "You have joined the game successfully!");
      // Navigați sau actualizați starea după alăturarea la joc
    })
    .catch((error) => {
      console.error('Error joining game:', error);
      setError('Failed to join game');
      showAlert("Error", "Failed to join the game. Please try again.");
    });
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  const handleGameCreated = (newGame: Game) => {
    fetchGames();  // Reîmprospătați lista de jocuri de la server
  };

  const renderGames = () => {
    return games.map((game) => (
      <View key={game.id} style={styles.gameItem}>
        <Text>{game.player1.email}</Text>
        <Button title="Join Game" onPress={() => handleJoinGame(game.id)} />
      </View>
    ));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CreateGameForm onGameCreated={handleGameCreated} />
      {games.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {renderGames()}
        </ScrollView>
      ) : (
        <Text>No games available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  gameItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
});
