import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    Modal,
    Table,
    notification,
    Input
} from 'antd';

import { 
    BuildOutlined,
    UserOutlined,
    CheckCircleTwoTone,
} from '@ant-design/icons';

import RowToolbar from '../../component/RowToolbar';
import UserPrint from './UserPrint';
import TableTopBar from '../../component/TableTopBar';

export default function UserContent({token}) {

  const navigation = useHistory();
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);  
  const [row, setRow] = React.useState(null);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");

  const search = async () => {

    if(searchKey) {
 
      try {
        let response = await fetch('https://127.0.0.1:8585/users/filter/0/50/'+searchKey, {
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
  }

  const loadData = async () => {

    try {
      let response = await fetch('https://127.0.0.1:8585/users/all-users/0/1000', {
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
          console.log(data);
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

  const remove = async (email) => {

    try {
      
      if(email) {
        let response = await fetch('https://127.0.0.1:8585/users/delete', {
          method: 'DELETE',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body: JSON.stringify({
            'email':email
          })
        });

        let json = await response.json();
        if(json.status) {
            loadData();
        }
      }
    } 
    catch (error) {
          
      notification.error({
        message:"Error", 
        description:error?.message
      });
    }
  }

  const column = [
    {title:"", dataIndex:"", key:"Action", width:110, render:(txt, row)=>(
        <RowToolbar delAction={()=>remove(row.email)} 
                  editAction={()=>navigation.push("/access/users/edit", {rowData:row})}
                  printAction={()=>{
                    setRow(row);
                    setVisible(true);
                  }}/>
    )},
    {title:"Email", dataIndex:"email", key:"email"},
    {title:"Name", dataIndex:"name", key:"Name", width:250},
    {title:"Enabled", dataIndex:"enabled", key:"Enabled", width:100, render:(txt)=>txt?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:""},
    {title:"Locked", dataIndex:"locked", key:"Locked", width:100, render:(txt)=>txt?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:""}
  ]

  return (
      <>
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
            <TableTopBar addDocAction={()=>navigation.push("/access/role/add")}
                        serachDocAction={setOpenSearch} 
                        reloadAction={()=>loadData()}/>
            <div style={{
                          width:"99%",
                          height:"88%",
                          backgroundColor:"#FFFFFF", 
                          padding:5,
                          margin:5, 
                          borderStyle:"solid",
                          borderColor:"#BFBFBF",
                          borderWidth:1,
                          borderRadius:10,
                          alignItems:"stretch"}}>
              <Table dataSource={data} columns={column} style={{width:"100%"}} size="small"/>
            </div>
        </Layout.Content>
        <UserPrint visible={visible} confirmAction={()=>{}} cancelAction={() => setVisible(false)} data={row}/>
        <Modal title="Search data" visible={openSearch} onCancel={()=>setOpenSearch(false)} onOk={()=>{
          setOpenSearch(false);
          search()
        }} width={250} okText="Search">
          <Input.Search onChange={(e)=>setSearchKey(e.target.value)} style={{width:"100"}}/>
        </Modal>
      </>
  )
}