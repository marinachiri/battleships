import { InputModeOptions } from "react-native";

export type RootStackParamList = {
    Home: undefined,
    Login: undefined,
    Register: undefined,
    UserDetails: undefined,
    Lobby: undefined
  };

export interface CustomInputProps {
    label: string,
    value: string,
    onValueChanged: (text: string) => void,
    inputType: InputModeOptions,
    secureText: boolean
}

export interface User {
    userId: string,
    exp: string
}
export interface Player {
    id: string;
    email: string;
  }
  
  export interface Game {
    id: string;
    status: string;
    player1: Player;
    player1Id: string;
    player2Id: string | null;
    playerToMoveId: string;
    // Alte câmpuri dacă există
  }