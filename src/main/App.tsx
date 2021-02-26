import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Clasroom } from 'screens';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/classroom">
          <Clasroom />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
