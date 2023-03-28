import UserType from "./UserType";

interface GameType {
  id: number;
  players: UserType[];
  status: number;
  available: boolean;
}

export default GameType;