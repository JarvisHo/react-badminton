import { useState, useEffect } from 'react'
import UserType from '../types/UserType'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import avatar0241 from '../assets/ranks/e22a57632e83045e3c510f2f31dbb0f249c61a34.png'
import avatar0255 from '../assets/ranks/5903561fb10a3c625a06c2e01d44faff8946d398.png'
import avatar0256 from '../assets/ranks/f8ec5dcba640056246a9b80ca0474d64f08e743b.png'
import avatar0219 from '../assets/ranks/f2c7684047094bb7669c1ef4070475ada8ed6d25.png'
import avatar0083 from '../assets/ranks/810c4dc60ff4f315216717a2ecaa3c7dfe3fcf09.png'
import avatar0639 from '../assets/ranks/9a1980e702ceeb122fd621c99fe3b144e07d3cd4.png'
import avatar0491 from '../assets/ranks/b42d945352da56b666f18921e82460bba81898c8.png'
import Button from "@mui/material/Button";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';

function User() {
  const [editId, setEditId] = useState<number>(0)
  const [name, setName] = useState('')
  const [rank, setRank] = useState(0)
  const [attended, setAttended] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [users, setUsers] = useState<UserType[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const storageKey = 'users';

  useEffect(() => {
    let cached = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (cached.length > 0) {
      setUsers(cached);
    } else {
      setDefaultUsers()
    }
  }, []);

  const setDefaultUsers = () => {
    let i = 0;
    const customUsers = defaultUsers.map((user) => {
      return { id: user.id, name: user.label, rank: user.rank, attended: 0, available: false, checked: false, playing: false }
    })

    setUsers(customUsers)
    localStorage.setItem(storageKey, JSON.stringify(customUsers));
  }

  const handleReset = () => {
    init()
    localStorage.clear()
    setDefaultUsers()
  }

  const init = () => {
    setUsers([])
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setConfirmOpen(false);
  };

  const handleAddUser = () => {
    addUser(name, rank)
    handleClose()
  }

  const addUser = (userName: string, userRank: number) => {
    if (!userName) return
    let newUser = { id: users.length + 1, name: userName, rank: userRank, attended: 0, available: false, checked: false, playing: false };
    setUsers([...users, newUser]);
    localStorage.setItem(storageKey, JSON.stringify([...users, newUser]));
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

  const handleToggle = (value: number) => () => {
    const checkedUsers = users.map((user) => {
      if (user.id === value) {
        user.available = !user.available;
      }
      return user
    })
    setUsers([...checkedUsers])
    localStorage.setItem(storageKey, JSON.stringify([...checkedUsers]));
  };

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

  const defaultUsers = [
    { id: 1, label: 'Heidi', rank: 0 },
    { id: 2, label: 'Alice', rank: 0 },
    { id: 3, label: 'Oli', rank: 0 },
    { id: 4, label: '五千', rank: 0 },
    { id: 5, label: '薇文', rank: 0 },
    { id: 6, label: '喬治', rank: 0 },
    { id: 7, label: '靖堯', rank: 0 },
    { id: 8, label: '昇龍餃子', rank: 0 },
    { id: 9, label: "潔西", rank: 1 },
    { id: 10, label: '上倫', rank: 2 },
    { id: 11, label: '安娜', rank: 0 },
    { id: 12, label: '震宇', rank: 2 },
    { id: 13, label: '冠廷', rank: 2 },
    { id: 14, label: 'Wade', rank: 2 },
    { id: 15, label: 'Falcon', rank: 3 },
    { id: 16, label: '家安', rank: 3 },
    { id: 17, label: '黛玉', rank: 4 },
    { id: 18, label: '方塊馬', rank: 4 },
    { id: 19, label: '懷恩', rank: 4 },
  ]

  const handleEdit = (id: number) => () => {
    const user = users.find((user) => user.id === id);
    if (!user) return
    setEditId(user.id)
    setName(user.name)
    setRank(user.rank)
    setAttended(user.attended)
    setPlaying(user.playing)
    setEditOpen(true)
  }

  const handleDeleteUser = () => {
    if(!confirmOpen) {
      setEditOpen(false)
      setConfirmOpen(true)
      return
    }
    let newUsers = users.filter((user) => user.id !== editId);
    setUsers([...newUsers]);
    localStorage.setItem(storageKey, JSON.stringify([...newUsers]));
    setEditId(0);
    setName('')
    setRank(0)
    handleClose()
  }

  const handleUpdateUser = () => {
    let newUsers = users.map((user) => {
      if (user.id === editId) {
        return { ...user, name, rank, attended, playing }
      }
      return user
    })
    setUsers([...newUsers]);
    localStorage.setItem(storageKey, JSON.stringify([...newUsers]));
    handleClose()
  }

  const handlePlayingChange = () => {
    playing ? setPlaying(false) : setPlaying(true)
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
        選擇出賽球員
      </Typography>
      <List sx={{ width: '100%', margin: '0 auto', pt: 0 }}>
        {users.map((user) => (
          <ListItem
            sx={{ borderBottom: '1px solid #d3d4d5' }}
            disableGutters
            key={user.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={handleEdit(user.id)}>
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemButton role={undefined} onClick={handleToggle(user.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={user.available}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar sx={{ width: 64, height: 64, marginRight: 1 }} alt={getAvatarName(user.rank)}
                  src={getAvatar(user.rank)} />
              </ListItemAvatar>
              <ListItemText primary={`${user.name}: ${user.attended}場`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleReset} sx={{ marginRight: '10px' }}>
          重置
        </Button>
        <Button variant="contained" onClick={handleClickOpen}>
          新增球員
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增球員</DialogTitle>
        <DialogContent>
          <DialogContentText>
            名字：
          </DialogContentText>
          <FormControl>
            <TextField
              sx={{ marginTop: 2, width: 300 }}
              aria-labelledby="name-label"
              required
              id="outlined-required"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{
            marginTop: 2
          }}>
            <DialogContentText>
              等級：
            </DialogContentText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
              onChange={(e) => setRank(parseInt(e.target.value))}
            >
              <FormControlLabel value="0" control={<Radio />} label="火稚雞" />
              <FormControlLabel value="1" control={<Radio />} label="大蔥鴨" />
              <FormControlLabel value="2" control={<Radio />} label="力壯雞" />
              <FormControlLabel value="3" control={<Radio />} label="熔岩蝸牛" />
              <FormControlLabel value="4" control={<Radio />} label="大奶罐" />
              <FormControlLabel value="5" control={<Radio />} label="代拉基翁" />
              <FormControlLabel value="6" control={<Radio />} label="達克萊伊" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>取消</Button>
          <Button variant="contained" startIcon={<PersonAdd />} onClick={handleAddUser}>新增</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle>編輯球員</DialogTitle>
        <DialogContent>
          <DialogContentText>
            名字：
          </DialogContentText>
          <FormControl>
            <TextField
              sx={{ marginTop: 2, width: 300 }}
              aria-labelledby="name-label"
              required
              id="outlined-required"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ mt: 2 }}>
            <DialogContentText>
              等級：
            </DialogContentText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={rank}
              name="radio-buttons-group"
              onChange={(e) => setRank(parseInt(e.target.value))}
            >
              <FormControlLabel value="0" control={<Radio />} label="火稚雞" />
              <FormControlLabel value="1" control={<Radio />} label="大蔥鴨" />
              <FormControlLabel value="2" control={<Radio />} label="力壯雞" />
              <FormControlLabel value="3" control={<Radio />} label="熔岩蝸牛" />
              <FormControlLabel value="4" control={<Radio />} label="大奶罐" />
              <FormControlLabel value="5" control={<Radio />} label="代拉基翁" />
              <FormControlLabel value="6" control={<Radio />} label="達克萊伊" />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ mt: 2 }}>
            <DialogContentText>
              上場次數：
            </DialogContentText>
            <TextField
              sx={{ marginTop: 2, width: 300 }}
              aria-labelledby="name-label"
              required
              id="outlined-required"
              value={attended}
              onChange={(e) => setAttended(parseInt((e.target.value.length > 0) ? e.target.value : '0'))}
            />
          </FormControl>
          <FormControlLabel sx={{mt: 1}} control={<Switch checked={playing} onChange={handlePlayingChange} />} label="比賽中" />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteUser}>刪除</Button>
          <Button variant="outlined" onClick={handleClose}>取消</Button>
          <Button variant="contained" onClick={handleUpdateUser}>更新</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          確認刪除？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            刪除「{name}」，確定嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteUser} autoFocus>
            確認刪除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default User
