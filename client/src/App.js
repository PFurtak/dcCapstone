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

function App() {
  return (
    <AuthState>
      <FundState>
        <Router>
          <Switch>
            <Route exact path='/dashboard' component={DashBoard} />
            <Route exact path='/createfund' component={CreateFund} />
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </FundState>
    </AuthState>
  );
}

export default App;
