import React from 'react';

import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const theme = {
  // space: [0, 6, 12, 18, 24],
  // breakpoints: [512, 768, 1024, 1240],
};

const App = props => (
  <ThemeProvider theme={theme}>
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <Switch>
        <Route exact path='/' render={routeProps => <Home {...routeProps} />} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
