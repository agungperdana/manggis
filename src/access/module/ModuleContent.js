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
    AppstoreOutlined,
    CheckCircleTwoTone
} from '@ant-design/icons';
import RowToolbar from '../../component/RowToolbar';
import ModulePrint from './ModulePrint';
import TableTopBar from '../../component/TableTopBar';

export default function ModuleContent({token}) {

  const navigation = useHistory();
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);  
  const [row, setRow] = React.useState(null);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");

  const search = async () => {

    if(searchKey) {
      console.log(searchKey);
      try {
        let response = await fetch('https://127.0.0.1:8585/modules/filter/0/50/'+searchKey, {
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


  const print = async () => {


  }

  const loadData = async () => {

    try {
      let response = await fetch('https://127.0.0.1:8585/modules/all-modules/0/50', {
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

  const remove = async (code) => {

    console.log(code);
    try {
      
      if(code) {
        let response = await fetch('https://127.0.0.1:8585/modules/delete/', {
          method: 'DELETE',
          headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
          body: JSON.stringify({
            'code':code
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
    {title:"Code", dataIndex:"code", key:"Code"},
    {title:"Name", dataIndex:"name", key:"Name"},
    {title:"Description", dataIndex:"note", key:"Note"},
    {title:"Group", dataIndex:"group", key:"Group", width:100},
    {title:"Enabled", dataIndex:"enabled", key:"Locked", width:50, render:(txt)=>txt?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---"},
    {title:"", dataIndex:"", key:"Action", width:110, render:(txt, row)=>(
      <RowToolbar delAction={()=>remove(row.code)} 
                editAction={()=>navigation.push("/access/module/edit", {rowData:row})}
                printAction={()=>{
                  setRow(row);
                  setVisible(true);
                }}/>
    )},
  ]

  return (
      <>
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
            <TableTopBar addDocAction={()=>navigation.push("/access/module/add")}
                        serachDocAction={setOpenSearch} 
                        reloadAction={()=>loadData()}/>
            <div style={{
                          width:"99%",
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
        <ModulePrint visible={visible} confirmAction={()=>{}} cancelAction={() => setVisible(false)} data={row}/>
        <Modal title="Search data" visible={openSearch} onCancel={()=>setOpenSearch(false)} onOk={()=>{
          setOpenSearch(false);
          search()
        }} width={250} okText="Search">
          <Input.Search onChange={(e)=>setSearchKey(e.target.value)} style={{width:"100"}}/>
        </Modal>
      </>
  )
}