import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { 
  AppstoreFilled,
  BuildOutlined,
  AppstoreOutlined,
  BlockOutlined,
  UserOutlined,
  GlobalOutlined,
  HomeFilled,
  CompassFilled,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TopBar from './component/TopBar';
import HomeContent from './HomeContent';

import ModuleContent from './access/module/ModuleContent';
import ModuleAddForm from './access/module/ModuleAddForm';
import ModuleEditForm from './access/module/ModuleEditForm';

import RoleContent from './access/role/RoleContent';
import RoleAddForm from './access/role/RoleAddForm';
import RoleEditForm from './access/role/RoleEditForm';

import UserContent from './access/user/UserContent';
import UserAddForm from './access/user/UserAddForm';
import UserEditForm from './access/user/UserEditForm';

import GeographicContent from './global/user/GeographicContent';
import GeographicAddForm from './global/user/GeographicAddForm';
import GeographicEditForm from './global/user/GeographicEditForm';

export default function ApplicationUI({token, setToken, user}) {
  return (
    <Router>
      <Layout style={{display:"flex", height:"100%", width:"100%"}}>
        <Layout.Sider theme="dark" style={{height:"100%"}}>
            <div style={{
                          display:"flex",
                          alignContent:"flex-start", 
                          alignItems:"stretch", 
                          justifyContent:"flex-start",
                          padding:20,
                          backgroundColor:"#FFFFFF",
                          width:"100%",
                          height:"15%"}}>
              <img src="/manggis-logo-32.png"/>
              <h3 
                style={{color:"#EC4D37", 
                        fontWeight:900, 
                        margin:0, 
                        padding:0,
                        fontSize:24,
                        fontFamily:"fantasy",
                        paddingLeft:5,
                        borderBottomColor:"#F3CA20",
                        borderBottomWidth:3,
                        borderBottomStyle:"solid"
              }}>Manggis</h3>
              <font style={{color:"#8AAAE5", fontWeight:900, fontSize:18}}><sup>1.0</sup></font>
            </div>
            <Menu>
              <Menu.Divider/>
              <Menu.Item icon={<HomeFilled/>}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Divider/>
              <Menu.SubMenu title="Access" icon={<BuildOutlined/>}>
                <Menu.Item icon={<AppstoreOutlined/>}>
                  <Link exact to="/access/module/list">Module</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item icon={<BlockOutlined/>}>
                  <Link to="/access/role/list">Role</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item icon={<UserOutlined/>}>
                  <Link to="/access/user/list">User</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Divider/>
              <Menu.SubMenu title="Global" icon={<GlobalOutlined/>}>
                <Menu.Item icon={<CompassFilled/>}>
                  <Link exact to="/global/geographic/list">Geographic</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item icon={<ApartmentOutlined/>}>Company structure</Menu.Item>
              </Menu.SubMenu>
              <Menu.Divider/>
              <Menu.SubMenu title="CRM" icon={<AppstoreFilled/>}>
                <Menu.Item icon={<NodeCollapseOutlined/>}>Customer</Menu.Item>
                <Menu.Divider/>
                <Menu.Item icon={<NodeExpandOutlined/>}>Supplier</Menu.Item>
              </Menu.SubMenu>
              <Menu.Divider/>
              <Menu.Item></Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Item></Menu.Item>
            </Menu>
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
            <Switch>
              <Route exact path="/">
                <HomeContent/>
              </Route>
              <Route exact path="/access/module/list">
                <ModuleContent token={token}/>
              </Route>
              <Route exact path="/access/module/add">
                <ModuleAddForm token={token}/>
              </Route>
              <Route exact path="/access/module/edit">
                <ModuleEditForm token={token}/>
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
            </Switch>
          </Layout>
      </Layout>
    </Router>
  );
}