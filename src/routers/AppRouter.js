import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import MainDashboard from '../components/MainDashboard';
import MainAddPosting from '../components/MainAddPosting';
import MainAllPostings from '../components/MainAllPostings';
import Header from '../components/Header';
import AddPosting from '../components/AddPosting';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={MainDashboard} exact={true} />
        <Route path="/postings" component={MainAllPostings} exact={true} />
        <Route path="/createposting" component={MainAddPosting} exact={true} />
        {/*<Route path="/createposting" component={AddPosting} exact={true} />*/}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
