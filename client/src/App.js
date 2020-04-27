import React from 'react';
import './styles/sass/app.scss';
import HomePage from './components/homepage';
import Login from './components/login';
import SignUp from './components/signup';
import DashBoard from './components/dashboard';
import NoMatch from './components/noMatch';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import FundState from './context/funds/FundState';
import CreateFund from './components/createfund';
import TopBar from './components/sections/TopBar1';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <AuthState>
      <FundState>
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <PrivateRoute exact path='/dashboard' component={DashBoard} />
            <Route exact path='/createfund' component={CreateFund} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </FundState>
    </AuthState>
  );
}

export default App;
