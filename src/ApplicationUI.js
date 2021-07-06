import { Layout, Menu, Tooltip, Space, Avatar, Breadcrumb, Badge, Icon } from 'antd';
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
  MessageFilled,
  ApartmentOutlined,
  PoweroffOutlined,
  SettingFilled,
  AlertFilled
} from '@ant-design/icons';

export default function ApplicationUI({navigation}) {
  return (
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
            <Menu.Item icon={<HomeFilled/>}>Home</Menu.Item>
            <Menu.Divider/>
            <Menu.SubMenu title="Access" icon={<BuildOutlined/>}>
              <Menu.Item icon={<AppstoreOutlined/>}>Module</Menu.Item>
              <Menu.Divider/>
              <Menu.Item icon={<BlockOutlined/>}>Role</Menu.Item>
              <Menu.Divider/>
              <Menu.Item icon={<UserOutlined/>}>User</Menu.Item>
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
          <div align="right" style={{
                       backgroundColor:"#8AAAE5",
                       width:"100%", 
                       padding:15}}>
            <Badge count={3} style={{alignSelf:"flex-end"}} size="small">
              <Tooltip placement="topLeft" title="Notification">
                <a href="#">
                  <Avatar icon={<AlertFilled/>} size="small" style={{marginLeft:10, backgroundColor:"yellowgreen"}}/>
                </a>
              </Tooltip>
            </Badge>
            <Badge count={3} style={{alignSelf:"flex-end"}} size="small">
              <Tooltip placement="topLeft" title="Message">
                <a href="#">
                  <Avatar icon={<MessageFilled/>} size="small" style={{marginLeft:10, backgroundColor:"brown"}}/>
                </a>
              </Tooltip>
            </Badge>
            <Tooltip placement="topLeft" title="Application settings">
                <a href="#">
                  <Avatar icon={<SettingFilled/>} 
                        style={{marginLeft:10, backgroundColor:"green"}} 
                        size="small"/>
                </a>
            </Tooltip>
            <Tooltip placement="topLeft" title="Sign Out">
                <a href="#">
                  <Avatar icon={<PoweroffOutlined/>} 
                        style={{marginLeft:10, backgroundColor:"red"}} 
                        size="small"/>
                </a>
            </Tooltip>
          </div>
          <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <HomeFilled/>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Dashboard
              </Breadcrumb.Item>
            </Breadcrumb>
            <Space style={{
                          width:"99%", 
                          height:"95%",
                          backgroundColor:"#FFFFFF", 
                          padding:5,
                          margin:5, 
                          borderStyle:"solid",
                          borderColor:"#BFBFBF",
                          borderWidth:1,
                          borderRadius:10}}>
              askfjlasjlfkjaslkflkasfklaslkflk
            </Space>
          </Layout.Content>
        </Layout>
    </Layout>
  );
}