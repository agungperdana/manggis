import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './css/manggis.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import TopBar from './component/TopBar';
import HomeContent from './HomeContent';

import RoleContent from './access/role/RoleContent';
import RoleAddForm from './access/role/RoleAddForm';
import RoleEditForm from './access/role/RoleEditForm';

import UserContent from './access/user/UserContent';
import UserAddForm from './access/user/UserAddForm';
import UserEditForm from './access/user/UserEditForm';

import GeographicContent from './global/geographic/GeographicContent';
import GeographicAddForm from './global/geographic/GeographicAddForm';
import GeographicEditForm from './global/geographic/GeographicEditForm';

import PartyContent from './global/party/PartyContent';
import PartyAddForm from './global/party/PartyAddForm';
import PartyEditForm from './global/party/PartyEditForm';

import LeftMenu from './component/LeftMenu';
import ModuleManager from './access/module/ModuleManager';

export default function ApplicationUI({token, setToken, user}) {

  return (
    <Router>
      <Layout className="layout-outer">
        <Layout.Sider theme="dark" className="layout-left-sider">
            <div className="logo-and-title-container">
              <img src="/manggis-logo-32.png"/>
              <h3 className="manggis-title">Manggis</h3>
              <font className="manggis-title-version"><sup>1.0</sup></font>
            </div>
            <LeftMenu/>
          </Layout.Sider>
          <Layout>
            <TopBar setToken={setToken} user={user}/>
            <Link exact to="/access/module/add"/>
            <Link exact to="/access/module/edit"/>
            <Link exact to="/access/role/add"/>
            <Link exact to="/access/role/edit"/>
            <Link exact to="/access/user/add"/>
            <Link exact to="/access/user/edit"/>
            <Link exact to="/global/geographic/add"/>
            <Link exact to="/global/geographic/edit"/>
            <Link exact to="/global/party/add"/>
            <Link to="/global/party/edit"/>
            <ModuleManager token={token}/>
            <Switch>
              <Route exact path="/">
                <HomeContent/>
              </Route>
              <Route exact path="/access/role/list">
                <RoleContent token={token}/>
              </Route>
              <Route exact path="/access/role/add">
                <RoleAddForm token={token}/>
              </Route>
              <Route exact path="/access/role/edit">
                <RoleEditForm token={token}/>
              </Route>
              <Route exact path="/access/user/list">
                <UserContent token={token}/>
              </Route>
              <Route exact path="/access/user/add">
                <UserAddForm token={token}/>
              </Route>
              <Route exact path="/access/user/edit">
                <UserEditForm token={token}/>
              </Route>
              <Route exact path="/global/geographic/list">
                <GeographicContent token={token}/>
              </Route>
              <Route exact path="/global/geographic/add">
                <GeographicAddForm token={token}/>
              </Route>
              <Route exact path="/global/geographic/edit">
                <GeographicEditForm token={token}/>
              </Route>
              <Route exact path="/global/party/list">
                <PartyContent token={token}/>
              </Route>
              <Route exact path="/global/party/add">
                <PartyAddForm token={token}/>
              </Route>
              <Route path="/global/party/edit">
                <PartyEditForm token={token}/>
              </Route>
            </Switch>
          </Layout>
      </Layout>
    </Router>
  );
}