import UserType from "./UserType";

interface GameType {
  id: number;
  players: UserType[];
  result: number;
}

export default GameType;