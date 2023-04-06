import { useRef, useState } from 'react'
import './App.css'
import User from './components/User'
import Game from './components/Game'
import History from './components/History'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import Paper from '@mui/material/Paper';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
import Box from '@mui/material/Box';
import UserType from "./types/UserType";

function App() {
  const storageKey = 'users';
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['加入球員', '建立比賽'];
  const ref = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    resetAttended()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const resetAttended = () => {
    let users = JSON.parse(localStorage.getItem(storageKey) || '[]')

    if (users.length > 0) {
      users = users.map((user: UserType) => {
        return { ...user, attended: 0 }
      })
      localStorage.setItem(storageKey, JSON.stringify(users));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ pb: 7 }} ref={ref}>
        {activeStep === 0 && <div style={{ width: '100%' }}>
          <User />
        </div>}
        {activeStep === 1 && <div style={{ width: '100%' }}>
          <Game />
        </div>}
        {activeStep === 2 && <div style={{ width: '100%' }}>
          <History />
        </div>}
      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={activeStep}
          onChange={(event, newValue) => {
            setActiveStep(newValue);
          }}
        >
          <BottomNavigationAction label="球員" icon={<PersonIcon />}/>
          <BottomNavigationAction label="比賽" icon={<SportsTennisIcon />} />
          <BottomNavigationAction label="紀錄" icon={<FormatListBulletedIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  )
}

export default App
