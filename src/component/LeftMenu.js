import React from "react";

import { Menu } from 'antd';
import { 
  AppstoreFilled,
  BuildOutlined,
  BlockOutlined,
  UserOutlined,
  GlobalOutlined,
  HomeFilled,
  CompassFilled,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  ApartmentOutlined,
  GoldFilled,
  AppstoreOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.css';
import { Link } from "react-router-dom";

export default class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Menu>
              <Menu.Divider/>
              <Menu.Item icon={<HomeFilled/>}>
                <Link to="/">Dashboard</Link>
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
                <Menu.Item icon={<GoldFilled/>}>
                  <Link exact to="/global/party/list">Party</Link>
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
        );
    }
}