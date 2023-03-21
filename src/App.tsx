import {useEffect, useState} from 'react'
import './App.css'
import User from './components/User'
import Game from './components/Game'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {Fragment} from 'react';
import {createTheme} from '@mui/material/styles';
import {green, purple} from '@mui/material/colors';

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
          return {...user, attended: 0}
      })
      localStorage.setItem(storageKey, JSON.stringify(users));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div style={{width: '100%'}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && <div style={{width: '100%'}}>
          <User/>
        </div>}
        {activeStep === 1 && <div style={{width: '100%'}}>
          <Game/>
        </div>}
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{mt: 2, mb: 1}}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Box sx={{flex: '1 1 auto'}}/>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{mr: 1}}
              >
                上一步
              </Button>
              <Box sx={{flex: '1 1 auto'}}/>
              {activeStep !== steps.length - 1 && <Button color="primary" variant="contained" onClick={handleNext}>
                下一步
              </Button>}
            </Box>
          </Fragment>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
