import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/" component={() => <div>404 Page not Found</div>} />
    </Switch>
  );
}
