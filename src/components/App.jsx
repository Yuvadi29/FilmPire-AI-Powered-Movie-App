import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import MovieInformation from './MovieInformation/MovieInformation';
import Movies from './Movies/Movies';
import Actors from './Actors/Actors';
import Profile from './Profile/Profile';
import Navbar from './Navbar/Navbar';
import useStyles from './styles';

const App = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
          <Route exact path="/">
            <h1><Movies /></h1>
          </Route>
          <Route exact path="/movie/:id">
            <h1><MovieInformation /></h1>
          </Route>
          <Route exact path="/actors/:id">
            <h1><Actors /></h1>
          </Route>
          <Route exact path="/profile/:id">
            <h1><Profile /></h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
