import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import MainDashboard from '../components/MainDashboard';
import MainAddPosting from '../components/MainAddPosting';
import MainAllPostings from '../components/MainAllPostings';
import Header from '../components/Header';
import AddPosting from '../components/AddPosting';
import EditPosting from '../components/EditPosting';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();


const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={MainDashboard} exact={true} />
        <PrivateRoute path="/postings" component={MainAllPostings} exact={true} />
        <PrivateRoute path="/createposting" component={MainAddPosting} exact={true} />
        <PrivateRoute path="/editposting/:id" component={MainAddPosting} exact={true} />
      </Switch>
    </div>
    </Router>
);

export default AppRouter;
