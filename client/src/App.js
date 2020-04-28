import React from 'react';
import './styles/sass/app.scss';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import CreateFund from './components/pages/CreateFund';
import NotFound from './components/pages/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import FundState from './context/funds/FundState';

const App = () => {
  return (
    <AuthState>
      <FundState>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/createfund' component={CreateFund} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </FundState>
    </AuthState>
  );
};

export default App;
