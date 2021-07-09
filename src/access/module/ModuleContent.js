import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    Button,
    Table,
    notification,
    Tooltip
} from 'antd';

import { 
    BuildOutlined,
    FileSearchOutlined,
    AppstoreOutlined,
    EditFilled,
    DeleteFilled,
    ZoomInOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';

export default function ModuleContent({token}) {

  const navigation = useHistory();
  const[data, setData] = React.useState([]);

  const column = [
    {title:"", dataIndex:"", key:"Action", width:110, render:()=>(
      <div>
        <Tooltip placement="topLeft" title="Remove data">
          <Button size="small" icon={<DeleteFilled/>} shape="circle" danger/>
        </Tooltip>
        <Tooltip placement="topLeft" title="Edit data">
          <Button size="small" icon={<EditFilled/>} type="primary" style={{marginLeft:3}} shape="circle" block/>
        </Tooltip>
        <Tooltip placement="topLeft" title="View data">
          <Button size="small" icon={<FileSearchOutlined/>} type="ghost" style={{marginLeft:3}} shape="circle" block/>
        </Tooltip>
      </div>
    )},
    {title:"Code", dataIndex:"code", key:"Code"},
    {title:"Name", dataIndex:"name", key:"Name"},
    {title:"Description", dataIndex:"note", key:"Note"},
    {title:"Group", dataIndex:"group", key:"Group", width:100},
    {title:"Enabled", dataIndex:"enabled", key:"Locked", width:50, render:(txt)=>txt?"Yes":"No"}
  ]
  
  const loadData = async () => {

    try {
      let response = await fetch('https://127.0.0.1:8585/modules/all-modules', {
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
                <AppstoreOutlined/> Module
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                List
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{width:"100%", marginLeft:5}}>
              <Button icon={<PlusCircleOutlined/>} type="link" size="small" onClick={()=>navigation.push("/access/module/add")}>
                Add new module
              </Button>
              <Button icon={<ZoomInOutlined/>} type="link" size="small">
                Search data
              </Button>
            </div>
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