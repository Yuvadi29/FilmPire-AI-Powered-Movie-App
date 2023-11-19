import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import MovieInformation from './MovieInformation/MovieInformation';
import Movies from './Movies/Movies';
import Actors from './Actors/Actors';
import Profile from './Profile/Profile';
import Navbar from './Navbar/Navbar';
import useStyles from './styles';
import useAlanAI from './Alan';
import { useRef } from 'react';

const App = () => {

  const classes = useStyles();
  const alanBtnContainer = useRef();

  useAlanAI();


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={["/", "/approved"]}>
            <Movies />
          </Route>
          <Route exact path="/movie/:id">
            <MovieInformation />
          </Route>
          <Route exact path="/actors/:id">
            <Actors />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div >
  );
};

export default App;
