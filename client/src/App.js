import React from 'react';
import './styles/sass/app.scss';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import FundState from './context/funds/FundState';
import CreateFund from './components/createfund';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  return (
    <AuthState>
      <FundState>
        <Router>
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/createfund' component={CreateFund} />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </FundState>
    </AuthState>
  );
};

export default App;
