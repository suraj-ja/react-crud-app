import React , {useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { BrowserRouter, Router, Routes, Link, Route } from 'react-router-dom';
import './App.css';
import StateContext from './context/stateContext';
import dispatchContext from './context/dispatchContext';
import { useImmerReducer } from "use-immer"
import Header from './components/common/header';
axios.defaults.baseURL = 'https://reqres.in/'
const Register = React.lazy(() => import('./components/auth/register'));


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const InitialState = {
    isLoggedIn: false,
    user:{
      token : localStorage.getItem('react-app-token') || ''
    }
  }
  const ImmerReducer = (draft, action)=>{
    switch (action.type){
      case 'login':
        draft.isLoggedIn = true;
        return
      
      default: 
      return
    }

  }
  const [state, dispatch] = useImmerReducer(ImmerReducer, InitialState);

  useEffect(()=>{
    if(state.isLoggedIn){
      localStorage.setItem('react-app-token', state.user.token)
    }else{
      localStorage.clear('react-app-token');
    }
  },[state.isLoggedIn])
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }} >
        <StateContext.Provider value={state}>

        <BrowserRouter>
          <Header />
          <div className="main-container">
            <React.Suspense>
              <Routes>
                <Route path="register" element={< Register />} ></Route>
              </Routes>
            </React.Suspense>
          </div>

        </BrowserRouter>
        </StateContext.Provider>

      </Box>
    </div>
  );
}

export default App;
