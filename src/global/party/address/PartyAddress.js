import React from 'react';
import { useHistory } from 'react-router-dom';

import { 
    Table,
    notification
} from 'antd';

import { 
    CheckCircleTwoTone 
} from '@ant-design/icons';

import RowToolbar from '../../../component/RowToolbar';
import TableTopBar from '../../../component/TableTopBar';

import PartyAddressPrint from './PartyAddressPrint';

export default function PartyContact({token, partyCode}) {

    const navigation = useHistory();

    const [data, setData] = React.useState([]);
    const [row, setRow] = React.useState({});
    
    const [openSearch, setOpenSearch] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    const loadData = async () => {

        try {
          let response = await fetch('https://127.0.0.1:8585/partys/get/'+partyCode, {
              method: 'GET',
              headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+token,
              }
          });
    
          let json = await response.json();
          if(json.status) {
              setData(json.result?.addresses);
          }
        } 
        catch (error) {
              
          notification.error({
            message:"Error", 
            description:error?.message
          });
        }
    }

    const remove = async (id) => {

        console.log(id);
        try {

            if(id) {
                
                let response = await fetch('https://127.0.0.1:8585/partys/addresses/delete', {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer '+token,
                    },
                    body:JSON.stringify({
                        partyCode:partyCode,
                        addressId:id
                    })
                });
            
                let json = await response.json();
                if(json.status) {
                    loadData()
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

    React.useEffect(()=>{loadData()},[]);

    const column = [
        {title:"Description", dataIndex:"description", key:"description"},
        {title:"Location", dataIndex:"location", key:"location", width:250, render:(txt, row)=>row.location.name},
        {title:"Postal", dataIndex:"postal", key:"postal", width:100},
        {title:"Type", dataIndex:"type", key:"type", width:125},
        {title:"Active", dataIndex:"active", key:"active", width:90, 
            render:(txt, row)=>(row.active?<CheckCircleTwoTone size="small" twoToneColor="#52c41a"/>:"---")},
        {title:"", dataIndex:"", key:"Action", width:100, render:(txt, row, index)=>(
            <RowToolbar delAction={()=>{remove(row.id)}} 
                        editAction={()=> {
                            navigation.push("/global/party/edit/address/edit/",{data:row});
                        }}
                        printAction={()=>{
                            setRow(row);
                            setVisible(true);
                        }}/>
       )},
      ]

    return (
        <>
            <TableTopBar addDocAction={()=>{
                            navigation.push("/global/party/edit/address/add");
                         }}
                         serachDocAction={setOpenSearch} 
                         reloadAction={()=>loadData()}/>
            <div style={{
                width:"99%",
                height:"99%",
                backgroundColor:"#FFFFFF", 
                padding:5,
                margin:10, 
                borderStyle:"solid",
                borderColor:"#BFBFBF",
                borderWidth:1,
                borderRadius:10,
                alignItems:"stretch"}}>
                
                <Table dataSource={data} columns={column} style={{width:"100%"}} size="small"/>
            </div>
            <PartyAddressPrint visible={visible} data={row} cancelAction={()=>setVisible(false)} confirmAction={()=>setVisible(false)}/>
        </>
    );
}