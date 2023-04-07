import { useState, useEffect } from 'react'
import UserType from '../types/UserType'
import Box from '@mui/material/Box';
import GameType from "../types/GameType";
import { nanoid } from "nanoid";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import GameStatus from '../types/GameStatus';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UndoIcon from '@mui/icons-material/Undo';
import CasinoIcon from '@mui/icons-material/Casino';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import Avatar from '@mui/material/Avatar';
import avatar0241 from '../assets/ranks/e22a57632e83045e3c510f2f31dbb0f249c61a34.png'
import avatar0255 from '../assets/ranks/5903561fb10a3c625a06c2e01d44faff8946d398.png'
import avatar0256 from '../assets/ranks/f8ec5dcba640056246a9b80ca0474d64f08e743b.png'
import avatar0219 from '../assets/ranks/f2c7684047094bb7669c1ef4070475ada8ed6d25.png'
import avatar0083 from '../assets/ranks/810c4dc60ff4f315216717a2ecaa3c7dfe3fcf09.png'
import avatar0639 from '../assets/ranks/9a1980e702ceeb122fd621c99fe3b144e07d3cd4.png'
import avatar0491 from '../assets/ranks/b42d945352da56b666f18921e82460bba81898c8.png'
import Badge, { BadgeProps } from '@mui/material/Badge';

function Game() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [gameId, setGameId] = useState<number>(0);
  const [games, setGames] = useState<GameType[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancleConfrimOpen, setCancelConfirmOpen] = useState(false);

  const userKey = 'users';
  const gameKey = 'games';

  useEffect(() => {
    let userCached = JSON.parse(localStorage.getItem(userKey) || '[]')
    if (userCached.length > 0) {
      setUsers([...userCached]);
    }

    let gameCached = JSON.parse(localStorage.getItem(gameKey) || '[]')
    if (gameCached && games.length == 0) {
      setGames(gameCached);
    }
  }, []);

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

  const randomZeroOneMinusOne = () => {
    const randomNumber = Math.floor(Math.random() * 3); // 產生 0~2 的隨機數
    return randomNumber - 1; // 將 0~2 映射為 -1~1
  }

  const toggleUser = (id: number) => {
    let usersCopy = users.map(user => {
      if(user.id === id) user.checked = !user.checked;
      return user
    });
    setUsers([...usersCopy]);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const handleGameEnd = () => {
    if(!confirmOpen){ 
      setConfirmOpen(true);
      return
    }else {
      setConfirmOpen(false);
    }
    let gamesCopy = games.map(game => {
      if(game.id === gameId){
        game.status = GameStatus.FINISHED;
        game.available = false;
        let usersCopy = users.map(user => {
          if(game.players.filter(player => player.id === user.id).length > 0){
            user.playing = false;
            user.attended = user.attended + 1;
          }
          return user;
        })
        setUsers([...usersCopy]);
        localStorage.setItem(userKey, JSON.stringify([...usersCopy]));
      }
      return game
    })
    setGames([...gamesCopy]);
    localStorage.setItem('games', JSON.stringify(gamesCopy));

    let usersCopy = users.filter(user => user.checked === true && user.playing === true);
    usersCopy = users.map(user => {
      if(user.checked === true){
        user.checked = false;
        user.playing = false;
      }
      return user;
    });

    setUsers([...usersCopy]);
    localStorage.setItem(userKey, JSON.stringify([...usersCopy]));
  }

  const handleGameStart = () => {
    let usersCopy = users.filter(user => user.checked === true);
    console.log(usersCopy.length)
    if(usersCopy.length !== 4) return
    usersCopy.sort((a,b) => {
      if(a.rank > b.rank) return 1;
      if(a.rank < b.rank) return -1;
      return randomZeroOneMinusOne();
    })
    usersCopy = [usersCopy[0], usersCopy[3], usersCopy[2], usersCopy[1]];
    let gamesCopy = [{ id: games.length + 1, players: usersCopy, status: GameStatus.PLAYING, available: true }, ...games]
    setGames([...gamesCopy]);
    localStorage.setItem('games', JSON.stringify(gamesCopy));

    usersCopy = users.map(user => {
      if(user.checked === true){
        user.checked = false;
        user.playing = true;
      }
      return user;
    });

    setUsers([...usersCopy]);
    localStorage.setItem(userKey, JSON.stringify([...usersCopy]));
  }

  const handleFillPick = (pickedNumber: number) => {
    const usersRandom = users.filter(user => user.available === true && user.checked === false && user.playing === false).sort((a,b) => {
      if(a.attended > b.attended) return 1;
      if(a.attended < b.attended) return -1;
      return randomZeroOneMinusOne();
    });
    const picked = usersRandom.slice(0, 4 - pickedNumber);
    const usersCopy = users.map(user => {
      if(picked.filter(usersCopy => usersCopy.id === user.id).length > 0) {
        user.checked = true;
        return user;
      }
      if(users.filter(user => user.checked === true).filter(usersCopy => usersCopy.id === user.id).length > 0) {
        user.checked = true;
        return user;
      }
      return { ...user, checked: false};
    })
    setUsers([...usersCopy]);
  }

  const handlePick = () => {
    const pickedNumber = users.filter(user => user.checked === true).length
    if(pickedNumber < 4) {
      handleFillPick(pickedNumber)
      return
    }
    const usersRandom = users.filter(user => user.available === true && user.playing === false).sort((a,b) => {
      if(a.attended > b.attended) return 1;
      if(a.attended < b.attended) return -1;
      return randomZeroOneMinusOne();
    });
    const picked = usersRandom.slice(0, 4);
    const usersCopy = users.map(user => {
      if(picked.filter(usersCopy => usersCopy.id === user.id).length > 0) {
        user.checked = true;
        return user;
      }
      return { ...user, checked: false};
    })
    setUsers([...usersCopy]);
  }

  const handleGameCancel = () => {
    if(!cancleConfrimOpen){
      setCancelConfirmOpen(true);
      return
    }else{
      setCancelConfirmOpen(false);
    }
    const gamesCopy = games.map(game => {
      if(game.id === gameId) {
        return { ...game, status: GameStatus.CANCLED, available: false }
      }
      return game
    });
    setGames([...gamesCopy]);
    localStorage.setItem('games', JSON.stringify(gamesCopy));

    const picked = games.find(game => game.id === gameId)?.players || [];
    const usersCopy = users.map(user => {
      if(picked.filter(usersCopy => usersCopy.id === user.id).length > 0){
        user.playing = false;
        user.checked = false;
        return user;
      }
      return { ...user, checked: false};
    })
    setUsers([...usersCopy]);
    localStorage.setItem(userKey, JSON.stringify([...usersCopy]));
    setGameId(0);
  }

  const StyledVsBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -8,
      top: -60,
      fontSize: '1rem',
      fontWeight: 'bold',
      border: `0px`,
      padding: '0 4px',
    },
  }));

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -8,
      top: 13,
      border: `0px`,
      padding: '0 4px',
    },
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2} sx={{mt: 2}}>
        {games.filter(game => game.status === GameStatus.PLAYING).map((game, index) => (
          <Grid item xs={12} key={nanoid()}>
              <Typography variant="subtitle2" sx={{color: 'grey'}}>
                第{game.id}場比賽
              </Typography>
              <Item>
              <Grid container spacing={2} columnSpacing={4}>
                {game.players.filter(user => user.available === true && user.playing === true).map((user, index) => (
                  <Grid item xs={6} key={nanoid()}>
                      <Item style={{display: 'flex', flexWrap: 'wrap', alignContent: 'center'}}>
                        <Avatar sx={{ width: 36, height: 36, mr: 1 }} alt={getAvatarName(user.rank)}
                          src={getAvatar(user.rank)} />
                        <Box style={{alignSelf: 'center'}}>{user.name}</Box>
                      </Item>
                  </Grid>
                ))}
              </Grid>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <StyledVsBadge badgeContent={'vs'} style={{width: '100%'}}>
                    <Button startIcon={<UndoIcon/>} sx={{mt: 2}} fullWidth={true} variant='outlined' onClick={() => { setGameId(game.id); handleGameCancel()}}>取消</Button>
                  </StyledVsBadge>
                </Grid>
                <Grid item xs={6}>
                  <Button startIcon={<StopIcon/>} sx={{mt: 2}} fullWidth={true} variant='contained' onClick={() => { setGameId(game.id); handleGameEnd()}}>結束比賽</Button>
                </Grid>
              </Grid>
              </Item>
          </Grid>
        ))}
      </Grid>
      <Typography variant="subtitle2" sx={{color: 'grey', mt: 2, mb: 1}}>
        可出賽球員
      </Typography>
      <Grid container spacing={2}>
        {users.filter(user => user.available === true && user.playing === false).map((user, index) => (
          <Grid item xs={6} key={nanoid()}>
              <Item onClick={() => toggleUser(user.id)} style={{display: 'flex', flexWrap: 'wrap', alignContent: 'center'}}>
                  <Checkbox
                    edge="start"
                    checked={user.checked}
                    tabIndex={-1}
                    disableRipple
                  />
                  <Avatar sx={{ width: 36, height: 36, mr: 1 }} alt={getAvatarName(user.rank)}
                  src={getAvatar(user.rank)} />
                  <StyledBadge badgeContent={user.attended}>
                    <Box style={{alignSelf: 'center'}}>{user.name.slice(0,4)}</Box>
                  </StyledBadge>
              </Item>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} key={nanoid()}>
          <Button startIcon={<CasinoIcon/>} sx={{mt: 2}} fullWidth={true}  variant='outlined' onClick={() => handlePick()}>推薦球員</Button>
        </Grid>
        <Grid item xs={6} key={nanoid()}>
        <Button startIcon={<PlayArrowIcon/>} sx={{mt: 2}} fullWidth={true}  variant='contained' onClick={() => handleGameStart()}>上場比賽</Button>
        </Grid>
      </Grid>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          結束確認
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            確定結束比賽嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setConfirmOpen(false)} autoFocus>
            不結束
          </Button>
          <Button variant='contained' onClick={() => handleGameEnd()} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={cancleConfrimOpen}
        onClose={() => setCancelConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          取消確認
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            確定取消比賽嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setCancelConfirmOpen(false)} autoFocus>
            不取消
          </Button>
          <Button variant='contained' onClick={() => handleGameCancel()} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Game
