import { Layout, Menu, Typography, Space, Avatar, Breadcrumb, Badge, Divider } from 'antd';
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
  MessageFilled
} from '@ant-design/icons';

function App() {
  return (
    <Layout style={{display:"flex", height:"100%", width:"100%"}}>
      <Layout.Sider theme="dark" style={{height:"100%"}}>
          <div style={{
                        display:"flex",
                        alignContent:"flex-start", 
                        alignItems:"stretch", 
                        justifyContent:"flex-start",
                        padding:20,
                        backgroundColor:"#8AAAE5",
                        width:"100%",
                        height:"25%"}}>
            <img src="/manggis-logo-32.png"/>
            <Typography.Title level={4} 
              style={{color:"#FFFFFF", 
                      fontWeight:900, 
                      margin:0, 
                      padding:0,
                      fontSize:24,
                      fontFamily:"serif",
                      paddingLeft:5
            }}>Manggis</Typography.Title>
            <font style={{color:"#FFFFFF", fontWeight:900, fontSize:18}}><sup>1.0</sup></font>
          </div>
          <Menu theme="dark">
            <Menu.Item icon={<HomeFilled/>}>Home</Menu.Item>
            <Menu.Divider/>
            <Menu.SubMenu title="Access" icon={<BuildOutlined/>}>
              <Menu.Item icon={<AppstoreOutlined/>}>Module</Menu.Item>
              <Menu.Item icon={<BlockOutlined/>}>Role</Menu.Item>
              <Menu.Item icon={<UserOutlined/>}>User</Menu.Item>
            </Menu.SubMenu>
            <Menu.Divider/>
            <Menu.SubMenu title="Global" icon={<GlobalOutlined/>}>
              <Menu.Item icon={<CompassFilled/>}>Geographic</Menu.Item>
            </Menu.SubMenu>
            <Menu.Divider/>
            <Menu.SubMenu title="CRM" icon={<AppstoreFilled/>}>
              <Menu.Item icon={<NodeCollapseOutlined/>}>Customer</Menu.Item>
              <Menu.Item icon={<NodeExpandOutlined/>}>Supplier</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item></Menu.Item>
            <Menu.Item></Menu.Item>
            <Menu.Item></Menu.Item>
            <Menu.Item></Menu.Item>
            <Menu.Item></Menu.Item>
            <Menu.Item></Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout>
          <div style={{
                       backgroundColor:"#FFFFFF",
                       width:"100%", 
                       float:"right",
                       paddingTop:20,
                       paddingBottom:20}}>
            <Badge count={3}>
                <Avatar/>
            </Badge>
            <Divider/>
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
            <Space style={{flex:1, backgroundColor:"#FFFFFF", padding:10}}>
              
            </Space>
          </Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
    </Layout>
  );
}

export default App;
