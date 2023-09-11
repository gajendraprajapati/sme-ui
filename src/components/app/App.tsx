import React from 'react';
import './App.css';
import { Header } from '../common/header';
import { Container, Typography, CssBaseline } from '@material-ui/core'
import { ApplicationForm } from '../applicationForm/ApplicationForm';
// import { BottomNavigation } from '@mui/material';
import { Footer } from '../common/footer'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { CustomRoutes } from '../../routes/routes';

function App() {
  return (
    <div className="App">

      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Header></Header>
          <Container maxWidth="md">
            <Typography component="div" className='container'>
              <CustomRoutes />
            </Typography>

          </Container>
        </BrowserRouter>
      </React.Fragment>
      <Footer></Footer>
    </div>
  );
}

export default App;
