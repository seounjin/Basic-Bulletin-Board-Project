import React, { Suspense } from 'react';
import {Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import BoardPage from "./views/BoardPage/BoardPage.js";
import WritePage from "./views/BoardPage/Write.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import ReportPost from "./views/AdminPage/ReportPost";
import ReportComment from "./views/AdminPage/ReportComment";
import BoardForm from "./views/BoardPage/BoardForm";
import Mypage from "./views/Mypage/Mypage.js";
import PwCheck from "./views/Mypage/PwCheck";
import ChangePrivacy from "./views/Mypage/ChangePrivacy";
import ActivityDetails from "./views/Mypage/ActivityDetails";

import Auth from '../hoc/auth';


//option 
//null  => 아무나 출입이 가능
//true  => 로그인한 유저만 출입 가능 페이지
//false => 로그인한 유저는 출입 불가능한 페이지

function App() {
  return (
    <Suspense fallback={(<div>abc...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/board/:pageNum" component={Auth(BoardPage, null)} />
          <Route exact path="/write" component={Auth(WritePage, true)} />
          <Route exact path="/boardform/:postNum" component={ Auth(BoardForm, null) } />
          <Route exact path="/mypage" component={Auth(Mypage, true)} />
          <Route exact path="/pwcheck" component={Auth(PwCheck, true)} />
          <Route exact path="/changeprivacy" component={Auth(ChangePrivacy, true)} />
          <Route exact path="/activitydetails/:pageNum" component={Auth(ActivityDetails, true)} />
          <Route exact path="/ReportPost" component={ Auth(ReportPost, null, true) } />
          <Route exact path="/ReportComment" component={ Auth(ReportComment, true, true) } />
        </Switch>
      </div>
      <Footer />

    </Suspense>
  );
}

export default App;
