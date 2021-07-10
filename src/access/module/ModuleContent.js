import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Layout,
    Breadcrumb,
    Button,
    Table,
    notification,
} from 'antd';

import { 
    BuildOutlined,
    AppstoreOutlined,
    ZoomInOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import RowToolbar from '../../component/RowToolbar';
import ModulePrint from './ModulePrint';
import TableTopBar from '../../component/TableTopBar';

export default function ModuleContent({token}) {

  const navigation = useHistory();
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);  
  const [row, setRow] = React.useState(null);
  
  const print = async () => {


  }

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
    {title:"", dataIndex:"", key:"Action", width:110, render:(txt, row)=>(
        <RowToolbar delAction={()=>remove(row.code)} 
                  editAction={()=>navigation.push("/access/module/edit", {rowData:row})}
                  printAction={()=>{
                    setRow(row);
                    setVisible(true);
                  }}/>
    )},
    {title:"Code", dataIndex:"code", key:"Code"},
    {title:"Name", dataIndex:"name", key:"Name"},
    {title:"Description", dataIndex:"note", key:"Note"},
    {title:"Group", dataIndex:"group", key:"Group", width:100},
    {title:"Enabled", dataIndex:"enabled", key:"Locked", width:50, render:(txt)=>txt?"Yes":"No"}
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
                        serachDocAction={setData}/>
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
        <ModulePrint visible={visible} confirmAction={()=>{}} cancelAction={() => setVisible(false)} data={row}/>
      </>
  )
}