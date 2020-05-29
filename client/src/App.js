import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
import NavBar from './components/views/NavBar/NavBar';

{/* <Route exact path="/" component={LandingPage} />
<Route exact path="/login" component={LoginPage} />
<Route exact path="/register" component={RegisterPage} /> */}

/*<Route exact path="/register" component={RegisterPage} />*/

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
