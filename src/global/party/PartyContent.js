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
    GlobalOutlined,
    GoldFilled,
} from '@ant-design/icons';

import RowToolbar from '../../component/RowToolbar';
import TableTopBar from '../../component/TableTopBar';

import PartyPrint from './PartyPrint';

export default function PartyContent({token}) {

  const navigation = useHistory();

  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);  
  const [row, setRow] = React.useState(null);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");

  const search = async () => {

    if(searchKey) {
 
      try {
        let response = await fetch('https://127.0.0.1:8585/partys/all-partys/0/1000/'+searchKey, {
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
      let response = await fetch('https://127.0.0.1:8585/partys/all-partys/0/1000', {
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

    try {
      
      if(code) {
        let response = await fetch('https://127.0.0.1:8585/partys/delete', {
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
    {title:"Code", dataIndex:"code", key:"code", width:125},
    {title:"Name", dataIndex:"name", key:"Name"},
    {title:"Type", dataIndex:"type", key:"type", width:150},
    {title:"Location", dataIndex:"birthPlace", key:"birthPlace", width:200,  render:(txt, row)=>(row.birthPlace.name)},
    {title:"Tax Number", dataIndex:"taxCode", key:"taxCode", width:150},
    {title:"", dataIndex:"", key:"Action", width:100, render:(txt, row)=>(
      <RowToolbar delAction={()=>remove(row.code)} 
                editAction={()=>navigation.push("/global/party/edit", {rowData:row})}
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
                <GlobalOutlined/> Global
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <GoldFilled/> Party
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                List
              </Breadcrumb.Item>
            </Breadcrumb>
            <TableTopBar addDocAction={()=>navigation.push("/global/party/add")}
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
        <PartyPrint visible={visible} confirmAction={()=>{}} cancelAction={() => setVisible(false)} data={row}/>
        <Modal title="Search data" visible={openSearch} onCancel={()=>setOpenSearch(false)} onOk={()=>{
          setOpenSearch(false);
          search()
        }} width={250} okText="Search">
          <Input.Search onChange={(e)=>setSearchKey(e.target.value)} style={{width:"100"}}/>
        </Modal>
      </>
  )
}