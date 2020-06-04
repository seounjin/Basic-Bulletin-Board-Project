import React, { Suspense } from 'react';
import {Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import BoardPage from "./views/BoardPage/BoardPage.js";
import BoardForm from "./views/BoardPage/BoardForm.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

import Auth from '../hoc/auth';


function App() {
  return (
    <Suspense fallback={(<div>abc...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/board" component={ Auth(BoardPage, null) } />
          <Route exact path="/boardform" component={ Auth(BoardForm, null) } />

        </Switch>
      </div>
      <Footer />

    </Suspense>
  );
}

export default App;
