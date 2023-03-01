import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/Login';
import MainGame from './pages/MainGame';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/main" component={ MainGame } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}
