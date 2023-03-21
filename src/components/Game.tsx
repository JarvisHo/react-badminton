import {useState, useEffect} from 'react'
import UserType from '../types/UserType'
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import GameType from "../types/GameType";
import ListItem from "@mui/material/ListItem";
import {nanoid} from "nanoid";
import List from "@mui/material/List";

function Game() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [games, setGames] = useState<GameType[]>([]);
  const storageKey = 'users';

  useEffect(() => {
    if (users.length > 0) localStorage.setItem(storageKey, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    let cached = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (cached) setUsers(cached);
  }, []);

  const randomZeroOneMinusOne = () => {
    const randomNumber = Math.floor(Math.random() * 3); // 產生 0~2 的隨機數
    return randomNumber - 1; // 將 0~2 映射為 -1~1，再減去 1 後得到 -1、0 或 1
  }

  const getMatch = () => {
    const match = getPlayers();
    setGames([{id: games.length + 1, players: match, result: 0}, ...games]);
  }

  const getPlayers = () => {
    let playersCopy = users;
    playersCopy.sort((a,b) => {
      if(a.attended > b.attended) return 1;
      if(a.attended < b.attended) return -1;
      return randomZeroOneMinusOne();
    });
    for (let i = 0; i < 4; i++) {
      playersCopy[i].attended += 1;
    }
    setUsers(playersCopy);

    let match = [playersCopy[0], playersCopy[1], playersCopy[2], playersCopy[3]]
    match.sort((a,b) => {
      if(a.rank > b.rank) return 1;
      if(a.rank < b.rank) return -1;
      return randomZeroOneMinusOne();
    });
    if(Math.random() > 0.5){
      return [match[3], match[0], match[1],match[2]];
    }
    return [match[0], match[3], match[2],match[1]];
  }

  const getStyle = (index: number) => {
    if(index === 0){
      return {fontSize: '20px', fontWeight: 'bold', color: '#646cff'}
    }
    return {}
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button disabled={users.length < 4} sx={{marginTop: 3}} color="primary" variant="contained" onClick={() => getMatch()}>配對雙打比賽</Button>

      <List sx={{width: '100%', maxWidth: 360, margin: '0 auto'}}>
        {games.map((game, index) => (
            <ListItem
              style={getStyle(index)}
              sx={{borderBottom: '1px solid #d3d4d5', textAlign: 'center', justifyContent: 'center'}}
              key={nanoid()}
              disableGutters
            >
              {game.players.map((player, index) => (`${player.name}` + (index === 1 ? ' vs ' : ', ')))}
            </ListItem>
        ))}
      </List>

    </Box>
  )
}

export default Game
