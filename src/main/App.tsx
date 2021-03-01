import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Classroom, Search } from 'screens';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/classroom">
          <Classroom />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
