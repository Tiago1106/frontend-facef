import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Users from '../pages/Users';
import Providers from '../pages/Providers';
import Services from '../pages/Services';
import Schedulings from '../pages/Scheduling';

const Routes: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/providers" exact component={Providers} />
        <Route path="/services" exact component={Services} />
        <Route path="/schedulings" exact component={Schedulings} />
      </Switch>
    </Router>
  );
};

export default Routes;
