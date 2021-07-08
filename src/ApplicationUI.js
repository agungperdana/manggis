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

import TopBar from './TopBar';
import HomeContent from './HomeContent';
import ModuleContent from './access/ModuleContent';
import RoleContent from './access/RoleContent';
import UserContent from './access/UserContent';

export default function ApplicationUI({token}) {
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
                  <Link to="/access/module">Module</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item icon={<BlockOutlined/>}>
                  <Link to="/access/role">Role</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item icon={<UserOutlined/>}>
                  <Link to="/access/user">User</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Divider/>
              <Menu.SubMenu title="Global" icon={<GlobalOutlined/>}>
                <Menu.Item icon={<CompassFilled/>}>Geographic</Menu.Item>
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
            <TopBar/>
            <Switch>
              <Route exact path="/">
                <HomeContent/>
              </Route>
              <Route exact path="/access/module">
                <ModuleContent/>
              </Route>
              <Route exact path="/access/role">
                <RoleContent/>
              </Route>
              <Route exact path="/access/user">
                <UserContent token={token}/>
              </Route>
            </Switch>

          </Layout>
      </Layout>
    </Router>
  );
}