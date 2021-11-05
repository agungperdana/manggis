import React from 'react';
import { useHistory } from 'react-router-dom';

import { 
    Table,
    notification
} from 'antd';

import moment from 'moment';
import RowToolbar from '../../../component/RowToolbar';
import TableTopBar from '../../../component/TableTopBar';
import PartyRelationshipPrint from './PartyRelationshipPrint';

export default function PartyRole({token, partyCode}) {

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
              setData(json.result?.partyRelationships);
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

        try {

            if(id) {
                
                let response = await fetch('https://127.0.0.1:8585/partys/relationships/delete', {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer '+token,
                    },
                    body:JSON.stringify({
                        partyCode:partyCode,
                        relationshipId:id
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
        {title:"Start", dataIndex:"start", key:"start", width:125, render:(txt, row)=>(
            row.start?moment(new Date(row.start)).format("DD-MM-YYYY"):"---"
        )},
        {title:"End", dataIndex:"end", key:"end", width:125, render:(txt, row)=>(
            row.end?moment(new Date(row.end)).format("DD-MM-YYYY"):"---"
        )},
        {title:"Type", dataIndex:"type", key:"type", width:300},
        {title:"To Party", dataIndex:"toPartyName", key:"toPartyName", width:300},
        {title:"", dataIndex:"", key:"Action", width:100, render:(txt, row, index)=>(
            <RowToolbar delAction={()=>{remove(row.id)}} 
                        editAction={()=> {
                            navigation.push("/global/party/edit/relationship/edit/",{data:row});
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
                            navigation.push("/global/party/edit/relationship/add/");
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
            <PartyRelationshipPrint visible={visible} data={row} cancelAction={()=>setVisible(false)} confirmAction={()=>setVisible(false)}/>
        </>
    );
}