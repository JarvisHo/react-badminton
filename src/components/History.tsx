import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import GameType from "../types/GameType";
import { nanoid } from "nanoid";
import Grid from "@mui/material/Grid";
import GameStatus from '../types/GameStatus';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Avatar from '@mui/material/Avatar';
import avatar0241 from '../assets/ranks/e22a57632e83045e3c510f2f31dbb0f249c61a34.png'
import avatar0255 from '../assets/ranks/5903561fb10a3c625a06c2e01d44faff8946d398.png'
import avatar0256 from '../assets/ranks/f8ec5dcba640056246a9b80ca0474d64f08e743b.png'
import avatar0219 from '../assets/ranks/f2c7684047094bb7669c1ef4070475ada8ed6d25.png'
import avatar0083 from '../assets/ranks/810c4dc60ff4f315216717a2ecaa3c7dfe3fcf09.png'
import avatar0639 from '../assets/ranks/9a1980e702ceeb122fd621c99fe3b144e07d3cd4.png'
import avatar0491 from '../assets/ranks/b42d945352da56b666f18921e82460bba81898c8.png'

function History() {
  const [games, setGames] = useState<GameType[]>([]);

  const gameKey = 'games';

  useEffect(() => {
    let gameCached = JSON.parse(localStorage.getItem(gameKey) || '[]')
    if (gameCached && games.length == 0) {
      setGames(gameCached);
    }
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const handleReset = () => {
    const gamesCopy = games.filter(game => game.status === GameStatus.PLAYING && game.players.length > 0)
    localStorage.setItem(gameKey, JSON.stringify(gamesCopy));
    setGames([...gamesCopy]);
  }

  const getAvatar = (rank: number) => {
    switch (rank) {
      case 0:
        return avatar0255;
      case 1:
        return avatar0083;
      case 2:
        return avatar0256;
      case 3:
        return avatar0219;
      case 4:
        return avatar0241;
      case 5:
        return avatar0639;
      case 6:
        return avatar0491;
      default:
        return avatar0255;
    }
  }
  const getAvatarName = (rank: number) => {
    switch (rank) {
      case 0:
        return '火稚雞';
      case 1:
        return '大蔥鴨';
      case 2:
        return '力壯雞';
      case 3:
        return '熔岩蝸牛';
      case 4:
        return '大奶罐';
      case 5:
        return '代拉基翁';
      case 6:
        return '達克萊伊';
      default:
        return '火稚雞';
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle1" sx={{color: 'grey', mb: 1}}>
        歷史場次紀錄
      </Typography>
      
      <Grid container spacing={2} sx={{mt: 1}}>
        {games.filter(game => game.status === GameStatus.FINISHED && game.players.length > 0).map((game, index) => (
          <Grid item xs={12} key={nanoid()}>
            
              <Item>
              
                <Grid container spacing={2}>
                  {game.players.map((user, index) => (
                    <Grid item xs={6} key={nanoid()}>
                        <Item style={{display: 'flex', flexWrap: 'wrap', alignContent: 'center'}}>
                          <Avatar sx={{ width: 36, height: 36, mr: 1 }} alt={getAvatarName(user.rank)}
                            src={getAvatar(user.rank)} />
                          <Box style={{alignSelf: 'center'}}>{user.name}</Box>
                        </Item>
                    </Grid>
                  ))}
                </Grid>
                <Typography variant="subtitle2" sx={{color: 'grey', mt: 1, textAlign: 'center'}}>
                  {game.status === GameStatus.FINISHED ? '比賽結束' : '比賽取消'}
                </Typography>
              </Item>
              
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button startIcon={<RestartAltIcon/>} sx={{mt: 2}} fullWidth={true} variant='outlined' onClick={() => { handleReset()}}>清除所有紀錄</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default History
