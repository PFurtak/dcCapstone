import React from "react";
import "./styles/sass/app.scss";
import HomePage from "./components/homepage";
import Login from "./components/login";
import SignUp from "./components/signup";
import DashBoard from "./components/dashboard";
import NoMatch from "./components/noMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={DashBoard} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
