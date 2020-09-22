import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Users from '../pages/Users';
import Providers from '../pages/Providers';
import Services from '../pages/Services';
import Schedulings from '../pages/Scheduling';

import CreateUser from '../pages/Users/Create';
import CreateService from '../pages/Services/Create';
import CreateProvider from '../pages/Providers/Create';
import CreateSchedulings from '../pages/Scheduling/Create';

const Routes: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/providers" exact component={Providers} />
        <Route path="/services" exact component={Services} />
        <Route path="/schedulings" exact component={Schedulings} />

        <Route path="/createUser" exact component={CreateUser} />
        <Route path="/createService" exact component={CreateService} />
        <Route path="/createProvider" exact component={CreateProvider} />
        <Route path="/createSchedulings" exact component={CreateSchedulings} />
      </Switch>
    </Router>
  );
};

export default Routes;
