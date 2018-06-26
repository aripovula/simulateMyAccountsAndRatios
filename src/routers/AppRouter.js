import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import SplitPane from 'react-split-pane';

import MainDashboard from '../components/MainDashboard';
import Header from '../components/Header';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={MainDashboard} exact={true} />
      </Switch>
      <MainDashboard/>      
    </div>
  </BrowserRouter>
);

export default AppRouter;
