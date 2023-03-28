import {useState, useEffect} from 'react'
import UserType from '../types/UserType'
import Box from '@mui/material/Box';
import GameType from "../types/GameType";
import ListItem from "@mui/material/ListItem";
import {nanoid} from "nanoid";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import GameStatus from '../types/GameStatus';

function Game() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [games, setGames] = useState<GameType[]>([]);
  const storageKey = 'users';

  useEffect(() => {
    if (users.length > 0) localStorage.setItem(storageKey, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    let cached = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (cached && users.length == 0) {
      scroll(0,0)
      setUsers(cached);
      let list: UserType[] = cached;
      list = list.sort((a,b) => {
        return Math.floor(Math.random() * 3) - 1
      });
      var i = 0;
      list = list.map(user => {
        user.id = ++i;
        user.available = true;
        return user;
      })
      const arr = list;
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          for (let k = j + 1; k < arr.length; k++) {
            for (let l = k + 1; l < arr.length; l++) {
              result.push([arr[i], arr[j], arr[k], arr[l]]);
            }
          }
        }
      }

      result = result.map(match => {
        match.sort((a,b) => {
          if(a.rank > b.rank) return 1;
          if(a.rank < b.rank) return -1;
          return randomZeroOneMinusOne();
        });
        if(Math.random() > 0.5){
          return [match[3], match[0], match[1],match[2]];
        }
        return [match[0], match[3], match[2],match[1]];
      })

      result.sort((a,b) => {
        return Math.floor(Math.random() * result.length) - 1
      })

      let combination: UserType[][] = []
      let result2: UserType[][] = [];
      let len = result.length;
      
      for(let i = 0; i < len; i++) {
        let index = Math.floor(Math.random() * result.length);
        let arr = result[index];
        result2.push([arr[0], arr[1], arr[2], arr[3]]);
        result.splice(index, 1);
      }

      result2.sort((a,b) => {
        return Math.floor(Math.random() * result2.length) - 1
      })
      
      let games: GameType[] = [];
      result2.forEach(match => {
        games.push({id: games.length + 1, players: match, status: GameStatus.READY, available: true})
      })
      setGames([...games]);
    } 
  }, []);

  const matchStart = (id: number, match: UserType[]) => {
    const newGame = games.map(game => {
      if(game.id == id) {
        if(game.status === GameStatus.FINISHED) return game;
        if(game.status === GameStatus.READY) {
          game.status = GameStatus.PLAYING;
          match.forEach(user => {
            user.available = false;
            let usersCopy = users;
            usersCopy[user.id - 1] = user;
            setUsers([...usersCopy]);
          })
        }
        else if(game.status === GameStatus.PLAYING) {
          match.forEach(user => {
            user.attended += 1;
            user.available = true;
            let usersCopy = users;
            usersCopy[user.id - 1] = user;
            setUsers([...usersCopy]);
          })
          game.status = GameStatus.FINISHED;
        }
      }
      return game;
    })
    setGames([...newGame]);
  }

  const randomZeroOneMinusOne = () => {
    const randomNumber = Math.floor(Math.random() * 3); // 產生 0~2 的隨機數
    return randomNumber - 1; // 將 0~2 映射為 -1~1
  }

  const getMatch = () => {
    const match = getPlayers();
    setGames([{id: games.length + 1, players: match, status: GameStatus.READY, available: true}, ...games]);
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

    const getStyle = (game: GameType, index: number) => {
      if(game.available != true) return {display: 'none'}
      if(game.players.filter(user => user.available === false).length > 0 && game.status === GameStatus.READY) return {display: 'none'}
      if(game.status === GameStatus.PLAYING) {
        return {backgroundColor: 'green'}
      }
      if(game.status === GameStatus.FINISHED) {
        return {backgroundColor: 'grey'}
      }
    }

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  const stringAvatar = (name: string, available: boolean) => {
    if(!available) return {sx: {bgcolor: '#d3d4d5'}, children: `${name[0]}`}

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      
      children: `${name[0]}`,
    };
  }
  
  const toggleUser = (name: string) => {
    let usersCopy = users;
    usersCopy.forEach(user => {
      if(user.name === name) user.available = !user.available;
    });
    setUsers([...usersCopy]);

    let gamesCopy = games;
    gamesCopy.forEach(game => {
      game.players.forEach(user => {
        if(user.name === name) game.available = user.available;
      });
    })
    console.log(gamesCopy);
    setGames([...gamesCopy]);
  }

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {users.map((user, index) => (
          <Grid item xs={2} key={nanoid()}>
            <Badge badgeContent={user.attended} color="primary">
              <Avatar {...stringAvatar(user.name, user.available)} onClick={() => toggleUser(user.name)}/>
            </Badge>
          </Grid>
        ))}
      </Grid>

      <List sx={{width: '100%', marginTop: 2}}>
        {games.map((game, index) => (
            <ListItem
              style={getStyle(game, index)}
              sx={{borderBottom: '1px solid #d3d4d5', textAlign: 'center', justifyContent: 'center'}}
              key={nanoid()}
              disableGutters
              onClick={() => matchStart(game.id, game.players)}
            >
              {game.players.map((player, index) => (<Avatar key={nanoid()} {...stringAvatar(player.name, player.available)}/>))}
            </ListItem>
        ))}
      </List>

    </Box>
  )
}

export default Game
