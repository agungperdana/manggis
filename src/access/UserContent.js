import React from 'react';
import { 
    Layout,
    Breadcrumb,
    Button,
    Table,
    notification
} from 'antd';

import { 
    BuildOutlined,
    CloseSquareFilled,
    FileProtectOutlined,
    FileSearchOutlined,
    UserOutlined
} from '@ant-design/icons';

export default function UserContent({token}) {

  const[data, setData] = React.useState([]);

  const column = [
    {title:"", dataIndex:"", key:"Action", width:110, render:()=>(
      <div>
        <Button size="small" icon={<CloseSquareFilled/>} danger/>
        <Button size="small" icon={<FileProtectOutlined/>} block/>
        <Button size="small" icon={<FileSearchOutlined/>} block/>
      </div>
    )},
    {title:"Email", dataIndex:"email", key:"name"},
    {title:"Name", dataIndex:"name", key:"email"},
    {title:"Enabled", dataIndex:"enabled", key:"Enabled", render:(txt)=>txt?"Yes":"No"},
    {title:"Locked", dataIndex:"locked", key:"Locked", render:(txt)=>txt?"Yes":"No"},
  ]
  
  const loadData = async () => {

    try {
      let response = await fetch('https://127.0.0.1:8585/users/all-users', {
          method: 'GET',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          }
      });

      let json = await response.json();
      if(json.status) {
          setData(json.result);
      }
    } 
    catch (error) {
          
      notification.error({
        message:"Error", 
        description:error?.message
      });
    }
  }

  React.useEffect(()=>{loadData()},[]);

  return (
        <Layout.Content style={{backgroundColor:"#FFFFFF"}}>
            <Breadcrumb style={{padding:10}}>
              <Breadcrumb.Item>
                <BuildOutlined/> Access
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <UserOutlined/> User
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                List
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{
                          width:"99%", 
                          height:"95%",
                          backgroundColor:"#FFFFFF", 
                          padding:5,
                          margin:5, 
                          borderStyle:"solid",
                          borderColor:"#BFBFBF",
                          borderWidth:1,
                          borderRadius:10,
                          alignItems:"stretch"}}>
              <Table dataSource={data} columns={column} style={{width:"100%"}}/>
            </div>
        </Layout.Content>
  )
}