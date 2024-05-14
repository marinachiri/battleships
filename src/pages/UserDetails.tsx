import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Endpoints } from "../constants/Endpoints";

interface UserData {
    email: string;
    currentlyGamesPlaying: number;
    gamesLost: number;
    gamesPlayed: number;
    gamesWon: number;
    // Alte câmpuri dacă există
}

const initialUserData: UserData = {
    email: "",
    currentlyGamesPlaying: 0,
    gamesLost: 0,
    gamesPlayed: 0,
    gamesWon: 0,
};

export default function UserDetails() {
    const [userData, setUserData] = useState<UserData>(initialUserData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("token").then((token) => {
            axios.get(Endpoints.GetUserDetails, {
                headers: { Authorization: `Bearer ${token}`}
            })
            .then((response) => {
                const userDataFromServer = response.data.user as UserData;
                const updatedUserData: UserData = {
                    ...initialUserData, // Inițializăm cu valorile implicite
                    ...userDataFromServer, // Suprascriem cu datele primite de la server
                };
                setUserData(updatedUserData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        });
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>Email utilizator: {userData.email}</Text>
                <Text style={styles.text}>Currently games playing: {userData.currentlyGamesPlaying}</Text>
                <Text style={styles.text}>Games lost: {userData.gamesLost}</Text>
                <Text style={styles.text}>Games played: {userData.gamesPlayed}</Text>
                <Text style={styles.text}>Games won: {userData.gamesWon}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20
    },
    innerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3 // Adaugă umbre pentru efect de adâncime
    },
    text: {
        marginBottom: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    }
});
