import UserType from "./UserType";

interface GameType {
  id: number;
  players: UserType[];
  status: number;
  available: boolean;
  started_at: number;
  finished_at: number;
}

export default GameType;