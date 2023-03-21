import {useState, useEffect} from 'react'
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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import avatar0241 from '../assets/ranks/e22a57632e83045e3c510f2f31dbb0f249c61a34.png'
import avatar0255 from '../assets/ranks/5903561fb10a3c625a06c2e01d44faff8946d398.png'
import avatar0256 from '../assets/ranks/f8ec5dcba640056246a9b80ca0474d64f08e743b.png'
import avatar0219 from '../assets/ranks/f2c7684047094bb7669c1ef4070475ada8ed6d25.png'
import avatar0083 from '../assets/ranks/810c4dc60ff4f315216717a2ecaa3c7dfe3fcf09.png'
import avatar0639 from '../assets/ranks/9a1980e702ceeb122fd621c99fe3b144e07d3cd4.png'
import avatar0491 from '../assets/ranks/b42d945352da56b666f18921e82460bba81898c8.png'
import {nanoid} from 'nanoid'
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

function User() {
  const [name, setName] = useState('')
  const [rank, setRank] = useState(0)
  const [users, setUsers] = useState<UserType[]>([]);
  const storageKey = 'users';

  useEffect(() => {
    if (users.length > 0) localStorage.setItem(storageKey, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    let cached = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (cached) setUsers(cached);
  }, []);

  const resetUser = () => {
    setUsers([]);
    localStorage.removeItem(storageKey);
  };

  const addUser = () => {
    if (!name) return
    let newUser = {id: users.length + 1, name, rank, attended: 0};
    setUsers([...users, newUser]);
    setName('')
  }

  const removeUser = (id: number) => {
    let newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
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

  const defaultUsers = [
    {label: '快速選擇成員', rank: 0},
    {label: 'Heidi', rank: 0},
    {label: '懷恩', rank: 4},
    {label: 'Alice', rank: 0},
    {label: '黛玉', rank: 4},
    {label: 'Oli', rank: 0},
    {label: "潔西", rank: 1},
    {label: '上倫', rank: 2},
    {label: '五千', rank: 0},
    {label: '薇文', rank: 0},
    {label: '方塊馬', rank: 4},
    {label: '震宇', rank: 2},
    {label: 'Falcon', rank: 3},
    {label: '家安', rank: 3},
    {label: '喬治', rank: 0},
    {label: 'Wade', rank: 2},
    {label: '靖堯', rank: 0},
    {label: '冠廷', rank: 2},
  ]

  const handleChange = (event: SelectChangeEvent) => {
    if(event.target.value === '快速選擇成員') return
    const data = defaultUsers.find((user) => user.label === event.target.value)
    if(!data) return
    const user = {id: users.length + 1, name: data.label, rank: data.rank, attended: 0}
    const existed = users.find((user) => user.name === data.label);
    if(existed) return
    setUsers([...users, user]);
  }

  return (
    <div>
      <List sx={{width: '100%', maxWidth: 360, margin: '0 auto'}}>
        {users.map((user) => (
          <ListItem
            sx={{borderBottom: '1px solid #d3d4d5'}}
            key={nanoid()}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment" onClick={() => removeUser(user.id)}>
                <DeleteIcon/>
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{width: 64, height: 64, marginRight: 1}} alt={getAvatarName(user.rank)}
                      src={getAvatar(user.rank)}/>
            </ListItemAvatar>
            <ListItemText primary={`${getAvatarName(user.rank)} - ${user.name}`}/>
          </ListItem>
        ))}
      </List>
      <FormControl fullWidth sx={{marginTop: 1}}>
        <Select
          aria-labelledby="name-label"
          value='快速選擇成員'
          sx={{margin: '0 auto', width: 300}}
          onChange={handleChange}
        >
          {defaultUsers.map((user) =>
            <MenuItem key={nanoid()} value={user.label}>{user.label}</MenuItem>)}
        </Select>
      </FormControl>
      <Divider sx={{marginTop: 2}}/>
      <FormControl>
        <TextField
          sx={{marginTop: 2, width: 300}}
          aria-labelledby="name-label"
          required
          id="outlined-required"
          label="新增自訂成員"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{
        marginTop: 2
      }}>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="0"
          name="radio-buttons-group"
          onChange={(e) => setRank(parseInt(e.target.value))}
        >
          <FormControlLabel value="0" control={<Radio/>} label="火稚雞"/>
          <FormControlLabel value="1" control={<Radio/>} label="大蔥鴨"/>
          <FormControlLabel value="2" control={<Radio/>} label="力壯雞"/>
          <FormControlLabel value="3" control={<Radio/>} label="熔岩蝸牛"/>
          <FormControlLabel value="4" control={<Radio/>} label="大奶罐"/>
          <FormControlLabel value="5" control={<Radio/>} label="代拉基翁"/>
          <FormControlLabel value="6" control={<Radio/>} label="達克萊伊"/>
        </RadioGroup>
      </FormControl>
      <Button sx={{marginTop: 3}} color="primary" variant="contained" onClick={() => addUser()}>加入列表</Button>
      <Button sx={{marginTop: 3, marginLeft: 2}} color="primary" variant="outlined" onClick={() => resetUser()}>清空列表</Button>
    </div>
  )
}

export default User
